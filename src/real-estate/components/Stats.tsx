import { useDemoParams } from '../useParams'

const services = [
  { num: '01', title: 'Property Sales', body: 'End-to-end assistance for buying and selling residential and commercial properties.' },
  { num: '02', title: 'Rental Management', body: 'Tenant sourcing, rent collection and property upkeep — fully managed.' },
  { num: '03', title: 'Property Valuation', body: 'Accurate market valuations backed by real transaction data and local expertise.' },
  { num: '04', title: 'Investment Advisory', body: 'Data-driven recommendations to maximise capital growth and rental yields.' },
  { num: '05', title: 'Legal Assistance', body: 'Title checks, agreement drafting and registration — handled by our in-house legal team.' },
  { num: '06', title: 'NRI Services', body: 'Seamless property buying, management and repatriation services for NRI investors.' },
]

export default function Stats() {
  const { } = useDemoParams()

  return (
    <section style={{ background: '#fff', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          What We Offer
        </p>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '3rem' }}>
          Our Services
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#EBEBEB', border: '1px solid #EBEBEB', borderRadius: '8px', overflow: 'hidden' }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: '2rem 1.75rem' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8F8F6')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#EBEBEB', marginBottom: '1rem' }}>{s.num}</p>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.98rem', color: '#0A0A0A', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: '#777', lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
