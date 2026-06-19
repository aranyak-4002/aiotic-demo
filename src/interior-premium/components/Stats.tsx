import { useDemoParams } from '../useParams'

export default function Stats() {
  const { projects, clients, years } = useDemoParams()

  const stats = [
    { value: projects, label: 'Projects Completed' },
    { value: clients,  label: 'Happy Clients' },
    { value: years,    label: 'Years Experience' },
    { value: '100%',   label: 'Satisfaction Rate' },
  ]

  return (
    <section className="pb-24" style={{ background: '#1C3A35' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {stats.map((s, i) => (
            <div key={i} className="py-10 px-6 text-center"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <div className="font-cormorant font-bold text-5xl leading-none" style={{ color: '#C9A96E' }}>{s.value}</div>
              <div className="font-inter font-light text-xs uppercase mt-3" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
