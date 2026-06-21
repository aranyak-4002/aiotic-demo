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

  console.log(`Google Sheet has ${sheetClinics.length} rows.`)

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

  // Map sheet clinics by normalized maps ID
  const sheetMap = new Map()
  sheetClinics.forEach((row, index) => {
    const name = (row[nameIdx] || '').trim()
    const mapsUrl = (row[mapsUrlIdx] || '').trim()
    const hasWebsite = hasWebIdx !== -1 ? (row[hasWebIdx] || '').trim() : 'No'
    
    const id = getMapsId(mapsUrl)
    if (id && !sheetMap.has(id)) {
      // only keep the first occurrence from the sheet (idx + 1 for 1-based ordering, minus header)
      sheetMap.set(id, { name, mapsUrl, hasWebsite, index: index + 1 })
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

  // Group DB clinics by Maps ID
  const dbMap = new Map()
  for (const client of supabaseClinics) {
    const mapsId = getMapsId(client.maps_url) || 'unknown-' + client.id
    if (!dbMap.has(mapsId)) dbMap.set(mapsId, [])
    dbMap.get(mapsId).push(client)
  }

  let deleteCount = 0
  let updateCount = 0

  for (const [mapsId, clients] of dbMap.entries()) {
    const sheetData = sheetMap.get(mapsId)

    if (!sheetData) {
      // Not in sheet, delete all associated DB entries
      for (const client of clients) {
        console.log(`🗑️ Deleting clinic not in sheet: ${client.business_name} (${client.slug})`)
        const delRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients?id=eq.${client.id}`, {
          method: 'DELETE',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        })
        if (delRes.ok) deleteCount++
      }
    } else {
      // It is in the sheet!
      // If there are multiple entries for this mapsId, pick the best one
      clients.sort((a, b) => {
        const aKeys = a.data ? Object.keys(a.data).length : 0
        const bKeys = b.data ? Object.keys(b.data).length : 0
        return bKeys - aKeys // Descending
      })

      const bestClient = clients[0]
      const toDelete = clients.slice(1)

      for (const client of toDelete) {
        console.log(`🗑️ Deleting duplicate DB entry: ${client.business_name} (${client.slug})`)
        const delRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients?id=eq.${client.id}`, {
          method: 'DELETE',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        })
        if (delRes.ok) deleteCount++
      }

      // Update the bestClient
      const isActive = sheetData.hasWebsite.toLowerCase() === 'yes'
      const updatedData = { ...bestClient.data, sheet_order: sheetData.index }
      
      const updatePayload = {
        is_active: isActive,
        data: updatedData,
        updated_at: new Date().toISOString()
      }

      const upRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients?id=eq.${bestClient.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      })

      if (upRes.ok) {
        updateCount++
      } else {
        console.error(`  ❌ Failed to update ${bestClient.business_name}:`, await upRes.text())
      }
    }
  }

  console.log(`\nCleanup completed!`)
  console.log(`  - Deleted: ${deleteCount} clinics`)
  console.log(`  - Updated status & order: ${updateCount} clinics`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
