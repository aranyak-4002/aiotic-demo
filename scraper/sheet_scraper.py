#!/usr/bin/env python3
"""
Read Maps URLs from Google Sheet → scrape phone + website → write back.
Usage: python3 sheet_scraper.py
"""

import csv, json, os, subprocess, sys, time, urllib.request, urllib.parse
from datetime import datetime

SHEET_ID = "1vnZDcciwqBE7Wicjtv06bMfkrrF6Sivm8C6rPOMlh_k"
CSV_URL  = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid=0"
SCRAPER  = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scraper.js")

# Column indices (0-based) — add new output columns after existing ones
COL_NAME     = 0
COL_RATING   = 1
COL_TYPE     = 2
COL_MAPS     = 3
COL_PHONE    = 4   # will write here
COL_WEBSITE  = 5   # will write here
COL_HAS_WEB = 6   # will write here

# ── 1. Read sheet ──────────────────────────────────────────────────────────────
print("Reading sheet…")
with urllib.request.urlopen(CSV_URL) as r:
    rows = list(csv.reader(r.read().decode("utf-8").splitlines()))

header = rows[0]
data   = rows[1:]   # skip header row
print(f"Found {len(data)} rows")

# ── 2. Scrape each Maps URL ────────────────────────────────────────────────────
results = []   # list of dicts: {row_index, phone, website, has_website}

for i, row in enumerate(data):
    # pad row to at least 7 columns
    while len(row) < 7:
        row.append("")

    maps_url = row[COL_MAPS].strip()
    name     = row[COL_NAME].strip()

    if not maps_url.startswith("http"):
        print(f"  [{i+1}/{len(data)}] SKIP (no URL): {name}")
        results.append({"row": i, "phone": "", "website": "", "has_website": ""})
        continue

    # Skip if already scraped (phone column filled)
    if row[COL_PHONE].strip():
        print(f"  [{i+1}/{len(data)}] SKIP (already done): {name}")
        results.append({"row": i, "phone": row[COL_PHONE], "website": row[COL_WEBSITE], "has_website": row[COL_HAS_WEB]})
        continue

    print(f"  [{i+1}/{len(data)}] Scraping: {name} …", end=" ", flush=True)

    try:
        result = subprocess.run(
            ["node", "-e", f"""
const {{ scrapeClinic }} = require('{SCRAPER}');
(async () => {{
  try {{
    const d = await scrapeClinic('{maps_url.replace("'", "\\'")}');
    console.log(JSON.stringify({{ phone: d.phone || '', website: d.website || '', hasWebsite: d.hasWebsite || false }}));
  }} catch(e) {{
    console.log(JSON.stringify({{ phone: '', website: '', hasWebsite: false, error: e.message }}));
  }}
}})();
"""],
            capture_output=True, text=True, timeout=90,
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        stdout = result.stdout.strip()
        # Find the last JSON line (scraper may log other things)
        json_line = next((l for l in reversed(stdout.splitlines()) if l.startswith("{")), "{}")
        d = json.loads(json_line)
        phone      = d.get("phone", "")
        website    = d.get("website", "")
        has_web    = "Yes" if d.get("hasWebsite") else "No"
        print(f"✓  phone={phone or 'n/a'}  website={'yes' if d.get('hasWebsite') else 'no'}")
    except subprocess.TimeoutExpired:
        print("TIMEOUT")
        phone = website = has_web = ""
    except Exception as e:
        print(f"ERROR: {e}")
        phone = website = has_web = ""

    results.append({"row": i, "phone": phone, "website": website, "has_website": has_web})
    time.sleep(2)   # be gentle

# ── 3. Build updated rows ─────────────────────────────────────────────────────
updated = [header + (["Phone", "Website", "Has Website"] if len(header) <= COL_PHONE else [])]
for i, row in enumerate(data):
    while len(row) < 7:
        row.append("")
    r = results[i]
    row[COL_PHONE]   = r["phone"]
    row[COL_WEBSITE] = r["website"]
    row[COL_HAS_WEB] = r["has_website"]
    updated.append(row)

# ── 4. Write results CSV (always) ─────────────────────────────────────────────
out_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"results_{datetime.now().strftime('%Y%m%d_%H%M')}.csv")
with open(out_file, "w", newline="") as f:
    csv.writer(f).writerows(updated)
print(f"\nSaved CSV: {out_file}")

# ── 5. Write back to Google Sheet ────────────────────────────────────────────
print("Writing to Google Sheet…")
try:
    import google.auth
    import google.auth.transport.requests
    from googleapiclient.discovery import build

    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/spreadsheets"])
    creds.refresh(google.auth.transport.requests.Request())

    service = build("sheets", "v4", credentials=creds)
    body = {"values": updated}
    service.spreadsheets().values().update(
        spreadsheetId=SHEET_ID,
        range="A1",
        valueInputOption="RAW",
        body=body,
    ).execute()
    print("Sheet updated!")
except Exception as e:
    print(f"Could not write to sheet ({e})")
    print(f"Import the CSV manually: {out_file}")
