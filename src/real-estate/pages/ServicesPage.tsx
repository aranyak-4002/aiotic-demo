import { CheckCircle, Users, Award, Clock, Search, FileText, Scale, TrendingUp, BarChart2, Globe } from 'lucide-react'
import { useDemoParams } from '../useParams'

const networks = [
  'Lodha Group', 'Godrej Properties', 'Prestige Estates', 'Brigade Group', 'Sobha Realty', 'DLF Limited',
]

const features = [
  { icon: CheckCircle, title: 'Verified Listings Only', body: 'Every property is site-verified and legally vetted before it reaches you. No surprises, no fraud.' },
  { icon: Users, title: 'Dedicated Agent', body: 'You get a single point of contact throughout — one agent who knows your requirements inside out.' },
  { icon: Award, title: 'Top Developer Network', body: 'Direct relationships with leading developers means better prices and early access to new launches.' },
  { icon: Clock, title: 'Fast Closures', body: 'Our legal and documentation team cuts average closing time by 40% versus the industry standard.' },
]

const serviceCards = [
  { icon: Search, title: 'Property Search & Shortlisting', desc: 'We curate a personalised list of verified properties matching your exact criteria.' },
  { icon: FileText, title: 'Home Loan Assistance', desc: 'We connect you with top lenders and help you secure the best possible financing terms.' },
  { icon: Scale, title: 'Legal Documentation', desc: 'Title checks, agreement drafting, registration — handled by our in-house legal team.' },
  { icon: TrendingUp, title: 'Investment Advisory', desc: 'Data-driven recommendations to maximise capital growth and rental yields over time.' },
  { icon: BarChart2, title: 'Property Valuation', desc: 'Accurate market valuations backed by real transaction data and local expertise.' },
  { icon: Globe, title: 'NRI Services', desc: 'Seamless property buying, management and repatriation services for NRI investors.' },
]

export default function ServicesPage() {
  const { specialty, agencyName, phone } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div style={{ background: '#fff', paddingTop: '120px', paddingBottom: '3rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: '#1C3C28', marginBottom: '1.25rem' }} />
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Our Services
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#666' }}>
            {specialty}
          </p>
        </div>
      </div>

      {/* HowItWorks / Network (inlined from HowItWorks.tsx) */}
      <section style={{ background: '#F8F8F6', borderBottom: '1px solid #EBEBEB', padding: '2rem 0', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#999', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.5rem' }}>
          Our Network — Trusted Industry Relationships
        </p>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-track { display: flex; width: max-content; animation: marquee 18s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...networks, ...networks].map((n, i) => (
              <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0A0A0A', letterSpacing: '-0.01em', whiteSpace: 'nowrap', padding: '0 3rem' }}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards (NEW, 3-col grid) */}
      <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            What We Offer
          </p>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '3rem' }}>
            Complete Real Estate Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {serviceCards.map((card, i) => {
              const Icon = card.icon
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '2rem 1.5rem', border: '1px solid #EBEBEB' }}>
                  <div style={{ width: '44px', height: '44px', background: '#EEF4F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={20} color="#1C3C28" />
                  </div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#0A0A0A', marginBottom: '0.5rem' }}>{card.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: '#777', lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WhyUs (inlined from WhyUs.tsx) */}
      <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Why Work With Us
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', gap: '2rem' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '480px' }}>
              Why Work With {agencyName}
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.9rem', color: '#666', lineHeight: 1.75, maxWidth: '380px' }}>
              We combine local expertise with rigorous processes to make your real estate journey smooth, transparent and rewarding.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '2rem 1.5rem', border: '1px solid #EBEBEB' }}>
                  <div style={{ width: '44px', height: '44px', background: '#EEF4F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={20} color="#1C3C28" />
                  </div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#0A0A0A', marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: '#777', lineHeight: 1.7 }}>{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Row */}
      <section style={{ background: '#1C3C28', padding: '4rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Ready to find your property?
          </h2>
          <a href={`tel:${phone}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#1C3C28', background: '#fff', padding: '0.85rem 2rem', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Schedule a Free Consultation
          </a>
        </div>
      </section>
    </>
  )
}
