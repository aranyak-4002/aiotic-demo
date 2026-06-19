import { ChevronDown } from 'lucide-react'
import { useDemoParams } from '../useParams'

export default function Hero() {
  const { tagline } = useDemoParams()

  return (
    <section className="pt-20 min-h-screen flex flex-col bg-white">
      {/* Text block */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8 text-center">
        <h1 className="font-playfair font-bold text-gray-900 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Beautify and Enhance Your Space<br className="hidden md:block" /> With Our Expertise
        </h1>
        <p className="font-inter text-gray-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* Hero image with rotating badge */}
      <div className="relative flex-1 min-h-[40vh] md:min-h-[58vh] mx-4 md:mx-8 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop"
          alt="Modern minimal living room"
          className="w-full h-full object-cover"
          style={{ minHeight: '40vh' }}
        />

        {/* Rotating badge */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-20 h-20 md:w-24 md:h-24">
          <div className="relative w-full h-full">
            <svg className="animate-spin-slow w-full h-full" viewBox="0 0 96 96">
              <defs>
                <path id="badge-circle" d="M 48,48 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
              </defs>
              <circle cx="48" cy="48" r="40" fill="#1A1A1A" />
              <text fill="white" fontSize="7.5" fontFamily="Inter, sans-serif" letterSpacing="2.8">
                <textPath href="#badge-circle">SCROLL DOWN • EXPLORE MORE •</textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronDown size={18} color="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
