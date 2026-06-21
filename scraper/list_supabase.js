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

function getMapsId(url) {
  if (!url) return ''
  const match = url.match(/0x[0-9a-fA-F]+:0x[0-9a-fA-F]+/)
  if (match) return match[0].toLowerCase()
  
  const placeMatch = url.match(/place\/([^/]+)/)
  if (placeMatch) return placeMatch[1].replace(/\+/g, ' ').toLowerCase()
  
  return url.toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function main() {
  const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  })
  const clinics = await fetchRes.json()
  console.log(`Total clinics in DB: ${clinics.length}`)
  
  const mapIds = {}
  clinics.forEach(c => {
    const mid = getMapsId(c.maps_url)
    if (!mapIds[mid]) mapIds[mid] = []
    mapIds[mid].push(c)
  })
  
  console.log(`Unique Maps IDs in DB: ${Object.keys(mapIds).length}`)
  
  // Find map IDs with multiple clinics (duplicates)
  console.log(`\nDuplicate Maps IDs:`)
  for (const [mid, list] of Object.entries(mapIds)) {
    if (list.length > 1) {
      console.log(`  - ID: ${mid} (${list.length} clinics)`)
      list.forEach(c => console.log(`    * ${c.business_name} (${c.slug}), is_active: ${c.is_active}`))
    }
  }
}

main()
