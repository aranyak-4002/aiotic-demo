import { useDemoParams } from '../useParams'

const images = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop', alt: 'Minimal white room', tall: true },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop', alt: 'Modern bathroom', tall: false },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop', alt: 'Kitchen interior', tall: false },
  { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop', alt: 'Bedroom', tall: true },
]

export default function About() {
  const { firmName, city, years, projects, cal } = useDemoParams()

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Images — top on mobile */}
          <div className="grid grid-cols-2 gap-3 order-first md:order-last">
            {images.map((img, i) => (
              <div key={i} className={`overflow-hidden ${img.tall ? 'row-span-1' : ''}`}
                style={{ aspectRatio: img.tall ? '3/4' : '1/1' }}>
                <img src={img.src} alt={img.alt}
                  className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div>
            <p className="font-inter uppercase text-xs tracking-widest text-gray-400">About Us</p>
            <h2 className="font-playfair font-bold text-4xl text-gray-900 mt-3 leading-tight">
              Discover The Power Of Design
            </h2>
            <p className="font-inter text-gray-500 leading-relaxed mt-6">
              We believe in the power of design for creating a beautiful and functional environment.{' '}
              <strong className="text-gray-700">{firmName}</strong> brings {years} years of experience
              transforming spaces across {city} and beyond.
            </p>

            {/* Stats */}
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
      </div>
    </section>
  )
}
