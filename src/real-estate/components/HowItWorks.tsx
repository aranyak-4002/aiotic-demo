import { useDemoParams } from '../useParams'

const networks = [
  'Lodha Group', 'Godrej Properties', 'Prestige Estates', 'Brigade Group', 'Sobha Realty', 'DLF Limited',
]

export default function HowItWorks() {
  const { agencyName } = useDemoParams()

  return (
    <>
      {/* Our Network — infinite marquee */}
      <section style={{ background: '#F8F8F6', borderBottom: '1px solid #EBEBEB', padding: '2rem 0', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#999', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.5rem' }}>
          Our Network — Trusted Industry Relationships
        </p>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 18s linear infinite;
          }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...networks, ...networks].map((n, i) => (
              <span key={i} style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '1.1rem', color: '#0A0A0A',
                letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                padding: '0 3rem',
              }}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
