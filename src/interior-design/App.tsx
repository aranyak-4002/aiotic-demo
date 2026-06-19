import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brands from './components/Brands'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { useDemoParams } from './useParams'

export default function App() {
  const { cal } = useDemoParams()

  return (
    <div className="font-inter bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Brands />
      <About />
      <Services />
      <Portfolio />
      <CTA />
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
