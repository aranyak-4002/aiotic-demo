/**
 * Bulk-seed dental clinic prospects into Supabase.
 * Run: npx tsx scripts/seed-clinics.ts
 *
 * These are imported as is_active=false (prospects).
 * Flip is_active=true in the dashboard when you're ready to demo them.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

// Load .env.local
const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env'
dotenv.config({ path: envFile })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
)

// ─── Raw clinic list (scraped from Google Maps, Aundh/Baner, Pune) ────────────
const RAW: Array<{ name: string; phone: string; website: string; maps_url: string; area: string }> = [
  { name: 'AO Dentistry', phone: '096575 80595', website: 'aodentistry.com', maps_url: 'https://www.google.com/maps/place/AO+Dentistry-+Best+Dental+Clinic+in+Aundh/data=!4m7!3m6!1s0x3bc2bff6127f1089:0x8cd51c6ca9b5c9b', area: 'Aundh' },
  { name: "Dr Kothari's Dental Privilege", phone: '081490 06000', website: 'kotharidentalcare.in', maps_url: 'https://www.google.com/maps/place/Dr+Kothari%27s+Dental+Privilege/data=!4m7!3m6!1s0x3bc2bf3a91489d51:0x70434af7695342c9', area: 'Aundh' },
  { name: 'Acme Dental Lounge', phone: '099234 59984', website: 'acmedental.in', maps_url: 'https://www.google.com/maps/place/Acme+Dental+Lounge/data=!4m7!3m6!1s0x3bc2bf3900000001:0x374993b721a48a95', area: 'Aundh' },
  { name: 'DentalTree Dental Clinic', phone: '086695 89999', website: 'dentaltree.in', maps_url: 'https://www.google.com/maps/place/DentalTree+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bf30a3f04701:0x6bb8063361276bad', area: 'Aundh' },
  { name: 'Dazzle Dent Dental Clinic', phone: '096734 44856', website: 'dazzledent.in', maps_url: 'https://www.google.com/maps/place/Dazzle+Dent+Dental+Clinic,+Aundh/data=!4m7!3m6!1s0x3bc2bf501bbc7519:0x122ca9f0b3681bfa', area: 'Aundh' },
  { name: "Dr Pharande's Orthodontic & Dental Clinic", phone: '095610 35555', website: 'drpharande.in', maps_url: 'https://www.google.com/maps/place/Dr.+Pharande%27s+Orthodontic+%26+Dental+Clinic+Aundh/data=!4m7!3m6!1s0x3bc2bf2f8f93818b:0x62a786bda8d420f', area: 'Aundh' },
  { name: 'Kant Dental Clinic', phone: '077418 05989', website: 'kantdentalclinic.com', maps_url: 'https://www.google.com/maps/place/Dr+Sanchita-+Kant+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bf3033ead5a9:0x7cdbe5cd786619be', area: 'Aundh' },
  { name: "Dr Viddesh's Dental Clinic", phone: '077093 49580', website: 'drviddeshpatil.com', maps_url: 'https://www.google.com/maps/place/Dr.+Viddesh%27s+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bf6ebc844155:0x7a0c258827dcfca1', area: 'Aundh' },
  { name: 'Sabka Dentist Aundh', phone: '082918 46986', website: 'sabkadentist.com', maps_url: 'https://www.google.com/maps/place/Sabka+dentist/data=!4m7!3m6!1s0x3bc2bf3c8883dbfb:0xeec3c191915d9db0', area: 'Aundh' },
  { name: 'Apollo Dental Clinic Aundh', phone: '098496 51853', website: 'apollodental.in', maps_url: 'https://www.google.com/maps/place/Apollo+Dental+Clinic,+Aundh/data=!4m7!3m6!1s0x3bc2bf3cf81a56ed:0x5a5e489094604761', area: 'Aundh' },
  { name: 'Dental Care Solutions', phone: '079726 59371', website: 'dentalcaresolutions.in', maps_url: 'https://www.google.com/maps/place/Dental+Care+Solutions/data=!4m7!3m6!1s0x3bc2bf66003c3549:0xf1edb518aeda0409', area: 'Aundh' },
  { name: 'Clove Dental Clinic Aundh', phone: '040 3824 5728', website: 'clovedental.in', maps_url: 'https://www.google.com/maps/place/Clove+Dental+Clinic+-+Aundh,+Pune/data=!4m7!3m6!1s0x3bc2bf2b70417517:0xa0a68b705ac2f6e', area: 'Aundh' },
  { name: 'OrthoSquare Dental Clinic Aundh', phone: '08071 820 815', website: 'orthosquare.com', maps_url: 'https://www.google.com/maps/place/OrthoSquare+Dental+Clinic+-+Aundh/data=!4m7!3m6!1s0x3bc2bf5b4e08847b:0xaab0f0b8ff2a5d4', area: 'Aundh' },
  { name: 'Opal Dental Care', phone: '091583 81068', website: 'opaldentalcare.in', maps_url: 'https://www.google.com/maps/place/Opal+Dental+Care/data=!4m7!3m6!1s0x3bc2bf3b7f4d831d:0xd2b1d997ce6d0ed9', area: 'Aundh' },
  { name: 'A Little Smile Dental Clinic', phone: '098810 08107', website: 'alittlesmile.co.in', maps_url: 'https://www.google.com/maps/place/A+Little+Smile+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bf2ffc079f13:0xe63c0b33e0d03533', area: 'Aundh' },
  { name: 'Daily Dental Clinics Aundh', phone: '091564 45572', website: 'dailydentalaundh.com', maps_url: 'https://www.google.com/maps/place/Daily+Dental+Clinics/data=!4m7!3m6!1s0x3bc2bf485f4559e9:0xb22d5dd943710412', area: 'Aundh' },
  { name: 'Crowning Glory Dental Clinic', phone: '099609 53753', website: 'crowningglorydental.com', maps_url: 'https://www.google.com/maps/place/Crowning+Glory+Dental+Clinic/data=!4m7!3m6!1s0x8318317dd82ab183:0x1ea0503c4c79a12e', area: 'Aundh' },
  { name: "Agarkar's Dental Care", phone: '098227 74803', website: 'agarkardentalcare.com', maps_url: 'https://www.google.com/maps/place/Agarkar%27s+Dental+Care/data=!4m7!3m6!1s0x3bc2bf3a8331df77:0x3f2469df501b84c', area: 'Aundh' },
  { name: 'Oracraft Dental Clinic', phone: '098220 87773', website: 'oracraft.com', maps_url: 'https://www.google.com/maps/place/Dr+Gauri+Mulay+Arbatti+-+Oracraft+Dental+Clinic,+Aundh/data=!4m7!3m6!1s0x3bc2bf30ae7a16f7:0x4a5b54b27e075592', area: 'Aundh' },
  { name: 'Dento Relief Centre', phone: '098811 48846', website: 'dentarelifcenter.in', maps_url: 'https://www.google.com/maps/place/Dento+Relief+Centre/data=!4m7!3m6!1s0x3bc2bf32053eb1ef:0x699bec6dc45f7370', area: 'Aundh' },
  { name: 'Pune Dental Studio', phone: '098811 92594', website: 'punedentalstudio.com', maps_url: 'https://www.google.com/maps/place/Dr.+Sunayana+Khade+-+Pune+Dental+Studio+at+Baner/data=!4m7!3m6!1s0x3bc2bf31fbe239b1:0xb48f2531da207d9f', area: 'Baner' },
  { name: 'Dr Chetan Agarwal Dental Clinic', phone: '099757 63301', website: 'drchetanagarwal.com', maps_url: 'https://www.google.com/maps/place/Dr+Chetan+Agarwal-Best+Invisalign+Specialist+in+Aundh/data=!4m7!3m6!1s0x3bc2bf136996f9a7:0x5c53ab6b8482b6c3', area: 'Aundh' },
  { name: 'Ashwin Dental Clinic', phone: '098230 60436', website: 'ashwindentalclinic.com', maps_url: 'https://www.google.com/maps/place/Ashwin+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bf2eed205775:0xa8a499e47542a739', area: 'Aundh' },
  { name: 'Vandan Dental Studio', phone: '074209 47087', website: 'vandandental.in', maps_url: 'https://www.google.com/maps/place/Vandan+Dental+Studio/data=!4m7!3m6!1s0x3bc2bfa4ac5ffda1:0x99ee677db35fb3e1', area: 'Aundh' },
  { name: 'Clove Dental Clinic Baner', phone: '040 3824 5728', website: 'clovedental.in', maps_url: 'https://www.google.com/maps/place/Clove+Dental+Clinic+-+Baner+Road,+Pune/data=!4m7!3m6!1s0x3bc2bf6674080391:0xfd5968cc0c3cfdb4', area: 'Baner' },
  { name: 'Darshil Dental Care', phone: '096179 88428', website: 'darshildentalcare.com', maps_url: 'https://www.google.com/maps/place/Darshil+Dental+Care/data=!4m7!3m6!1s0x3bc2bed815b1a9ed:0x48c17ca128dc4690', area: 'Baner' },
  { name: 'Dental Galaxy', phone: '096044 80444', website: 'dentalgalaxy.in', maps_url: 'https://www.google.com/maps/place/Dental+Galaxy/data=!4m7!3m6!1s0x3bc2bf859efb735f:0x6d884c1e0aa968fc', area: 'Baner' },
  { name: 'Go-Best Dentist Dr Mokashi', phone: '072648 89986', website: 'gobestdentist.com', maps_url: 'https://www.google.com/maps/place/Go-Best+Dentist/data=!4m7!3m6!1s0x3bc2bf2316597b61:0x58d63f0c16e34386', area: 'Baner' },
  { name: 'Dental Fitness Studio', phone: '099708 14973', website: 'dentalfitnessstudio.com', maps_url: 'https://www.google.com/maps/place/Dental+Fitness+Studio/data=!4m7!3m6!1s0x3bc2bf39fdfba9e7:0xb87ce3d5da7caaba', area: 'Aundh' },
  { name: "Dr Pandit's Clinic for Dental Excellence", phone: '098908 54838', website: 'drpanditsdentalcare.in', maps_url: 'https://www.google.com/maps/place/Dr+Pandit%27s+Clinic/data=!4m7!3m6!1s0x3bc2bf1efd49cc13:0x2b5b6f1067cb699e', area: 'Baner' },
  { name: "Khelkar's Dent O Spa", phone: '091588 81122', website: 'khelkarsdentospa.in', maps_url: 'https://www.google.com/maps/place/Khelkar%E2%80%99s+Dent+%E2%80%98O%E2%80%99+Spa+Dental+clinic/data=!4m7!3m6!1s0x3bc2bfcd948da0ff:0x7d4cd677deacaa3e', area: 'Aundh' },
  { name: 'Sabka Dentist Baner', phone: '082918 46994', website: 'sabkadentist.com', maps_url: 'https://www.google.com/maps/place/Sabka+dentist/data=!4m7!3m6!1s0x3bc2bed737f4d4d7:0xd8864dff88cf6ca4', area: 'Baner' },
  { name: 'Bloom Cosmetic & Dental Clinic', phone: '093592 69901', website: 'bloomsmileclinic.com', maps_url: 'https://www.google.com/maps/place/Bloom+cosmetic+%26+dental+clinic/data=!4m7!3m6!1s0x3bc2bfc60935e673:0x884b4e5f58425b30', area: 'Baner' },
  { name: 'Braces and Beyond Orthodontic Clinic', phone: '075592 60110', website: 'bracesnbeyond.in', maps_url: 'https://www.google.com/maps/place/Braces+and+Beyond+Orthodontic+and+Cosmetic+Clinic/data=!4m7!3m6!1s0x3bc2bffe2f917cd7:0x247682975151a950', area: 'Aundh' },
  { name: "Dr Saket's Orthodontic & Dental Clinic", phone: '099728 04333', website: 'saketorthodontics.com', maps_url: 'https://www.google.com/maps/place/Dr.+Saket%27s+Orthodontic/data=!4m7!3m6!1s0x3bc2bf6a802db06d:0x3369f42a362d24e4', area: 'Aundh' },
  { name: 'Glowing Smiles Dental Clinic', phone: '087666 51212', website: 'glowingsmiles.in', maps_url: 'https://www.google.com/maps/place/Glowing+Smiles+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bfe34061b0eb:0xf6b04008e139d6bf', area: 'Baner' },
  { name: 'Dr Pushkar Waknis Oral Surgeon', phone: '098230 47888', website: 'maxillofacialsurgerypune.com', maps_url: 'https://www.google.com/maps/place/Dr.+Pushkar+Waknis/data=!4m7!3m6!1s0x3bc2bf2ff4b80e75:0xc0efa09ce829c753', area: 'Aundh' },
  { name: 'ICONIC 32 Dental Care Baner', phone: '082629 80811', website: 'iconic32dental.com', maps_url: 'https://www.google.com/maps/place/ICONIC+32+Dental+Care/data=!4m7!3m6!1s0x3bc2bf213e685c51:0xcdcd6163045b9d86', area: 'Baner' },
  { name: 'Dr Ajit Kadam Dental Clinic', phone: '020 2588 4411', website: 'kadamsdentalclinic.com', maps_url: 'https://www.google.com/maps/place/Dr.+Ajit+Kadam/data=!4m7!3m6!1s0x3bc2bf6995555555:0x7ff51d2a8e67b625', area: 'Aundh' },
  { name: 'Sadhguru Dental & Skin Care', phone: '091128 25276', website: 'drsuchitagaikwad.com', maps_url: 'https://www.google.com/maps/place/Sadhguru+Dental+And+Skin+Care+Cosmetic+Clinic/data=!4m7!3m6!1s0x3bc2bf23510f5ee1:0xc145ff6be18b82f9', area: 'Aundh' },
  { name: 'Revive 32 Dental Clinic Baner', phone: '095450 95351', website: 'revive32dentalclinic.com', maps_url: 'https://www.google.com/maps/place/Revive+32+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bfd2478ffad5:0xb9d1cf49e181c7a6', area: 'Baner' },
  { name: 'Dental Essence Invisalign Clinic', phone: '095886 95155', website: 'dentalessence.co.in', maps_url: 'https://www.google.com/maps/place/Dental+Essence+Invisalign+Clinic/data=!4m7!3m6!1s0x3bc2bf1ef9ae1551:0xf93cfc7a351c453d', area: 'Baner' },
  { name: 'Dr Sunita Gallani Advanced Dentistry', phone: '080 4275 4192', website: 'gallanidentalcare.com', maps_url: 'https://www.google.com/maps/place/Dr.+Sunita+Gallani/data=!4m7!3m6!1s0x3bc2bf3b73dbd091:0xe6a89f376922b3bb', area: 'Aundh' },
  { name: 'Choice Dental Clinic', phone: '073878 11042', website: 'choicedentalclinic.com', maps_url: 'https://www.google.com/maps/place/Choice+Dental+Clinic+Aundh/data=!4m7!3m6!1s0x3bc2bf6995555555:0x289f279ca5aa1ce2', area: 'Aundh' },
  { name: "AV Children's Dental Clinic", phone: '070389 62951', website: 'avkidsndentalcare.in', maps_url: 'https://www.google.com/maps/place/AV+Children%27s+Dental+Clinic/data=!4m7!3m6!1s0x3bc2bff4ce99bced:0x1391b294e447e575', area: 'Aundh' },
  { name: 'Tooth Plus Gums Dental Clinic', phone: '096579 21130', website: 'toothplusgums.com', maps_url: 'https://www.google.com/maps/place/TOOTH+PLUS+GUMS+KIDS+%26+FAMILY+DENTAL+CLINIC/data=!4m7!3m6!1s0x3bc2bf31ebda523b:0x973419d07bab1cb7', area: 'Aundh' },
  { name: 'Toothsi by MakeO Baner', phone: '086559 84777', website: 'makeo.app', maps_url: 'https://www.google.com/maps/place/Toothsi+by+MakeO/data=!4m7!3m6!1s0x3bc2bfdd337d9f1f:0x7d94d9bf57df4153', area: 'Baner' },
  { name: 'Smiletec Dental Clinic', phone: '098218 47712', website: 'smiletecdental.com', maps_url: 'https://www.google.com/maps/place/Smiletec+Dental+Clinic/data=!4m7!3m6!1s0x3bc2c2029f669195:0xaef26f648d7078fc', area: 'Baner' },
  { name: 'Nidaan Dental CBCT Centre', phone: '098230 05363', website: 'nidaandental.com', maps_url: 'https://www.google.com/maps/place/NIDAAN+CBCT+%26+OPG+CENTRE/data=!4m7!3m6!1s0x3bc2bf3b73355d43:0xc5da0efc69711ff3', area: 'Aundh' },
  { name: 'Katara Dental Clinic', phone: '096079 92951', website: 'kataradental.com', maps_url: 'https://www.google.com/maps/place/Katara+Dental+Private+Limited/data=!4m7!3m6!1s0x3bc2bf3900000001:0xdea505db0121fe53', area: 'Aundh' },
  { name: 'Cure Charitable Dental Trust', phone: '098225 64171', website: 'toothtrack.in', maps_url: 'https://www.google.com/maps/place/Cure+charitable+dental+trust/data=!4m7!3m6!1s0x3bc2bf1f3b19f79d:0xf58e2e585f60e946', area: 'Aundh' },
  { name: 'Apex Dental Orthodontic & Implant Centre', phone: '020 2991 2345', website: 'apexdentz.com', maps_url: 'https://www.google.com/maps/place/Apex+Dental+orthodontic+and+implant+centre/data=!4m7!3m6!1s0x3bc2bed81448b9c7:0xd80777b32c255d2b', area: 'Baner' },
  { name: 'Dermaplus Skin & Dental Clinic', phone: '070092 19058', website: 'dermaplusclinic.in', maps_url: 'https://www.google.com/maps/place/Dermaplus+skin+clinic/data=!4m7!3m6!1s0x3bc2bf3b7a31018d:0x613ae2c8eb4dc484', area: 'Aundh' },
  { name: 'Dream Smiles Cosmetic Dentistry', phone: '074482 24262', website: 'dreamsmilesclinic.com', maps_url: 'https://www.google.com/maps/place/Dream+Smiles+-+Cosmetic+Dentistry/data=!4m7!3m6!1s0x3bc2bfc7fcfc853d:0x3ef13835eaa2e572', area: 'Baner' },
  { name: 'Eledent Dental Clinic', phone: '081328 18181', website: 'getmy.clinic', maps_url: 'https://www.google.com/maps/place/Eledent/data=!4m7!3m6!1s0x3bc2bf8c58b53693:0x66201fb78abf0030', area: 'Baner' },
  { name: 'Dr Tooth Advanced Dental Care', phone: '093713 34430', website: 'drtoothpune.com', maps_url: 'https://www.google.com/maps/place/Dr.+Tooth+Advanced+Dental+Care/data=!4m7!3m6!1s0x3bc2bf3', area: 'Baner' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  if (digits.startsWith('91') && digits.length === 12) return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`
  return raw
}

// ─── Seed ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Seeding ${RAW.length} clinic prospects…\n`)

  const slugsSeen = new Set<string>()
  const records = RAW.map(c => {
    let slug = toSlug(c.name)
    let attempt = slug
    let n = 2
    while (slugsSeen.has(attempt)) attempt = `${slug}-${n++}`
    slugsSeen.add(attempt)

    return {
      slug: attempt,
      template: 'clinic',
      business_name: c.name,
      maps_url: c.maps_url,
      is_active: false,          // prospect — flip to true when ready to demo
      data: {
        name: c.name,
        phone: formatPhone(c.phone),
        city: 'Pune',
        area: c.area,
        website: c.website,
        email: `hello@${c.website}`,
        tagline: `Trusted dental care in ${c.area}, Pune`,
        booking_url: '',
      },
    }
  })

  const { data, error } = await supabase
    .from('demo_clients')
    .upsert(records, { onConflict: 'slug', ignoreDuplicates: true })
    .select('slug, business_name')

  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }

  console.log(`✓ Inserted/skipped ${records.length} records`)
  if (data) {
    data.forEach(r => console.log(`  • ${r.slug} — ${r.business_name}`))
  }
}

main()
