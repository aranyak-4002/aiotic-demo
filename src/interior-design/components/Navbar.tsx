import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { useDemoParams } from '../useParams'

const links = [
  { label: 'Home', href: '/interior-design/' },
  { label: 'About Us', href: '/interior-design/about/' },
  { label: 'Services', href: '/interior-design/services/' },
  { label: 'Portfolio', href: '/interior-design/portfolio/' },
  { label: 'Contact', href: '/interior-design/contact/' },
]

export default function Navbar() {
  const { firmName, specialty, phone } = useDemoParams()
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname

  // Initials from firm name
  const initials = firmName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  function isActive(href: string) {
    if (href === '/interior-design/') return currentPath === '/interior-design/' || currentPath === '/interior-design'
    return currentPath.includes(href.replace(/\/$/, ''))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo — initials avatar + firm name + specialty */}
        <a href="/interior-design/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-inter font-semibold text-xs">{initials}</span>
          </div>
          <div>
            <div className="font-inter font-semibold text-sm text-gray-900 leading-tight">{firmName}</div>
            <div className="font-inter text-xs text-gray-400 leading-tight">{specialty}</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className={`font-inter text-sm transition-colors ${isActive(l.href) ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: search + CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex w-8 h-8 items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
            <Search size={17} />
          </button>
          <a href={`tel:${phone.replace(/\D/g, '')}`}
            className="hidden md:inline-block bg-gray-900 text-white font-inter text-sm py-2 px-5 hover:bg-gray-700 transition-colors">
            Get In Touch
          </a>
          <button className="md:hidden" onClick={() => setOpen(o => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6">
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 font-inter text-sm border-b border-gray-100 last:border-0 ${isActive(l.href) ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${phone.replace(/\D/g, '')}`}
            className="mt-4 block w-full text-center bg-gray-900 text-white font-inter text-sm py-3">
            Get In Touch
          </a>
        </div>
      )}
    </header>
  )
}
