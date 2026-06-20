import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useDemoParams } from '../useParams'

const links = [
  { label: 'Home', href: '/real-estate/' },
  { label: 'Properties', href: '/real-estate/properties/' },
  { label: 'Services', href: '/real-estate/services/' },
  { label: 'About', href: '/real-estate/about/' },
  { label: 'Team', href: '/real-estate/team/' },
]

export default function Navbar() {
  const { agencyName, phone } = useDemoParams()
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname

  function isActive(href: string) {
    if (href === '/real-estate/') return currentPath === '/real-estate/' || currentPath === '/real-estate'
    return currentPath.includes(href.replace(/\/$/, ''))
  }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fff', borderBottom: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', display: 'flex', alignItems: 'center', height: '68px', gap: '2rem' }}>
        <a href="/real-estate/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0A0A0A', textDecoration: 'none', flexShrink: 0, letterSpacing: '-0.02em' }}>
          {agencyName}
        </a>

        <div style={{ display: 'flex', gap: '2rem', marginLeft: 'auto', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: isActive(l.href) ? 600 : 400, fontSize: '0.875rem', color: isActive(l.href) ? '#0A0A0A' : '#555', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? '#0A0A0A' : '#555')}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${phone}`} style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.84rem',
            color: '#fff', background: '#1C3C28',
            padding: '0.55rem 1.25rem', borderRadius: '6px',
            textDecoration: 'none', flexShrink: 0,
          }}>
            Schedule Viewing
          </a>
        </div>

        <button onClick={() => setOpen(!open)}
          style={{ display: 'none', border: 'none', background: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  )
}
