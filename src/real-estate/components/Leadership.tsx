import { useDemoParams } from '../useParams'

export default function Leadership() {
  const { agentName, agencyName, city, years } = useDemoParams()

  return (
    <section style={{ background: '#fff', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Image */}
        <div style={{ borderRadius: '8px', overflow: 'hidden', height: '480px' }}>
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&auto=format&fit=crop&facepad=4"
            alt={agentName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Text */}
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Leadership Message
          </p>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Building Dreams,<br />Creating Homes
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.92rem', color: '#555', lineHeight: 1.85, marginBottom: '1rem' }}>
            "Real estate is not just about properties — it's about people and the lives they build. Over the past {years} years, I've had the privilege of guiding hundreds of families and investors through one of the most important decisions of their lives."
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.92rem', color: '#555', lineHeight: 1.85, marginBottom: '2rem' }}>
            "At {agencyName}, we hold ourselves to an uncompromising standard of transparency, expertise and client-first thinking. Our goal is simple: help you find the right property, confidently."
          </p>
          <div style={{ borderTop: '1px solid #EBEBEB', paddingTop: '1.5rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#0A0A0A' }}>{agentName}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.8rem', color: '#999', marginTop: '2px' }}>Founder & Principal Consultant, {agencyName}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
