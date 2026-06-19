import { useDemoParams } from '../useParams'

const services = [
  {
    num: '01.',
    title: 'Architecture Design',
    body: 'We craft architectural spaces that balance form and function — from concept to completion, every detail is considered and intentional.',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop',
    ],
  },
  {
    num: '02.',
    title: 'Interior Design',
    body: 'From furniture selection to lighting design — we create interiors that reflect your personality and elevate your everyday living experience.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop',
    ],
  },
  {
    num: '03.',
    title: 'Turnkey Design & Execution',
    body: 'End-to-end project management — we handle procurement, execution, and installation so you receive a completely finished space with zero stress.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&auto=format&fit=crop',
    ],
  },
]

export default function Services() {
  const { cal } = useDemoParams()

  return (
    <section id="services" className="py-24 px-6 md:px-10" style={{ background: '#1C3A35' }}>
      <div className="max-w-7xl mx-auto">
        <p className="font-inter text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>What We Offer</p>
        <h2 className="font-cormorant font-semibold text-4xl mt-3 text-white mb-14">
          Architecture & Interior Services
        </h2>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {services.map((svc) => (
            <div key={svc.num} className="py-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Row 1: Number + Title */}
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-cormorant font-light text-2xl" style={{ color: 'rgba(255,255,255,0.25)' }}>{svc.num}</span>
                <h3 className="font-cormorant font-semibold text-2xl text-white">{svc.title}</h3>
              </div>

              {/* Row 2: Description */}
              <p className="font-inter font-light text-sm leading-7 mb-8" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px' }}>
                {svc.body}
              </p>

              {/* Row 3: Two images side by side */}
              <div className="grid grid-cols-2 gap-4">
                {svc.images.map((src, j) => (
                  <div key={j} className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={src} alt={svc.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-85 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
