import { useDemoParams } from '../useParams'

const values = [
  { title: 'Transparency', desc: 'No hidden fees, no vague timelines. You know exactly what is happening at every stage of your property journey.' },
  { title: 'Client-First', desc: 'Your goals are our goals. We never push a property that doesn\'t genuinely serve your interests.' },
  { title: 'Market Expertise', desc: 'Years of on-the-ground experience means we know which areas are growing, which projects deliver, and which to avoid.' },
]

export default function AboutPage() {
  const { agencyName, agentName, city, years, clients, properties, locations } = useDemoParams()

  const stats = [
    { value: `${years}+`, label: 'Years of Experience' },
    { value: clients, label: 'Happy Clients' },
    { value: properties, label: 'Properties Sold' },
    { value: locations, label: 'Locations Covered' },
  ]

  return (
    <>
      {/* Page Hero */}
      <div style={{ background: '#fff', paddingTop: '120px', paddingBottom: '3rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: '#1C3C28', marginBottom: '1.25rem' }} />
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            About {agencyName}
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#666' }}>
            {years} years of trust in {city}
          </p>
        </div>
      </div>

      {/* Mission section (NEW) */}
      <section style={{ background: '#fff', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left: Mission text */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Our Mission
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Empowering Every Property Decision
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.92rem', color: '#555', lineHeight: 1.85, marginBottom: '1rem' }}>
              At {agencyName}, we believe finding the right property should be a confident, well-informed decision — not a stressful guessing game. Since our founding, we have worked with families, investors, and businesses across {city} to match them with properties that truly fit their lives.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.92rem', color: '#555', lineHeight: 1.85 }}>
              Our approach is simple: listen first, then act. We take the time to understand what you really need — not just the number of bedrooms, but the life you want to build in your new space.
            </p>
          </div>

          {/* Right: 2×2 stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ border: '1px solid #EBEBEB', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#1C3C28', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership (inlined from Leadership.tsx) */}
      <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '480px' }}>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&auto=format&fit=crop&facepad=4"
              alt={agentName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

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

      {/* Values section (NEW) */}
      <section style={{ background: '#F8F8F6', padding: '5rem 2.5rem', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#1C3C28', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Our Values
          </p>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '3rem' }}>
            What We Stand For
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem 2rem', border: '1px solid #EBEBEB' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#EBEBEB', marginBottom: '1rem' }}>0{i + 1}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0A0A0A', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#666', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
