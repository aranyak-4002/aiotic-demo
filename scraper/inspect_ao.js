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

async function main() {
  const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/demo_clients`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  })
  const clinics = await fetchRes.json()
  
  const aoDemos = clinics.filter(c => c.business_name.toLowerCase().includes('ao dentistry'))
  console.log('--- AO Dentistry Demos ---')
  aoDemos.forEach(c => {
    console.log(`Slug: ${c.slug}`)
    console.log(`  Name: ${c.business_name}`)
    console.log(`  Is Active: ${c.is_active}`)
    console.log(`  Data keys: ${c.data ? Object.keys(c.data).join(', ') : 'null'}`)
    if (c.data) {
      console.log(`  Doctors count: ${c.data.doctors ? c.data.doctors.length : 0}`)
      console.log(`  Services count: ${c.data.services ? c.data.services.length : 0}`)
      console.log(`  Gallery count: ${c.data.gallery ? c.data.gallery.length : 0}`)
    }
  })

  const kothariDemos = clinics.filter(c => c.business_name.toLowerCase().includes('kothari'))
  console.log('\n--- Kothari Demos ---')
  kothariDemos.forEach(c => {
    console.log(`Slug: ${c.slug}`)
    console.log(`  Name: ${c.business_name}`)
    console.log(`  Is Active: ${c.is_active}`)
    console.log(`  Data keys: ${c.data ? Object.keys(c.data).join(', ') : 'null'}`)
  })
  
  const khelkarDemos = clinics.filter(c => c.business_name.toLowerCase().includes('khelkar'))
  console.log('\n--- Khelkar Demos ---')
  khelkarDemos.forEach(c => {
    console.log(`Slug: ${c.slug}`)
    console.log(`  Name: ${c.business_name}`)
    console.log(`  Is Active: ${c.is_active}`)
    console.log(`  Data keys: ${c.data ? Object.keys(c.data).join(', ') : 'null'}`)
  })
}

main()
