import { useState } from 'react'
import { useDemoParams } from '../useParams'

const slides = [
  {
    title: 'Thoughtful Design For Every Budget',
    body: "We believe exceptional design shouldn't be exclusive. We tailor our approach to your budget without compromising on quality or creativity. Every project receives the same level of care and craftsmanship.",
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop',
  },
  {
    title: 'Transparent Process, Zero Surprises',
    body: "No surprises. We walk you through every decision — from initial concept to final handover. You're involved at every step, and every cost is clearly communicated before work begins.",
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop',
  },
  {
    title: 'Obsessive Attention to Detail',
    body: 'The difference between good and exceptional design lies in the details. We obsess over every finish, every material, every light source — because great spaces are built from a thousand right decisions.',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop',
  },
]

export default function WhyUs() {
  const { firmName } = useDemoParams()
  const [active, setActive] = useState(0)
  const slide = slides[active]

  return (
    <section className="py-24" style={{ background: '#1C3A35' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Top: headline left, description right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14">
          <div>
            <p className="font-inter text-xs uppercase mb-4" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>Why Us</p>
            <h2 className="font-cormorant font-semibold text-5xl text-white leading-tight">
              Why Choose<br />{firmName}?
            </h2>
          </div>
          <div className="flex items-center">
            <p className="font-inter font-light text-base leading-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {slide.body}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden w-full mb-6" style={{ height: '55vh' }}>
          <img
            key={active}
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover opacity-85 transition-opacity duration-500"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(28,58,53,0.3)' }} />
          <div className="absolute bottom-6 left-6">
            <p className="font-cormorant font-semibold text-xl italic text-white">{slide.title}</p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-4">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 group transition-all"
              style={{ opacity: active === i ? 1 : 0.4 }}>
              <div className="transition-all" style={{
                width: active === i ? '2.5rem' : '1rem',
                height: '2px',
                background: active === i ? '#C9A96E' : 'rgba(255,255,255,0.5)',
              }} />
              <span className="font-inter text-xs text-white hidden md:inline" style={{ letterSpacing: '0.1em' }}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
