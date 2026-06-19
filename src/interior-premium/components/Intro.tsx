import { ArrowRight } from 'lucide-react'
import { useDemoParams } from '../useParams'

export default function Intro() {
  const { firmName, city, years, cal } = useDemoParams()

  return (
    <section id="about" className="py-24" style={{ background: '#1C3A35' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="md:sticky md:top-32 self-start">
            <p className="font-inter text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>About Us</p>
            <h2 className="font-cormorant font-semibold text-5xl leading-tight mt-4 text-white">
              Designing Spaces<br />That Feel Like Home
            </h2>
            <div className="w-12 h-px my-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-inter font-light text-base leading-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We design spaces that feel intentional, lived-in, and timeless.{' '}
              <span className="text-white">{firmName}</span> believes that great design is not just about
              aesthetics — it is about creating environments where people feel deeply at home.
            </p>
            <p className="font-inter font-light text-base leading-8 mt-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Based in {city}, we bring {years} of expertise to every project — from intimate
              residential interiors to large-scale commercial transformations.
            </p>
            <a href={cal} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 font-inter text-xs uppercase mt-8 group transition-all"
              style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>
              Know More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
