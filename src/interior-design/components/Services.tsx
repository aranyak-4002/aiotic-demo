import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

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

export default function Services() {
  const [open, setOpen] = useState(0)

  return (
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
                <div key={i}
                  className="cursor-pointer"
                  onClick={() => setOpen(i)}>
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
  )
}
