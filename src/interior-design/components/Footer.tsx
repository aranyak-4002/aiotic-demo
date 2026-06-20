import { useDemoParams } from '../useParams'

const menuLinks = [
  { label: 'Home', href: '/interior-design/' },
  { label: 'About Us', href: '/interior-design/about/' },
  { label: 'Services', href: '/interior-design/services/' },
  { label: 'Portfolio', href: '/interior-design/portfolio/' },
  { label: 'Contact', href: '/interior-design/contact/' },
]
const helpLinks = ['Privacy and Policy', 'Term of Use']
const socialLinks = ['Instagram', 'Facebook', 'Twitter']

export default function Footer() {
  const { firmName, tagline } = useDemoParams()

  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-inter font-semibold uppercase tracking-widest text-sm">
              <span>🛋️</span>
              <span>{firmName}</span>
            </div>
            <p className="font-inter text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">{tagline}</p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-inter font-semibold text-white mb-4 text-sm">Menu</h4>
            <ul className="space-y-2">
              {menuLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="font-inter text-gray-400 text-sm hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-inter font-semibold text-white mb-4 text-sm">Help</h4>
            <ul className="space-y-2">
              {helpLinks.map(l => (
                <li key={l}>
                  <a href="#" className="font-inter text-gray-400 text-sm hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-inter font-semibold text-white mb-4 text-sm">Social</h4>
            <ul className="space-y-2">
              {socialLinks.map(l => (
                <li key={l}>
                  <a href="#" className="font-inter text-gray-400 text-sm hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="font-inter text-gray-500 text-xs">
            Copyright © 2026 {firmName}. All Rights Reserved.
          </p>
          <p className="font-inter text-gray-600 text-xs mt-1">
            Demo website built by{' '}
            <a href="https://getaiotic.com" target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors">
              Aiotic Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
