import { useDemoParams } from '../useParams'

const navLinks = [
  { label: 'Home', href: '/interior-premium/' },
  { label: 'About', href: '/interior-premium/about/' },
  { label: 'Services', href: '/interior-premium/services/' },
  { label: 'Portfolio', href: '/interior-premium/portfolio/' },
  { label: 'Contact', href: '/interior-premium/contact/' },
]
const socialLinks = ['Instagram', 'Houzz', 'Pinterest']

export default function Footer() {
  const { firmName, phone, tagline } = useDemoParams()
  const wa = `https://wa.me/91${phone.replace(/\D/g, '')}`

  return (
    <footer className="bg-forest py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <h3 className="font-cormorant font-semibold text-3xl text-white italic">{firmName}</h3>
            <p className="font-inter font-light text-sm text-white/50 mt-3 max-w-xs leading-relaxed">
              {tagline}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <p className="font-inter font-light text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
              Ready to Start Your Project?
            </p>
            <a href={wa} target="_blank" rel="noreferrer"
              className="font-inter text-xs uppercase tracking-widest text-white py-3 px-8 transition-colors hover:bg-white hover:text-forest"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              Get In Touch
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="font-inter font-light text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">
                {l.label}
              </a>
            ))}
          </nav>
          <span className="font-inter text-sm text-white/30">{firmName}</span>
          <div className="flex gap-6">
            {socialLinks.map(s => (
              <a key={s} href="#"
                className="font-inter font-light text-xs text-white/50 hover:text-white transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        <p className="font-inter text-xs text-white/20 text-center mt-8">
          Demo website built by{' '}
          <a href="https://getaiotic.com" target="_blank" rel="noreferrer" className="hover:text-white/50 transition-colors">
            Aiotic Technologies
          </a>
        </p>
      </div>
    </footer>
  )
}
