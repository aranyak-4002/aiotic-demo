import { useState } from 'react'
import { useDemoParams } from '../useParams'

const categories = [
  'Residential Interiors',
  'Commercial Interiors',
  'Workspace Design',
  'Showroom Design',
  'Turnkey Design Solutions',
]

const images = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop',
]

export default function Portfolio() {
  const [active, setActive] = useState(0)
  const { } = useDemoParams()

  return (
    <section id="portfolio" className="py-24" style={{ background: '#152E29' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Headline — two lines */}
        <h2 className="font-cormorant font-semibold text-5xl text-white leading-tight mb-14">
          Thoughtful Design Built<br />For Real Living
        </h2>

        {/* Body: left sidebar categories + right 3×3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">

          {/* Left: category list */}
          <ul className="space-y-5 md:sticky md:top-32 self-start">
            {categories.map((cat, i) => (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  className="font-inter text-sm text-left transition-colors w-full"
                  style={{ color: active === i ? '#C9A96E' : 'rgba(255,255,255,0.4)' }}>
                  {cat}
                </button>
                {active === i && (
                  <div className="mt-2 h-px w-8" style={{ background: '#C9A96E' }} />
                )}
              </li>
            ))}
          </ul>

          {/* Right: 3×3 image grid */}
          <div className="grid grid-cols-3 gap-3">
            {images.map((src, i) => (
              <div key={i} className="group overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}>
                <img
                  src={src}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
