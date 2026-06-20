import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Stats from './components/Stats'
import Studio from './components/Studio'
import Services from './components/Services'
import Signature from './components/Signature'
import WhyUs from './components/WhyUs'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
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
    <div className="font-inter" style={{ background: '#1C3A35', color: '#ffffff' }}>
      <Navbar />
      {page === 'home' && (
        <div style={{ paddingTop: '72px' }}>
          <Hero /><Intro /><Stats /><Studio /><Services /><Signature /><WhyUs /><Portfolio /><Testimonials />
        </div>
      )}
      {page === 'about' && <AboutPage />}
      {page === 'services' && <ServicesPage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'contact' && <ContactPage />}
      <Footer />

      {/* Watermark */}
      <div className="fixed bottom-5 right-5 z-50">
        <a href={cal} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-white text-xs px-4 py-2 transition-colors"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span style={{ color: '#C9A96E' }}>⚡</span>
          <span>Built by Aiotic Technologies</span>
        </a>
      </div>
    </div>
  )
}
