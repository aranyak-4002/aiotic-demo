import { motion } from 'framer-motion'
import { useDemoParams } from '../useParams'

export default function Hero() {
  const { firmName, specialty } = useDemoParams()

  return (
    <section id="home" className="relative overflow-hidden" style={{ height: '100vh' }}>
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop"
        alt="Premium interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,58,53,0.3) 0%, rgba(28,58,53,0.15) 50%, rgba(28,58,53,0.75) 100%)' }} />

      {/* Center firm name */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-inter font-light text-xs uppercase text-white mb-6"
          style={{ letterSpacing: '0.3em' }}>
          {specialty}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-cormorant font-light italic text-white leading-none"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', letterSpacing: '0.03em' }}>
          {firmName}
        </motion.h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.3)' }} />
        <span className="font-inter text-[9px] uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
      </div>
    </section>
  )
}
