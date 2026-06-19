import { useDemoParams } from '../useParams'

export default function Signature() {
  const { firmName, revenue } = useDemoParams()

  const cards = [
    { amount: revenue,  label: 'Total Project Value' },
    { amount: '₹3.1Cr', label: 'Commercial' },
    { amount: '₹2.5Cr', label: 'Residential' },
    { amount: '₹1.8Cr', label: 'Hospitality' },
  ]

  return (
    <section className="px-6 md:px-10 py-6" style={{ background: '#152E29' }}>
      {/* Framed image — margins match page padding */}
      <div className="relative overflow-hidden w-full" style={{ height: '70vh' }}>
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop"
          alt="Signature project"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(28,58,53,0.55)' }} />

        {/* Bottom-left text */}
        <div className="absolute bottom-10 left-10 max-w-lg">
          <p className="font-inter text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>Signature Project</p>
          <h2 className="font-cormorant font-light italic text-5xl text-white mt-3 leading-tight">
            Unveiling the Signature<br />Designs of {firmName}
          </h2>
          <p className="font-inter font-light text-xs uppercase mt-3" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
            Across India
          </p>
        </div>

        {/* Revenue cards — right side, cascading */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {cards.map((c, i) => (
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
  )
}
