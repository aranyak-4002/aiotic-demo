const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Load env
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=')
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim()
  })
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY

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

function getMapsId(url) {
  if (!url) return ''
  const match = url.match(/0x[0-9a-fA-F]+:0x[0-9a-fA-F]+/)
  if (match) return match[0].toLowerCase()
  
  const placeMatch = url.match(/place\/([^/]+)/)
  if (placeMatch) return placeMatch[1].replace(/\+/g, ' ').toLowerCase()
  
  return url.toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function main() {
  console.log('Downloading Google Sheet...')
  const csv = execSync(`curl -sL "${SHEET_CSV}"`).toString()
  const rows = parseCSV(csv)
  const header = rows[0]
  const sheetClinics = rows.slice(1)

  console.log(`Google Sheet has ${sheetClinics.length} clinics.`)

  const nameIdx = header.findIndex(h => h.trim().toLowerCase() === 'name')
  let mapsUrlIdx = header.findIndex(h => h.trim().toLowerCase() === 'maps url')
  if (mapsUrlIdx === -1) {
    for (let col = 0; col < header.length; col++) {
      if (sheetClinics.some(r => r[col] && r[col].trim().startsWith('http'))) {
        mapsUrlIdx = col
        break
      }
    }
  }
  if (mapsUrlIdx === -1) mapsUrlIdx = 4

  const hasWebIdx = header.findIndex(h => h.trim().toLowerCase() === 'has website')

  const sheetMap = new Map()
  sheetClinics.forEach((row, index) => {
    const name = (row[nameIdx] || '').trim()
    const mapsUrl = (row[mapsUrlIdx] || '').trim()
    const hasWebsite = hasWebIdx !== -1 ? (row[hasWebIdx] || '').trim() : 'No'
    
    const id = getMapsId(mapsUrl)
    if (id) {
      sheetMap.set(id, { name, mapsUrl, hasWebsite, index })
    }
  })

  console.log(`Mapped ${sheetMap.size} unique clinics from sheet by Maps ID.`)

  // Fetch all clinics from Supabase
  console.log('Fetching all clinics from Supabase...')
  const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  })
  
  if (!fetchRes.ok) {
    throw new Error(`Failed to fetch from Supabase: ${fetchRes.statusText}`)
  }

  const supabaseClinics = await fetchRes.json()
  console.log(`Found ${supabaseClinics.length} clinics in Supabase.`)

  let deleteList = []
  let updateList = []

  for (const client of supabaseClinics) {
    const mapsId = getMapsId(client.maps_url)
    const match = sheetMap.get(mapsId)

    if (!match) {
      deleteList.push(client)
    } else {
      updateList.push({ client, match })
    }
  }

  console.log(`\n--- DRY RUN RESULTS ---`)
  console.log(`To delete (${deleteList.length} clinics):`)
  deleteList.forEach(c => console.log(`  - ${c.business_name} (${c.slug}) | Maps: ${c.maps_url}`))
  console.log(`\nTo update (${updateList.length} clinics):`)
  updateList.slice(0, 10).forEach(({ client, match }) => {
    console.log(`  - ${client.business_name} -> index ${match.index}, active: ${match.hasWebsite.toLowerCase() === 'yes'}`)
  })
  console.log(`... and ${updateList.length - 10} more.`)
  
  // Specifically check for AO Dentistry
  const aoSupabase = supabaseClinics.find(c => c.business_name.toLowerCase().includes('ao dentistry'))
  if (aoSupabase) {
    const aoMapsId = getMapsId(aoSupabase.maps_url)
    const aoMatch = sheetMap.get(aoMapsId)
    console.log(`\nAO Dentistry Check:`)
    console.log(`  In Supabase: "${aoSupabase.business_name}" (${aoSupabase.slug})`)
    console.log(`  Maps ID: ${aoMapsId}`)
    console.log(`  Matched in sheet: ${aoMatch ? `YES (index ${aoMatch.index}, name in sheet: "${aoMatch.name}")` : 'NO'}`)
  } else {
    console.log(`\nAO Dentistry NOT found in Supabase!`)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
})
