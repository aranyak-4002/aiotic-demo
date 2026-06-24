import { useDemoParams } from '../useParams'

const defaultTestimonials = [
  { title: 'Seamless From Start to Finish', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&auto=format&fit=crop', type: 'Residential', quote: 'The team delivered beyond our expectations. Every detail was considered and the execution was flawless.', client: 'Rajesh Kapoor', location: 'Mumbai' },
  { title: 'Design That Truly Reflects Us', img: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&auto=format&fit=crop', type: 'Commercial', quote: 'They understood our vision immediately and translated it into a space we are truly proud of.', client: 'Priya Sharma', location: 'Delhi' },
  { title: 'Balanced, Functional, and Elegant', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop', type: 'Workspace', quote: 'A perfect balance of aesthetics and functionality. Our workspace has never felt more inspiring.', client: 'Vikram Nair', location: 'Bangalore' },
  { title: 'Thoughtful Details and Execution', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop', type: 'Residential', quote: 'The attention to detail is what sets them apart. Every corner of our home tells a story.', client: 'Meera Joshi', location: 'Pune' },
  { title: 'Exceeded Every Expectation', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop', type: 'Turnkey', quote: 'From concept to completion, the process was smooth and the result was extraordinary.', client: 'Anand Krishnan', location: 'Chennai' },
  { title: 'A Space That Feels Like Us', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop', type: 'Residential', quote: 'They captured exactly what we wanted — warm, modern, and completely timeless.', client: 'Sunita Agarwal', location: 'Hyderabad' },
]

export default function Testimonials() {
  const { testimonials: dynamicTestimonials } = useDemoParams()

  const testimonials = dynamicTestimonials?.length > 0
    ? dynamicTestimonials.slice(0, 6).map((t: any, i: number) => ({
        title: t.quote.split('.')[0].slice(0, 40) + '...',
        img: t.photo || defaultTestimonials[i%6].img,
        type: 'Interior Design',
        quote: t.quote,
        client: t.name,
        location: t.role || 'India'
      }))
    : defaultTestimonials

  return (
    <section className="py-24" style={{ background: '#1C3A35' }}>
      <div className="max-w-7xl mx-auto px-8">
        <p className="font-inter text-xs uppercase mb-3" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>Client Stories</p>
        <h2 className="font-cormorant font-semibold text-4xl text-white leading-tight mb-14">
          What Clients Say<br />About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="relative">
                <img src={t.img} alt={t.title}
                  className="w-full object-cover opacity-80" style={{ aspectRatio: '16/9' }} />
                <span className="absolute top-3 left-3 font-inter text-xs px-2 py-1" style={{ background: 'rgba(28,58,53,0.85)', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>
                  {t.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-cormorant font-semibold text-lg text-white">{t.title}</h3>
                <p className="font-inter font-light text-sm leading-6 mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>"{t.quote}"</p>
                <div className="mt-4 text-sm tracking-wider" style={{ color: '#C9A96E' }}>★★★★★</div>
                <p className="font-inter font-medium text-sm text-white mt-2">{t.client}</p>
                <p className="font-inter font-light text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
