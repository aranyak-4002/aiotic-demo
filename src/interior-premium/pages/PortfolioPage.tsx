import { useState } from 'react'
import { useDemoParams } from '../useParams'

const categories = [
  'Residential Interiors',
  'Commercial Interiors',
  'Workspace Design',
  'Showroom Design',
  'Turnkey Design Solutions',
]

const row1Images = [
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

const row2Images = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop',
]

export default function PortfolioPage() {
  const [active, setActive] = useState(0)
  const { projects, city } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#152E29', minHeight: '380px', paddingTop: '72px' }}
      >
        <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
          Our Work
        </p>
        <h1 className="font-cormorant font-semibold italic text-5xl md:text-6xl text-white leading-tight">
          Portfolio
        </h1>
        <div className="mt-5 w-16 h-px" style={{ background: '#C9A96E' }} />
        <p className="font-inter font-light text-base mt-5 max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {projects} projects across {city} and beyond
        </p>
      </div>

      {/* Portfolio section (inlined from Portfolio.tsx) */}
      <section id="portfolio" className="py-24" style={{ background: '#152E29' }}>
        <div className="max-w-7xl mx-auto px-8">

          <h2 className="font-cormorant font-semibold text-5xl text-white leading-tight mb-14">
            Thoughtful Design Built<br />For Real Living
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">

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

            <div className="grid grid-cols-3 gap-3">
              {row1Images.map((src, i) => (
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

      {/* Second row of 6 images */}
      <section className="pb-24 px-8" style={{ background: '#152E29' }}>
        <div className="max-w-7xl mx-auto">
          <div className="md:ml-[212px]">
            <div className="grid grid-cols-3 gap-3">
              {row2Images.map((src, i) => (
                <div key={i} className="group overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}>
                  <img
                    src={src}
                    alt={`Project ${row1Images.length + i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
