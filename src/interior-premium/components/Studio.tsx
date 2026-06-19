import { useDemoParams } from '../useParams'

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&facepad=2',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&facepad=2',
]

export default function Studio() {
  const { firmName, clients, city } = useDemoParams()

  return (
    <section className="px-6 md:px-10 py-6" style={{ background: '#1C3A35' }}>
      {/* Framed image — margins on all sides matching page padding */}
      <div className="relative overflow-hidden w-full" style={{ height: '70vh' }}>
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop"
          alt="Studio interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(28,58,53,0.55)' }} />

        {/* Centered content — firm name, clients, rating */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="font-inter font-light text-xs uppercase text-white mb-4" style={{ letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
            Featured Studio
          </p>
          <p className="font-cormorant font-semibold text-3xl text-white italic mb-3">{firmName} Studio</p>
          <p className="font-inter font-light text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Trusted by {clients} clients across {city}
          </p>

          {/* Client avatars */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="client"
                  className="w-8 h-8 rounded-full object-cover"
                  style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
              ))}
            </div>
            <span className="font-inter font-light text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{clients}+ Happy Clients</span>
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm tracking-widest" style={{ color: '#C9A96E' }}>★★★★★</span>
            <span className="font-inter font-light text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>5.0 Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
