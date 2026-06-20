import { useDemoParams } from '../useParams'

const quickLinks = [
  { label: 'Home', href: '/real-estate/' },
  { label: 'Properties', href: '/real-estate/properties/' },
  { label: 'Services', href: '/real-estate/services/' },
  { label: 'About Us', href: '/real-estate/about/' },
  { label: 'Team', href: '/real-estate/team/' },
]

const cols = [
  { title: 'Quick Links', links: ['Home', 'Properties', 'Services', 'About Us', 'Team'] },
  { title: 'Resources', links: ['Buyer\'s Guide', 'Investment Tips', 'Legal FAQ', 'EMI Calculator', 'Area Guides'] },
  { title: 'Contact', links: [] },
]

export default function Footer() {
  const { agencyName, phone, email, city } = useDemoParams()

  return (
    <footer style={{ background: '#0A0A0A', padding: '4rem 2.5rem 2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>{agencyName}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: '240px' }}>
              Premium real estate consultancy helping buyers, sellers and investors in {city} and across India.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>📞 {phone}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>✉️ {email}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Quick Links
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Resources
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {cols[1].links.map(l => (
                <li key={l}>
                  <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Follow Us
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Instagram', 'Facebook', 'LinkedIn', 'Twitter (X)'].map(s => (
                <a key={s} href="#" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 {agencyName}. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            Demo by Aiotic Technologies
          </p>
        </div>
      </div>
    </footer>
  )
}
