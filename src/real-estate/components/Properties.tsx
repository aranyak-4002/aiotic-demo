import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { useDemoParams } from '../useParams'

const properties = [
  { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop', name: 'Skyline Heights', location: 'Baner, Pune', price: '₹1.2 Cr', beds: 3, baths: 2, sqft: '1,450', tag: 'Ready to Move' },
  { img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop', name: 'The Orchid Residences', location: 'Wakad, Pune', price: '₹85 L', beds: 2, baths: 2, sqft: '1,100', tag: 'New Launch' },
  { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop', name: 'Greenwood Villas', location: 'Hinjewadi, Pune', price: '₹2.8 Cr', beds: 4, baths: 3, sqft: '2,800', tag: 'Under Construction' },
]

const tagColor: Record<string, string> = {
  'Ready to Move': '#1C3C28',
  'New Launch': '#7C3C00',
  'Under Construction': '#1A3C5C',
}

export default function Properties() {
  const { city } = useDemoParams()
  const localized = properties.map(p => ({ ...p, location: p.location.replace('Pune', city) }))

  return (
    <section id="properties" style={{ background: '#fff', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Currently Representing
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            Handpicked Premium Properties
          </h2>
          <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.84rem', color: '#1C3C28', textDecoration: 'none', borderBottom: '1px solid #1C3C28', paddingBottom: '2px', flexShrink: 0 }}>
            View All →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {localized.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EBEBEB', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.7rem', color: '#fff', background: tagColor[p.tag] || '#333', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                  {p.tag}
                </span>
              </div>
              {/* Details */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
                  <MapPin size={13} color="#999" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#999' }}>{p.location}</span>
                </div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#0A0A0A', marginBottom: '0.85rem' }}>{p.name}</h3>
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1rem' }}>
                  {[{ icon: Bed, val: `${p.beds} Beds` }, { icon: Bath, val: `${p.baths} Baths` }, { icon: Square, val: `${p.sqft} sqft` }].map(({ icon: Icon, val }) => (
                    <span key={val} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#666' }}>
                      <Icon size={13} color="#999" /> {val}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '0.85rem' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0A0A0A' }}>{p.price}</span>
                  <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.78rem', color: '#1C3C28', textDecoration: 'none' }}>View Details →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
