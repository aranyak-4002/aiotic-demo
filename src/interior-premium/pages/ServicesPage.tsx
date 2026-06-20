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

export default function ServicesPage() {
  const { firmName, revenue, cal } = useDemoParams()

  const signatureCards = [
    { amount: revenue, label: 'Total Project Value' },
    { amount: '₹3.1Cr', label: 'Commercial' },
    { amount: '₹2.5Cr', label: 'Residential' },
    { amount: '₹1.8Cr', label: 'Hospitality' },
  ]

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1C3A35', minHeight: '380px', paddingTop: '72px' }}
      >
        <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
          What We Offer
        </p>
        <h1 className="font-cormorant font-semibold italic text-5xl md:text-6xl text-white leading-tight">
          Our Services
        </h1>
        <div className="mt-5 w-16 h-px" style={{ background: '#C9A96E' }} />
      </div>

      {/* Services section (inlined from Services.tsx) */}
      <section id="services" className="py-24 px-6 md:px-10" style={{ background: '#1C3A35' }}>
        <div className="max-w-7xl mx-auto">
          <p className="font-inter text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>What We Offer</p>
          <h2 className="font-cormorant font-semibold text-4xl mt-3 text-white mb-14">
            Architecture & Interior Services
          </h2>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {services.map((svc) => (
              <div key={svc.num} className="py-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-cormorant font-light text-2xl" style={{ color: 'rgba(255,255,255,0.25)' }}>{svc.num}</span>
                  <h3 className="font-cormorant font-semibold text-2xl text-white">{svc.title}</h3>
                </div>

                <p className="font-inter font-light text-sm leading-7 mb-8" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px' }}>
                  {svc.body}
                </p>

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

      {/* Signature section (inlined from Signature.tsx) */}
      <section className="px-6 md:px-10 py-6" style={{ background: '#152E29' }}>
        <div className="relative overflow-hidden w-full" style={{ height: '70vh' }}>
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop"
            alt="Signature project"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(28,58,53,0.55)' }} />

          <div className="absolute bottom-10 left-10 max-w-lg">
            <p className="font-inter text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>Signature Project</p>
            <h2 className="font-cormorant font-light italic text-5xl text-white mt-3 leading-tight">
              Unveiling the Signature<br />Designs of {firmName}
            </h2>
            <p className="font-inter font-light text-xs uppercase mt-3" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
              Across India
            </p>
          </div>

          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {signatureCards.map((c, i) => (
              <div key={i} className="px-5 py-3 text-white"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  marginLeft: `${i * 12}px`,
                }}>
                <div className="font-cormorant font-bold text-xl" style={{ color: '#C9A96E' }}>{c.amount}</div>
                <div className="font-inter font-light text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA row */}
      <section className="py-16 px-6" style={{ background: '#1C3A35' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-cormorant font-semibold italic text-4xl text-white">
            Ready to begin your project?
          </h2>
          <a href={cal} target="_blank" rel="noreferrer"
            className="inline-block font-inter text-sm px-8 py-4 transition-colors"
            style={{ background: '#C9A96E', color: '#1C3A35', fontWeight: 600 }}>
            Begin Your Project
          </a>
        </div>
      </section>
    </>
  )
}
