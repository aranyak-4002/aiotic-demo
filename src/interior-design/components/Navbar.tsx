import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useDemoParams } from '../useParams'

const links = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { firmName, phone } = useDemoParams()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-inter font-semibold uppercase tracking-widest text-sm text-gray-900">
          <span>🛋️</span>
          <span>{firmName}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="font-inter text-sm text-gray-500 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a href={`tel:${phone.replace(/\D/g, '')}`}
            className="hidden md:inline-block bg-gray-900 text-white font-inter text-sm py-2 px-5 hover:bg-gray-700 transition-colors">
            Contact Us
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
              className="block py-3 font-inter text-sm text-gray-600 border-b border-gray-100 last:border-0">
              {l.label}
            </a>
          ))}
          <a href={`tel:${phone.replace(/\D/g, '')}`}
            className="mt-4 block w-full text-center bg-gray-900 text-white font-inter text-sm py-3">
            Contact Us
          </a>
        </div>
      )}
    </header>
  )
}
