import { ArrowUpRight } from 'lucide-react'

const projects = [
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-inter uppercase text-xs tracking-widest text-gray-400">Portfolio</p>
            <h2 className="font-playfair font-bold text-4xl text-gray-900 mt-2 leading-tight">
              View Our Design Projects
            </h2>
          </div>
          <button className="hidden md:inline-block border border-gray-900 text-gray-900 font-inter text-sm py-2 px-5 hover:bg-gray-900 hover:text-white transition-colors">
            View More
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
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

        <div className="mt-8 md:hidden">
          <button className="w-full border border-gray-900 text-gray-900 font-inter text-sm py-3 hover:bg-gray-900 hover:text-white transition-colors">
            View More
          </button>
        </div>
      </div>
    </section>
  )
}
