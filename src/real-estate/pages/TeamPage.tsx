import { useDemoParams } from '../useParams'

const members = [
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&facepad=3', role: 'Founder & Principal Consultant' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&facepad=3', name: 'Anjali Verma', role: 'Senior Property Advisor' },
  { img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&facepad=3', name: 'Suresh Nair', role: 'Investment Specialist' },
  { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&facepad=3', name: 'Meera Pillai', role: 'Legal & Documentation Head' },
]

export default function TeamPage() {
  const { agentName, agencyName, email } = useDemoParams()
  const localized = members.map((m, i) => ({ ...m, name: i === 0 ? agentName : m.name }))

  return (
    <>
      {/* Page Hero */}
      <div style={{ background: '#fff', paddingTop: '120px', paddingBottom: '3rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: '#1C3C28', marginBottom: '1.25rem' }} />
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Meet Our Team
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#666' }}>
            Experts who put your interests first
          </p>
        </div>
      </div>

      {/* Team section (inlined from Team.tsx) */}
      <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Our Team
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              Meet Our Expert Team
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {localized.map((m, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EBEBEB' }}>
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#0A0A0A' }}>{m.name}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.78rem', color: '#999', marginTop: '4px' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Strip (NEW) */}
      <section style={{ background: '#1C3C28', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}>
            Want to join our team?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            We're always looking for talented real estate professionals who share our commitment to client excellence.
          </p>
          <a href={`mailto:${email}?subject=Career Enquiry at ${agencyName}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '6px', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
            Send Your CV
          </a>
        </div>
      </section>
    </>
  )
}
