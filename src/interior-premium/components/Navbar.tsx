import { useState } from 'react'
import { Bookmark, Share2, X, Menu } from 'lucide-react'
import { useDemoParams } from '../useParams'

const links = [
  { label: 'Home', href: '/interior-premium/' },
  { label: 'About', href: '/interior-premium/about/' },
  { label: 'Services', href: '/interior-premium/services/' },
  { label: 'Portfolio', href: '/interior-premium/portfolio/' },
  { label: 'Contact', href: '/interior-premium/contact/' },
]

export default function Navbar() {
  const { firmName } = useDemoParams()
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname

  function isActive(href: string) {
    if (href === '/interior-premium/') return currentPath === '/interior-premium/' || currentPath === '/interior-premium'
    return currentPath.includes(href.replace(/\/$/, ''))
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

          {/* Left — subtle firm name */}
          <a href="/interior-premium/" className="font-inter font-light text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            {firmName}
          </a>

          {/* Center — nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="font-inter font-light text-xs uppercase transition-colors"
                style={{ letterSpacing: '0.15em', color: isActive(l.href) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)')}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right — icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex w-8 h-8 items-center justify-center transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              <Bookmark size={15} />
            </button>
            <button className="hidden md:flex w-8 h-8 items-center justify-center transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              <Share2 size={15} />
            </button>
            <button className="md:hidden" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={() => setOpen(o => !o)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10" style={{ background: '#1C3A35' }}>
          <button className="absolute top-5 right-8" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setOpen(false)}
              className="font-cormorant font-semibold text-4xl italic hover:text-gold transition-colors text-white">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
