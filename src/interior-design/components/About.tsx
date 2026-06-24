import { useDemoParams } from '../useParams'

const defaultImages = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop', alt: 'Minimal white room' },
  { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop', alt: 'Bedroom interior' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop', alt: 'Kitchen interior' },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop', alt: 'Modern bathroom' },
]

export default function About() {
  const { firmName, city, years, projects, cal, gallery } = useDemoParams()

  const images = gallery?.length >= 4
    ? gallery.slice(0, 4).map((g: any) => ({ src: g.url || g.before, alt: g.caption || 'Interior Photo' }))
    : defaultImages


  return (
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

        {/* 4 tall images — alternating vertical offset (1&3 high, 2&4 down) */}
        <div className="grid grid-cols-4 gap-3 items-start pb-16">
          {images.map((img, i) => (
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
  )
}
