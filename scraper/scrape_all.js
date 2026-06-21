const { scrapeClinic, scrapeWebsite, generateSlug } = require('./scraper')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// ─── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=')
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim()
  })
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE credentials in .env.local')
  process.exit(1)
}

const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/1vnZDcciwqBE7Wicjtv06bMfkrrF6Sivm8C6rPOMlh_k/export?format=csv&gid=0'

function parseCSV(text) {
  const lines = text.trim().split('\n')
  return lines.map(line => {
    const cols = []
    let cur = '', inQ = false
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ }
      else if (line[i] === ',' && !inQ) { cols.push(cur.trim()); cur = '' }
      else cur += line[i]
    }
    cols.push(cur.trim())
    return cols
  })
}

function extractCity(address) {
  if (!address) return ''
  const parts = address.split(',').map(p => p.trim())
  if (parts.length >= 2) {
    for (let i = parts.length - 2; i >= Math.max(0, parts.length - 3); i--) {
      const part = parts[i].replace(/\d+/g, '').trim()
      if (part.length > 2 && part.length < 30) return part
    }
  }
  return parts.length >= 2 ? parts[parts.length - 2] : ''
}

function mergeData(mapsData, webData, city) {
  const hours = {}
  if (mapsData.hours && Object.keys(mapsData.hours).length) {
    const entries = Object.entries(mapsData.hours)
    const weekdays = entries.filter(([d]) => !['Saturday', 'Sunday'].includes(d))
    const weekends = entries.filter(([d]) => ['Saturday', 'Sunday'].includes(d))
    hours.weekday = weekdays[0]?.[1] || ''
    hours.weekend = weekends[0]?.[1] || 'Closed'
  }

  const testimonials = []
  if (webData.testimonials && webData.testimonials.length) {
    webData.testimonials.forEach(t => testimonials.push(t))
  }
  if (mapsData.reviews && mapsData.reviews.length) {
    mapsData.reviews.forEach(r => {
      testimonials.push({
        name: r.author,
        role: r.time || '',
        photo: '',
        quote: r.text
      })
    })
  }

  const gallery = []
  if (webData.gallery && webData.gallery.length) {
    webData.gallery.forEach(g => gallery.push(g))
  }
  if (mapsData.photos && mapsData.photos.length) {
    mapsData.photos.forEach(url => {
      if (!gallery.some(g => g.url === url)) {
        gallery.push({ type: 'photo', url, caption: '' })
      }
    })
  }

  return {
    name: mapsData.name,
    tagline: webData.about ? webData.about.split('.')[0]?.slice(0, 80) : `Trusted dental care in ${city}`,
    about: webData.about || '',
    phone: mapsData.phone,
    email: webData.social?.email || (mapsData.website ? `hello@${mapsData.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}` : ''),
    city: city,
    booking_url: '',
    map_embed_url: webData.mapEmbedUrl || '',
    hours: hours,
    stats: {
      years: webData.stats?.years || '',
      patients: webData.stats?.patients || '',
      rating: mapsData.rating ? mapsData.rating + '★' : (webData.stats?.rating || ''),
      awards: webData.stats?.awards || ''
    },
    doctors: webData.doctors || [],
    services: webData.services || [],
    testimonials: testimonials.slice(0, 6),
    gallery: gallery.slice(0, 10),
    social: webData.social || {},
    locations: [{
      name: mapsData.name,
      address: mapsData.address,
      map_url: mapsData.mapQuery ? `https://maps.google.com/?q=${encodeURIComponent(mapsData.mapQuery)}` : 'https://maps.google.com'
    }]
  }
}

async function upsertToSupabase(slug, template, businessName, mapsUrl, data) {
  const payload = {
    slug,
    template,
    business_name: businessName,
    maps_url: mapsUrl,
    data,
    is_active: true,
    updated_at: new Date().toISOString()
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/demo_clients?on_conflict=slug`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(payload)
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Supabase upsert failed: ${res.status} ${err}`)
  }

  const rows = await res.json()
  return rows[0]
}

async function main() {
  const args = process.argv.slice(2)
  let limit = Infinity
  let startIdx = 0
  args.forEach(arg => {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1], 10)
    if (arg.startsWith('--start=')) startIdx = parseInt(arg.split('=')[1], 10)
  })

  console.log('Fetching Google Sheet...')
  const csv = execSync(`curl -sL "${SHEET_CSV}"`).toString()
  const rows = parseCSV(csv)
  const header = rows[0]
  const sheetData = rows.slice(1)

  console.log(`Found ${sheetData.length} clinics in spreadsheet.\n`)

  const nameIdx = header.findIndex(h => h.trim().toLowerCase() === 'name')
  let mapsUrlIdx = header.findIndex(h => h.trim().toLowerCase() === 'maps url')
  if (mapsUrlIdx === -1) {
    for (let col = 0; col < header.length; col++) {
      if (sheetData.some(r => r[col] && r[col].trim().startsWith('http'))) {
        mapsUrlIdx = col
        break
      }
    }
  }
  if (mapsUrlIdx === -1) mapsUrlIdx = 4

  let count = 0
  for (let i = startIdx; i < sheetData.length; i++) {
    if (count >= limit) {
      console.log(`Limit of ${limit} reached. Stopping.`)
      break
    }

    const row = sheetData[i]
    if (!row || row.length === 0) continue

    const name = (row[nameIdx !== -1 ? nameIdx : 0] || '').trim()
    const mapsUrl = (row[mapsUrlIdx] || '').trim()

    // SKIP AO Dentistry as requested by user
    const isAoDentistry = name.toLowerCase().includes('ao dentistry') || mapsUrl.toLowerCase().includes('ao-dentistry')
    if (isAoDentistry) {
      console.log(`[${i + 1}/${sheetData.length}] ⏭️ SKIP (AO Dentistry): ${name}`)
      continue
    }

    if (!mapsUrl.startsWith('http')) {
      console.log(`[${i + 1}/${sheetData.length}] ⏭️ SKIP (No Maps URL): ${name}`)
      continue
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`[${i + 1}/${sheetData.length}] Processing: ${name}`)
    console.log(`Maps URL: ${mapsUrl}`)

    try {
      // Step 1: Scrape Google Maps
      console.log('  [1/4] Scraping Google Maps...')
      const mapsData = await scrapeClinic(mapsUrl)

      // Check website
      let webData = { services: [], doctors: [], gallery: [], testimonials: [], about: '', social: {}, mapEmbedUrl: '' }
      if (mapsData.hasWebsite && mapsData.website) {
        console.log(`  [2/4] Scraping website: ${mapsData.website}...`)
        webData = await scrapeWebsite(mapsData.website)
      } else {
        console.log('  [2/4] No website found, skipping website scraping.')
      }

      // Step 3: Merge data
      console.log('  [3/4] Merging scraped data...')
      const city = extractCity(mapsData.address) || 'Pune'
      const slug = generateSlug(mapsData.name, city)
      const merged = mergeData(mapsData, webData, city)

      // Step 4: Save to Supabase
      console.log('  [4/4] Saving to Supabase...')
      const record = await upsertToSupabase(slug, 'clinic', mapsData.name, mapsUrl, merged)
      console.log(`  ✅ Success! Saved to Supabase with slug: ${slug} (ID: ${record.id})`)
      count++
    } catch (err) {
      console.error(`  ❌ Failed to process ${name}:`, err.message)
    }

    // Small delay between scrape tasks
    await new Promise(r => setTimeout(r, 2000))
  }

  console.log(`\n✅ Completed processing! Scraped and saved ${count} clinics.`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
