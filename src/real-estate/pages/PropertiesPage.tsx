import { useState } from 'react'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { useDemoParams } from '../useParams'

const allProperties = [
  { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop', name: 'Skyline Heights', location: 'Baner, Pune', price: '₹1.2 Cr', beds: 3, baths: 2, sqft: '1,450', tag: 'Ready to Move', type: 'Apartment' },
  { img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop', name: 'The Orchid Residences', location: 'Wakad, Pune', price: '₹85 L', beds: 2, baths: 2, sqft: '1,100', tag: 'New Launch', type: 'Apartment' },
  { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop', name: 'Greenwood Villas', location: 'Hinjewadi, Pune', price: '₹2.8 Cr', beds: 4, baths: 3, sqft: '2,800', tag: 'Under Construction', type: 'Villa' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop', name: 'The Meridian Park', location: 'Kothrud, Pune', price: '₹1.65 Cr', beds: 3, baths: 2, sqft: '1,680', tag: 'Ready to Move', type: 'Apartment' },
  { img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop', name: 'Serene Valley Villas', location: 'Bavdhan, Pune', price: '₹3.5 Cr', beds: 5, baths: 4, sqft: '3,400', tag: 'New Launch', type: 'Villa' },
  { img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop', name: 'Platinum Business Hub', location: 'Viman Nagar, Pune', price: '₹2.1 Cr', beds: 0, baths: 2, sqft: '2,100', tag: 'Ready to Move', type: 'Commercial' },
]

const tagColor: Record<string, string> = {
  'Ready to Move': '#1C3C28',
  'New Launch': '#7C3C00',
  'Under Construction': '#1A3C5C',
}

export default function PropertiesPage() {
  const { city, properties } = useDemoParams()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [budgetFilter, setBudgetFilter] = useState('Any')

  const localized = allProperties.map(p => ({ ...p, location: p.location.replace('Pune', city) }))

  return (
    <>
      {/* Page Hero */}
      <div style={{ background: '#fff', paddingTop: '120px', paddingBottom: '3rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: '#1C3C28', marginBottom: '1.25rem' }} />
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Properties in {city}
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#666' }}>
            {properties} curated listings — verified, legal-clear, ready for you
          </p>
        </div>
      </div>

      {/* Search / Filter bar */}
      <div style={{ background: '#F8F8F6', borderBottom: '1px solid #EBEBEB', padding: '1.25rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by area or project name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 260px', fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#0A0A0A', border: '1px solid #EBEBEB', borderRadius: '6px', padding: '0.65rem 1rem', outline: 'none', background: '#fff' }}
          />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#0A0A0A', border: '1px solid #EBEBEB', borderRadius: '6px', padding: '0.65rem 1rem', background: '#fff', cursor: 'pointer' }}
          >
            <option value="All">Type: All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
          <select
            value={budgetFilter}
            onChange={e => setBudgetFilter(e.target.value)}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#0A0A0A', border: '1px solid #EBEBEB', borderRadius: '6px', padding: '0.65rem 1rem', background: '#fff', cursor: 'pointer' }}
          >
            <option value="Any">Budget: Any</option>
            <option value="under50">Under ₹50L</option>
            <option value="50-1cr">₹50L–₹1Cr</option>
            <option value="1cr+">₹1Cr+</option>
          </select>
          <button
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#fff', background: '#1C3C28', border: 'none', borderRadius: '6px', padding: '0.65rem 1.75rem', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Properties grid (inlined + extended) */}
      <section style={{ background: '#fff', padding: '4rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {localized.map((p, i) => (
              <div key={i}
                style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EBEBEB', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.7rem', color: '#fff', background: tagColor[p.tag] || '#333', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
                    <MapPin size={13} color="#999" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#999' }}>{p.location}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#0A0A0A', marginBottom: '0.85rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1rem' }}>
                    {p.beds > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#666' }}>
                        <Bed size={13} color="#999" /> {p.beds} Beds
                      </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#666' }}>
                      <Bath size={13} color="#999" /> {p.baths} Baths
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#666' }}>
                      <Square size={13} color="#999" /> {p.sqft} sqft
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '0.85rem' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0A0A0A' }}>{p.price}</span>
                    <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.78rem', color: '#1C3C28', textDecoration: 'none' }}>View Details →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#1C3C28', background: 'transparent', border: '1.5px solid #1C3C28', borderRadius: '6px', padding: '0.75rem 2rem', cursor: 'pointer' }}>
              Load More Properties
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
