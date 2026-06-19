const filters = [
  { label: 'Location', options: ['Location', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'] },
  { label: 'Type', options: ['Type', 'Apartment', 'Villa', 'Plot', 'Commercial'] },
  { label: 'Price Range', options: ['Price Range', 'Under ₹40L', '₹40L–₹1Cr', '₹1Cr–₹3Cr', 'Above ₹3Cr'] },
]

export default function Search() {
  return (
    <section style={{ background: '#F0EBE5', padding: '1.5rem 3rem 2.5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Single pill container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          borderRadius: '999px',
          padding: '0.5rem 0.5rem 0.5rem 1.75rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          gap: '0',
        }}>
          {filters.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <select style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '0.88rem',
                color: '#1A1A1A',
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                outline: 'none',
                width: '100%',
                appearance: 'none' as const,
                WebkitAppearance: 'none' as const,
              }}>
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
              {i < filters.length - 1 && (
                <div style={{ width: '1px', height: '24px', background: '#E0D9D1', flexShrink: 0 }} />
              )}
            </div>
          ))}

          <button style={{
            fontFamily: '"DM Sans"', fontWeight: 600, fontSize: '0.88rem',
            color: '#fff', background: '#5DB386',
            padding: '0.7rem 1.75rem', borderRadius: '999px',
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            flexShrink: 0, marginLeft: '0.75rem',
          }}>
            Search
          </button>
        </div>
      </div>
    </section>
  )
}
