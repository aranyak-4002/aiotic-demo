import { useState } from 'react'
import { useDemoParams } from '../useParams'

const testimonials = [
  { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&facepad=3', name: 'Priya Mehta', city: 'Pune', quote: 'Found our dream home in just 3 weeks. The team understood exactly what we wanted and never wasted our time with irrelevant listings.' },
  { avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&facepad=3', name: 'Arjun Kapoor', city: 'Mumbai', quote: 'The investment returns have been exactly as promised. Transparent process from start to finish. Already referred 4 friends.' },
  { avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&facepad=3', name: 'Divya Sharma', city: 'Bangalore', quote: 'As first-time buyers we were nervous, but the team held our hand through every step. Exceptional service and results.' },
]

export default function Testimonials() {
  const { agencyName } = useDemoParams()
  const [current, setCurrent] = useState(0)

  return (
    <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Client Reviews
        </p>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '2.5rem' }}>
          What Our Clients Say
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '2rem', border: '1px solid #EBEBEB' }}>
              <div style={{ color: '#1C3C28', fontSize: '1rem', letterSpacing: '2px', marginBottom: '1.25rem' }}>★★★★★</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.88rem', color: '#444', lineHeight: 1.75, marginBottom: '1.5rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #F0F0F0', paddingTop: '1.25rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#0A0A0A' }}>{t.name}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.75rem', color: '#999', marginTop: '1px' }}>{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '2rem' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? '24px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none', cursor: 'pointer',
              background: i === current ? '#1C3C28' : '#CCC',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
