import { ArrowUpRight } from 'lucide-react'
import { useDemoParams } from '../useParams'

const originalProjects = [
  {
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
    title: 'Comfy Library',
    desc: 'A cozy and inviting space designed for reading, studying, and relaxation.',
  },
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
    title: 'Aias Workspace',
    desc: 'A productive environment with furniture and lighting that enhance focus and positivity.',
  },
  {
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
    title: 'Space Cafe',
    desc: 'Comfortable seating and soft lighting that create a cozy, inviting atmosphere.',
  },
  {
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop',
    title: 'Cozy Living Room',
    desc: 'A warm and inviting space that makes you feel relaxed and completely at home.',
  },
]

const additionalProjects = [
  {
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop',
    title: 'Contemporary Kitchen',
    desc: 'A sleek, functional kitchen designed around the joy of cooking and entertaining.',
  },
  {
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop',
    title: 'Spa Bathroom',
    desc: 'A serene bathroom retreat combining natural materials with modern fixtures.',
  },
  {
    img: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&auto=format&fit=crop',
    title: 'Minimalist Dining',
    desc: 'An elegant dining space where clean lines meet warm lighting for memorable meals.',
  },
  {
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop',
    title: 'Master Bedroom Suite',
    desc: 'A luxurious bedroom retreat designed for rest, privacy, and personal style.',
  },
]

const allProjects = [...originalProjects, ...additionalProjects]

export default function PortfolioPage() {
  const { projects, city, cal } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1A1A1A', minHeight: '340px', paddingTop: '65px' }}
      >
        <div className="w-12 h-px bg-gray-600 mb-8" />
        <h1 className="font-playfair font-bold text-5xl text-white leading-tight">Portfolio</h1>
        <p className="font-inter font-light text-gray-400 mt-4 text-base max-w-lg">
          {projects} projects completed across {city} and beyond
        </p>
      </div>

      {/* Portfolio Grid (inlined + extended) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-inter uppercase text-xs tracking-widest text-gray-400">Portfolio</p>
              <h2 className="font-playfair font-bold text-4xl text-gray-900 mt-2 leading-tight">
                View Our Design Projects
              </h2>
            </div>
          </div>

          {/* Grid — left col normal, right col offset down */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0 items-start pb-16">
            {allProjects.map((p, i) => (
              <div key={i} className={`group cursor-pointer ${i % 2 === 1 ? 'mt-12' : 'mt-0'} mb-8`}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-gray-900" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-inter font-semibold text-base text-gray-900">{p.title}</h3>
                  <p className="font-inter text-sm text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16" style={{ background: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-playfair font-bold text-3xl text-white">Have a project in mind? Let's talk.</h2>
          <a href={cal} target="_blank" rel="noreferrer"
            className="inline-block bg-white text-gray-900 font-inter text-sm py-3 px-8 hover:bg-gray-100 transition-colors whitespace-nowrap">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
