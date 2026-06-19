import { useDemoParams } from '../useParams'

export default function Hero() {
  const { city, phone, properties, clients, years } = useDemoParams()

  const stats = [
    { value: properties, label: 'Properties Listed' },
    { value: clients,    label: 'Happy Clients' },
    { value: years + ' Yrs', label: 'Industry Experience' },
  ]

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '560px', overflow: 'hidden', marginTop: '68px' }}>
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop"
        alt="Property"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)' }} />

      {/* Centre text */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem 120px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Premium Real Estate Consultancy — {city}
        </p>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '800px' }}>
          Find the Right Property.<br />Confidently.
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginTop: '1.25rem', lineHeight: 1.75, maxWidth: '480px' }}>
          Expert guidance for buying, selling, and investing in premium residential and commercial real estate.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#properties" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#fff', background: '#1C3C28', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none' }}>
            View Properties
          </a>
          <a href={`tel:${phone}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.88rem', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none' }}>
            Talk to an Expert
          </a>
        </div>
      </div>

      {/* Stats strip — overlaid at bottom of hero image */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex', justifyContent: 'center',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            flex: 1, maxWidth: '260px', textAlign: 'center',
            padding: '1.75rem 2rem',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
          }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.4rem', letterSpacing: '0.04em' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
