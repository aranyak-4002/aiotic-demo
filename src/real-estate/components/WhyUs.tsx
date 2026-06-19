import { CheckCircle, Users, Award, Clock } from 'lucide-react'
import { useDemoParams } from '../useParams'

const features = [
  { icon: CheckCircle, title: 'Verified Listings Only', body: 'Every property is site-verified and legally vetted before it reaches you. No surprises, no fraud.' },
  { icon: Users, title: 'Dedicated Agent', body: 'You get a single point of contact throughout — one agent who knows your requirements inside out.' },
  { icon: Award, title: 'Top Developer Network', body: 'Direct relationships with leading developers means better prices and early access to new launches.' },
  { icon: Clock, title: 'Fast Closures', body: 'Our legal and documentation team cuts average closing time by 40% versus the industry standard.' },
]

export default function WhyUs() {
  const { agencyName } = useDemoParams()

  return (
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
  )
}
