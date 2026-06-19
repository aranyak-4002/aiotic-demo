import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Properties from './components/Properties'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Leadership from './components/Leadership'
import Team from './components/Team'

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', color: '#0A0A0A' }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Properties />
      <Stats />
      <Leadership />
      <WhyUs />
      <Team />
      <Testimonials />
      <CTA />
      <Footer />

      {/* Watermark */}
      <div style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 50 }}>
        <a href="https://getaiotic.com" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0A0A0A', color: '#fff', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>
          ⚡ Built by Aiotic Technologies
        </a>
      </div>
    </div>
  )
}
