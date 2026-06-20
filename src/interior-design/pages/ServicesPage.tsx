import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useDemoParams } from '../useParams'

const services = [
  {
    num: '01',
    name: 'Consultation',
    desc: 'A consultation with an interior designer to discuss design ideas, budget, and project scope. We listen before we draw.',
  },
  {
    num: '02',
    name: 'Layout Design',
    desc: 'Space planning and furniture layout tailored to how you actually live — maximising flow, light, and function.',
  },
  {
    num: '03',
    name: 'Concept Sketches',
    desc: 'Hand-drawn and digital sketches that capture the mood, material palette, and character of your space before work begins.',
  },
  {
    num: '04',
    name: '3D Rendering',
    desc: 'Photorealistic renders so you can see and approve every detail before a single wall is touched.',
  },
  {
    num: '05',
    name: 'Artwork Installation',
    desc: 'Curated art, lighting, and décor placement that brings personality and life to the finished space.',
  },
]

const whyUsCards = [
  { title: '10-Year Relationships', desc: 'We build lasting partnerships with clients who return for every new project.' },
  { title: 'End-to-End Project Management', desc: 'From concept to handover — we manage every vendor, timeline, and detail.' },
  { title: '100% Client Satisfaction', desc: 'Every project is complete only when you are fully happy with the result.' },
]

export default function ServicesPage() {
  const [open, setOpen] = useState(0)
  const { specialty, cal } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1A1A1A', minHeight: '340px', paddingTop: '65px' }}
      >
        <div className="w-12 h-px bg-gray-600 mb-8" />
        <h1 className="font-playfair font-bold text-5xl text-white leading-tight">Our Services</h1>
        <p className="font-inter font-light text-gray-400 mt-4 text-base max-w-lg">{specialty}</p>
      </div>

      {/* Services accordion (inlined from Services.tsx) */}
      <section id="services" className="py-20 bg-[#F8F8F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Service list */}
            <div>
              <p className="font-inter uppercase text-xs tracking-widest text-gray-400">Services</p>
              <h2 className="font-playfair font-bold text-4xl text-gray-900 mt-3 mb-8 leading-tight">
                What We Provide For You
              </h2>

              <div className="divide-y divide-gray-200">
                {services.map((svc, i) => (
                  <div key={i} className="cursor-pointer" onClick={() => setOpen(i)}>
                    <div className="flex items-center justify-between py-4 group">
                      <div className="flex items-center gap-4">
                        <span className="font-inter text-sm text-gray-300">{svc.num}</span>
                        <span className={`font-inter text-base transition-colors ${open === i ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {svc.name}
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                    {open === i && (
                      <p className="font-inter text-sm text-gray-500 pb-4 leading-relaxed pl-10">
                        {svc.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping images */}
            <div className="relative">
              <div className="flex justify-end">
                <img
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&auto=format&fit=crop"
                  alt="Dark tile bathroom"
                  className="object-cover"
                  style={{ width: '80%', aspectRatio: '4/5' }}
                />
              </div>
              <div className="relative z-10" style={{ marginTop: '-5rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop"
                  alt="Modern interior"
                  className="object-cover border-4 border-[#F8F8F6]"
                  style={{ width: '60%', aspectRatio: '1/1' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Strip (NEW) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-inter uppercase text-xs tracking-widest text-gray-400 mb-2">Why Choose Us</p>
          <h2 className="font-playfair font-bold text-4xl text-gray-900 mb-12 leading-tight">Built on Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsCards.map((card, i) => (
              <div key={i} className="border border-gray-100 p-8">
                <div className="font-playfair font-bold text-5xl text-gray-100 mb-4">0{i + 1}</div>
                <h3 className="font-inter font-semibold text-base text-gray-900 mb-2">{card.title}</h3>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16" style={{ background: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-playfair font-bold text-3xl text-white">Start your project today</h2>
          <a href={cal} target="_blank" rel="noreferrer"
            className="inline-block bg-white text-gray-900 font-inter text-sm py-3 px-8 hover:bg-gray-100 transition-colors whitespace-nowrap">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
