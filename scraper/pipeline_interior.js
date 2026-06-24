/**
 * Aiotic Scrape Pipeline
 * 
 * Scrapes a clinic from Google Maps + their website, merges data,
 * and upserts to Supabase demo_clients.
 * 
 * Usage:
 *   node scraper/pipeline.js "GOOGLE_MAPS_URL" [--city=Pune] [--template=clinic]
 *   node scraper/pipeline.js "GOOGLE_MAPS_URL" --dry-run   (preview without saving)
 */

const { scrapeInterior, scrapeWebsite, generateSlug } = require('./scraper_interior')
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

// ─── Parse CLI args ──────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { mapsUrl: '', city: '', template: 'interior-design', dryRun: false }

  args.forEach(arg => {
    if (arg.startsWith('--city=')) opts.city = arg.split('=')[1]
    else if (arg.startsWith('--template=')) opts.template = arg.split('=')[1]
    else if (arg === '--dry-run') opts.dryRun = true
    else if (arg.startsWith('http')) opts.mapsUrl = arg
  })

  return opts
}

// ─── Merge Maps data + Website data ──────────────────────────────────────────

function mergeData(mapsData, webData, opts) {
  const city = opts.city || extractCity(mapsData.address) || 'India'
  const slug = generateSlug(mapsData.name, city)

  // Build hours in the template format
  const hours = {}
  if (mapsData.hours && Object.keys(mapsData.hours).length) {
    // Try to extract weekday/weekend from Maps hours
    const entries = Object.entries(mapsData.hours)
    const weekdays = entries.filter(([d]) => !['Saturday', 'Sunday'].includes(d))
    const weekends = entries.filter(([d]) => ['Saturday', 'Sunday'].includes(d))
    hours.weekday = weekdays[0]?.[1] || ''
    hours.weekend = weekends[0]?.[1] || 'Closed'
  }

  // Merge testimonials: website testimonials first, then Google reviews
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

  // Merge gallery: website gallery + Maps photos
  const gallery = []
  if (webData.gallery && webData.gallery.length) {
    webData.gallery.forEach(g => gallery.push(g))
  }
  if (mapsData.photos && mapsData.photos.length) {
    mapsData.photos.forEach(url => {
      // Don't duplicate if already in gallery
      if (!gallery.some(g => g.url === url)) {
        gallery.push({ type: 'photo', url, caption: '' })
      }
    })
  }

  // Build the merged data object matching the template schema
  const data = {
    name: mapsData.name,
    tagline: webData.about ? webData.about.split('.')[0]?.slice(0, 80) : `Trusted interior design in ${city}`,
    about: webData.about || '',
    phone: mapsData.phone,
    email: webData.social?.email || (mapsData.website ? `hello@${mapsData.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}` : ''),
    city: city,
    booking_url: '',
    map_embed_url: webData.mapEmbedUrl || '',
    hours: hours,
    stats: {
      years: webData.stats?.years || '',
      projects: webData.stats?.patients || webData.stats?.projects || '',
      rating: mapsData.rating ? mapsData.rating + '★' : (webData.stats?.rating || ''),
      awards: webData.stats?.awards || ''
    },
    team: webData.team || [],
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

  return { slug, data }
}

function extractCity(address) {
  if (!address) return ''
  // Indian addresses usually have city as 2nd-to-last comma-separated part
  const parts = address.split(',').map(p => p.trim())
  if (parts.length >= 2) {
    // Look for a part that's just a city name (no numbers, short)
    for (let i = parts.length - 2; i >= Math.max(0, parts.length - 3); i--) {
      const part = parts[i].replace(/\d+/g, '').trim()
      if (part.length > 2 && part.length < 30) return part
    }
  }
  return parts.length >= 2 ? parts[parts.length - 2] : ''
}

// ─── Supabase upsert ─────────────────────────────────────────────────────────

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

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs()

  if (!opts.mapsUrl) {
    console.log(`
Aiotic Scrape Pipeline
━━━━━━━━━━━━━━━━━━━━━

Usage:
  node scraper/pipeline.js "GOOGLE_MAPS_URL" [options]

Options:
  --city=CityName      Override auto-detected city
  --template=clinic    Template type (default: clinic)
  --dry-run            Preview without saving to Supabase

Example:
  node scraper/pipeline.js "https://www.google.com/maps/place/Dr+Kothari..." --city=Pune
`)
    process.exit(0)
  }

  console.log('\n━━━ Aiotic Scrape Pipeline ━━━\n')

  // Step 1: Scrape Google Maps
  console.log('Step 1: Scraping Google Maps...')
  const mapsData = await scrapeInterior(opts.mapsUrl)

  // Step 2: Scrape website (if exists)
  let webData = { services: [], team: [], gallery: [], testimonials: [], about: '', social: {}, mapEmbedUrl: '' }
  if (mapsData.hasWebsite && mapsData.website) {
    console.log('\nStep 2: Scraping website...')
    webData = await scrapeWebsite(mapsData.website)
  } else {
    console.log('\nStep 2: No website found, skipping.')
  }

  // Step 3: Merge
  console.log('\nStep 3: Merging data...')
  const { slug, data } = mergeData(mapsData, webData, opts)

  console.log('\n━━━ Results ━━━')
  console.log(`  Name:          ${data.name}`)
  console.log(`  Slug:          ${slug}`)
  console.log(`  Phone:         ${data.phone || 'n/a'}`)
  console.log(`  City:          ${data.city}`)
  console.log(`  Services:      ${data.services.length}`)
  console.log(`  Team:          ${data.team.length}`)
  console.log(`  Testimonials:  ${data.testimonials.length}`)
  console.log(`  Gallery:       ${data.gallery.length}`)
  console.log(`  Has about:     ${data.about ? 'yes' : 'no'}`)
  console.log(`  Social links:  ${Object.keys(data.social).length}`)
  console.log(`  Map embed:     ${data.map_embed_url ? 'yes' : 'no'}`)

  if (opts.dryRun) {
    console.log('\n[DRY RUN] Full data:')
    console.log(JSON.stringify(data, null, 2))
    console.log('\n[DRY RUN] Not saving to Supabase.')
    return
  }

  // Step 4: Upsert to Supabase
  console.log('\nStep 4: Saving to Supabase...')
  const templatesToSave = ['interior-design', 'interior-premium']
  
  for (const tpl of templatesToSave) {
    const finalSlug = tpl === 'interior-premium' ? slug + '-premium' : slug;
    const record = await upsertToSupabase(finalSlug, tpl, data.name, opts.mapsUrl, data)
    console.log(`  ✓ Saved [${tpl}]! ID: ${record.id}`)
    const demoUrl = `http://localhost:5173/${tpl}/?client=${encodeURIComponent(finalSlug)}`
    console.log(`    Demo: ${demoUrl}`)
  }
  
  console.log('')
}

main().catch(err => {
  console.error('\n✗ Pipeline error:', err.message)
  process.exit(1)
})
