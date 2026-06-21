const { scrapeClinic } = require('./scraper')
const https = require('https')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/1vnZDcciwqBE7Wicjtv06bMfkrrF6Sivm8C6rPOMlh_k/export?format=csv&gid=0'
const OUT = path.join(__dirname, 'clinic_results.csv')

function fetchCSV(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location && redirects > 0) {
        resolve(fetchCSV(res.headers.location, redirects - 1))
        return
      }
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

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

async function main() {
  const args = process.argv.slice(2)
  let limit = Infinity
  args.forEach(arg => {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1], 10)
  })

  console.log('Fetching sheet...')
  const csv = execSync(`curl -sL "${SHEET_CSV}"`).toString()
  const rows = parseCSV(csv)
  const header = rows[0]
  const data = rows.slice(1)

  console.log(`Found ${data.length} rows\n`)

  const nameIdx = header.findIndex(h => h.trim().toLowerCase() === 'name')
  let mapsUrlIdx = header.findIndex(h => h.trim().toLowerCase() === 'maps url')
  if (mapsUrlIdx === -1) {
    for (let col = 0; col < header.length; col++) {
      if (data.some(r => r[col] && r[col].trim().startsWith('http'))) {
        mapsUrlIdx = col
        break
      }
    }
  }
  if (mapsUrlIdx === -1) mapsUrlIdx = 4

  // Output CSV header
  const outLines = ['Name,Maps URL,Phone,Website,Has Website']

  let count = 0
  for (let i = 0; i < data.length; i++) {
    if (count >= limit) {
      console.log(`Limit of ${limit} reached. Stopping.`)
      break
    }
    const row = data[i]
    if (!row || row.length === 0) continue
    const name = (row[nameIdx !== -1 ? nameIdx : 0] || '').trim()
    const url  = (row[mapsUrlIdx] || '').trim()

    if (!url.startsWith('http')) {
      console.log(`[${i+1}/${data.length}] SKIP (no URL): ${name}`)
      outLines.push(`"${name}","","","",""`)
      continue
    }

    process.stdout.write(`[${i+1}/${data.length}] ${name}... `)

    try {
      const d = await scrapeClinic(url)
      const phone   = (d.phone   || '').replace(/"/g, '')
      const website = (d.website || '').replace(/"/g, '')
      const hasWeb  = d.hasWebsite ? 'Yes' : 'No'
      console.log(`✓  📞 ${phone || 'n/a'}  🌐 ${hasWeb}`)
      outLines.push(`"${name}","${url}","${phone}","${website}","${hasWeb}"`)
    } catch (e) {
      console.log(`✗  ERROR: ${e.message}`)
      outLines.push(`"${name}","${url}","ERROR","",""`)
    }

    // small pause between scrapes
    await new Promise(r => setTimeout(r, 1500))
    count++
  }

  fs.writeFileSync(OUT, outLines.join('\n'))
  console.log(`\n✅ Done! Saved to: ${OUT}`)
}

main().catch(console.error)
