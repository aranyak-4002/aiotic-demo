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
import { useDemoParams } from './useParams'

export default function App() {
  const { cal } = useDemoParams()

  return (
    <div className="font-inter" style={{ background: '#1C3A35', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Intro />
      <Stats />
      <Studio />
      <Services />
      <Signature />
      <WhyUs />
      <Portfolio />
      <Testimonials />
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
