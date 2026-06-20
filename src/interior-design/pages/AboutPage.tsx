import { useDemoParams } from '../useParams'

const aboutImages = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop', alt: 'Minimal white room' },
  { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop', alt: 'Bedroom interior' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop', alt: 'Kitchen interior' },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop', alt: 'Modern bathroom' },
]

const processSteps = [
  { num: '01', name: 'Discovery Call', desc: 'We start by understanding your vision, lifestyle, and budget in a relaxed 30-minute call.' },
  { num: '02', name: 'Concept & Mood Board', desc: 'We build a curated mood board with material palettes, textures, and style references for your approval.' },
  { num: '03', name: 'Design & 3D Renders', desc: 'Full room layouts with photorealistic 3D renders — see every detail before work begins.' },
  { num: '04', name: 'Execution & Handover', desc: 'We manage vendors, timelines, and quality checks end-to-end and hand over a finished space.' },
]

export default function AboutPage() {
  const { firmName, city, years, projects, cal } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1A1A1A', minHeight: '340px', paddingTop: '65px' }}
      >
        <div className="w-12 h-px bg-gray-600 mb-8" />
        <h1 className="font-playfair font-bold text-5xl text-white leading-tight">About Us</h1>
        <p className="font-inter font-light text-gray-400 mt-4 text-base max-w-lg">
          {firmName} — Transforming spaces through thoughtful design
        </p>
      </div>

      {/* About Section (inlined from About.tsx) */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Text row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-14">
            <div>
              <p className="font-inter uppercase text-xs tracking-widest text-gray-400">About Us</p>
              <h2 className="font-playfair font-bold text-4xl text-gray-900 mt-3 leading-tight">
                Discover The Power Of Design
              </h2>
            </div>
            <div>
              <p className="font-inter text-gray-500 leading-relaxed">
                We believe in the power of design for creating a beautiful and functional environment.{' '}
                <strong className="text-gray-700">{firmName}</strong> brings {years} years of experience
                transforming spaces across {city} and beyond.
              </p>
              <div className="flex gap-10 mt-8">
                {[
                  { value: projects, label: 'Projects Completed' },
                  { value: `${years}+`, label: 'Years Experience' },
                  { value: '100%', label: 'Client Satisfaction' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-playfair font-bold text-3xl text-gray-900">{s.value}</div>
                    <div className="font-inter text-xs text-gray-400 mt-1 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              <a href={cal} target="_blank" rel="noreferrer"
                className="inline-block bg-gray-900 text-white font-inter text-sm py-3 px-6 mt-8 hover:bg-gray-700 transition-colors">
                Book a Consultation
              </a>
            </div>
          </div>

          {/* 4 tall images */}
          <div className="grid grid-cols-4 gap-3 items-start pb-16">
            {aboutImages.map((img, i) => (
              <div key={i}
                className={`overflow-hidden ${i % 2 === 1 ? 'mt-12' : ''}`}
                style={{ aspectRatio: '2/5' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process (NEW) */}
      <section className="py-20 bg-[#F8F8F6]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-inter uppercase text-xs tracking-widest text-gray-400 mb-2">How We Work</p>
          <h2 className="font-playfair font-bold text-4xl text-gray-900 mb-12 leading-tight">Our Process</h2>

          <div className="divide-y divide-gray-200">
            {processSteps.map((step, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[80px_220px_1fr] gap-6 py-8 items-start">
                <div className="font-playfair font-bold text-3xl text-gray-200">{step.num}</div>
                <div className="font-inter font-semibold text-base text-gray-900">{step.name}</div>
                <div className="font-inter text-sm text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16" style={{ background: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-playfair font-bold text-3xl text-white">Ready to transform your space?</h2>
          <a href={cal} target="_blank" rel="noreferrer"
            className="inline-block bg-white text-gray-900 font-inter text-sm py-3 px-8 hover:bg-gray-100 transition-colors whitespace-nowrap">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
