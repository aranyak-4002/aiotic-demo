import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brands from './components/Brands'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import { useDemoParams } from './useParams'

function getPage() {
  const path = window.location.pathname
  if (path.includes('/about')) return 'about'
  if (path.includes('/services')) return 'services'
  if (path.includes('/portfolio')) return 'portfolio'
  if (path.includes('/contact')) return 'contact'
  return 'home'
}

export default function App() {
  const { cal } = useDemoParams()
  const page = getPage()

  return (
    <div className="font-inter bg-white text-gray-900">
      <Navbar />
      {page === 'home' && (
        <div style={{ paddingTop: '65px' }}>
          <Hero /><Brands /><About /><Services /><Portfolio /><CTA />
        </div>
      )}
      {page === 'about' && <AboutPage />}
      {page === 'services' && <ServicesPage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'contact' && <ContactPage />}
      <Footer />

      {/* Aiotic watermark */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href={cal}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-black text-white text-xs px-3 py-2 rounded-full opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          <span>⚡</span>
          <span>Built by Aiotic Technologies</span>
        </a>
      </div>
    </div>
  )
}
