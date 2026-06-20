import { useState } from 'react'
import { useDemoParams } from '../useParams'

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&facepad=2',
]

const whySlides = [
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

const philosophies = [
  'Design is not decoration — it is the art of living well.',
  'Every space holds a story waiting to be told with intention.',
  'Beauty and function are not opposites — they are partners.',
]

export default function AboutPage() {
  const { firmName, projects, clients, years } = useDemoParams()
  const [active, setActive] = useState(0)
  const slide = whySlides[active]

  const stats = [
    { value: projects, label: 'Projects Completed' },
    { value: clients, label: 'Happy Clients' },
    { value: years, label: 'Years Experience' },
    { value: '100%', label: 'Satisfaction Rate' },
  ]

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1C3A35', minHeight: '380px', paddingTop: '72px' }}
      >
        <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
          Our Story
        </p>
        <h1 className="font-cormorant font-semibold italic text-5xl md:text-6xl text-white leading-tight">
          About the Studio
        </h1>
        <div className="mt-5 w-16 h-px" style={{ background: '#C9A96E' }} />
        <p className="font-inter font-light text-base mt-5 max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {firmName} — where architecture meets artistry
        </p>
      </div>

      {/* Studio section (inlined from Studio.tsx) */}
      <section className="px-6 md:px-10 py-6" style={{ background: '#1C3A35' }}>
        <div className="relative overflow-hidden w-full" style={{ height: '70vh' }}>
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop"
            alt="Studio interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(28,58,53,0.55)' }} />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="font-inter font-light text-xs uppercase text-white mb-4" style={{ letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
              Featured Studio
            </p>
            <p className="font-cormorant font-semibold text-3xl text-white italic mb-3">{firmName} Studio</p>
            <p className="font-inter font-light text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Trusted by {clients} clients
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <img key={i} src={src} alt="client"
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
                ))}
              </div>
              <span className="font-inter font-light text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{clients}+ Happy Clients</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm tracking-widest" style={{ color: '#C9A96E' }}>★★★★★</span>
              <span className="font-inter font-light text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>5.0 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (inlined from Stats.tsx) */}
      <section className="pb-24" style={{ background: '#1C3A35' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {stats.map((s, i) => (
              <div key={i} className="py-10 px-6 text-center"
                style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div className="font-cormorant font-bold text-5xl leading-none" style={{ color: '#C9A96E' }}>{s.value}</div>
                <div className="font-inter font-light text-xs uppercase mt-3" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy (NEW) */}
      <section className="py-24" style={{ background: '#152E29' }}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
            Our Philosophy
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            {philosophies.map((p, i) => (
              <div key={i} className="flex items-center">
                <p className="font-cormorant font-light italic text-xl text-white leading-snug px-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "{p}"
                </p>
                {i < philosophies.length - 1 && (
                  <span className="hidden md:block text-2xl flex-shrink-0" style={{ color: '#C9A96E' }}>·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhyUs (inlined from WhyUs.tsx) */}
      <section className="py-24" style={{ background: '#1C3A35' }}>
        <div className="max-w-7xl mx-auto px-8">

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

          <div className="flex items-center gap-4">
            {whySlides.map((_s, i) => (
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
    </>
  )
}
