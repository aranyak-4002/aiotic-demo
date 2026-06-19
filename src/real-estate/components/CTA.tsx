import { useDemoParams } from '../useParams'

export default function CTA() {
  const { phone, email } = useDemoParams()

  return (
    <section style={{ background: '#1C3C28', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
          Ready to Find Your Perfect Property?
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginTop: '1rem', lineHeight: 1.75 }}>
          Schedule a free consultation with one of our expert agents. No pressure, no jargon — just honest advice.
        </p>

        <div style={{ display: 'flex', gap: '0', marginTop: '2.5rem', borderRadius: '6px', overflow: 'hidden', maxWidth: '480px', margin: '2.5rem auto 0' }}>
          <input type="email" placeholder="Enter your email address"
            style={{ flex: 1, padding: '0.9rem 1.25rem', fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#0A0A0A', border: 'none', outline: 'none', background: '#fff' }} />
          <button style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#fff', background: '#0A0A0A', padding: '0.9rem 1.5rem', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Get in Touch
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2rem' }}>
          <a href={`tel:${phone}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>📞 {phone}</a>
          <a href={`mailto:${email}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>✉️ {email}</a>
        </div>
      </div>
    </section>
  )
}
