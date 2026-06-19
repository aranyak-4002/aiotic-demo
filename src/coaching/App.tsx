import { useDemoParams } from '../shared/useParams'

const C = {
  dark: '#0a0f1e',
  mid: '#111827',
  accent: '#f97316',
  accentSoft: '#fff7ed',
  text: '#e5e7eb',
  muted: '#9ca3af',
  white: '#ffffff',
  border: '#1f2937',
}

const s = {
  page: { background: C.dark, color: C.text, minHeight: '100vh', fontFamily: "'Sora', sans-serif" } as React.CSSProperties,
  nav: {
    background: C.mid, borderBottom: `1px solid ${C.border}`,
    padding: '0 32px', height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky' as const, top: 0, zIndex: 100,
  },
  navLogo: { fontSize: '18px', fontWeight: 700, color: C.white },
  navBtn: {
    background: C.accent, color: C.white, border: 'none', cursor: 'pointer',
    fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 600,
    padding: '10px 20px', borderRadius: '8px',
  },
  hero: {
    background: `linear-gradient(135deg, ${C.mid} 0%, #0f172a 100%)`,
    padding: '80px 32px 72px', textAlign: 'center' as const,
    borderBottom: `1px solid ${C.border}`,
  },
  badge: {
    display: 'inline-block', background: C.accent, color: C.white,
    fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const,
    padding: '5px 14px', borderRadius: '99px', marginBottom: '24px',
  },
  h1: { fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: C.white, lineHeight: 1.15, marginBottom: '16px' },
  heroSub: { fontSize: '16px', color: C.muted, marginBottom: '36px', lineHeight: 1.6 },
  heroBtns: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const },
  btnPrimary: {
    display: 'inline-block', background: C.accent, color: C.white, textDecoration: 'none',
    fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: '10px',
  },
  btnGhost: {
    display: 'inline-block', border: `1px solid ${C.border}`, color: C.text, textDecoration: 'none',
    fontWeight: 600, fontSize: '15px', padding: '14px 32px', borderRadius: '10px',
  },
  section: { maxWidth: '1080px', margin: '0 auto', padding: '72px 32px' },
  sectionLabel: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const,
    color: C.accent, marginBottom: '12px',
  },
  h2: { fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: C.white, marginBottom: '12px' },
  sectionSub: { fontSize: '15px', color: C.muted, marginBottom: '48px', lineHeight: 1.6 },
  courseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' },
  courseCard: {
    background: C.mid, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '28px',
  },
  courseTag: {
    display: 'inline-block', background: '#1c1a10', color: C.accent,
    fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const,
    padding: '4px 10px', borderRadius: '6px', marginBottom: '14px',
  },
  courseTitle: { fontSize: '17px', fontWeight: 700, color: C.white, marginBottom: '8px' },
  courseBody: { fontSize: '13px', color: C.muted, lineHeight: 1.6, marginBottom: '16px' },
  courseMeta: { display: 'flex', gap: '16px', fontSize: '12px', color: C.muted },
  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px', margin: '48px 0',
  },
  statCard: {
    background: C.mid, border: `1px solid ${C.border}`, borderRadius: '12px',
    padding: '24px', textAlign: 'center' as const,
  },
  statNum: { fontSize: '32px', fontWeight: 800, color: C.accent, marginBottom: '6px' },
  statLabel: { fontSize: '13px', color: C.muted },
  contactCard: {
    background: C.mid, border: `1px solid ${C.border}`, borderRadius: '16px',
    padding: '48px 40px', textAlign: 'center' as const,
  },
  contactDetail: { fontSize: '14px', color: C.muted, margin: '6px 0' },
  divider: { borderTop: `1px solid ${C.border}`, margin: '0' },
  banner: {
    position: 'fixed' as const, bottom: 0, left: 0, right: 0, zIndex: 99999,
    background: '#011f23', color: '#e2f1f3',
    fontFamily: "'Sora', sans-serif", fontSize: '13px',
    padding: '12px 20px', textAlign: 'center' as const,
    borderTop: '2px solid #1c91a1',
  },
  bannerLink: { color: '#1c91a1', textDecoration: 'none' },
}

const COURSES = [
  { tag: 'Science', title: 'JEE Main & Advanced', desc: 'Comprehensive preparation for IIT-JEE with daily tests, doubt sessions, and mock series.', seats: '40 seats', duration: '2 years' },
  { tag: 'Medical', title: 'NEET UG Preparation', desc: 'Biology, Physics, and Chemistry mastery for NEET aspirants with NCERT-focused approach.', seats: '40 seats', duration: '2 years' },
  { tag: 'Foundation', title: 'Class 8–10 Foundation', desc: 'Early start for competitive exams — Olympiad, NTSE, and board excellence programs.', seats: '30 seats', duration: '1 year' },
  { tag: 'Crash', title: 'Crash Course (Droppers)', title2: '', desc: 'Intensive 6-month revision program for JEE/NEET repeaters targeting top ranks.', seats: '25 seats', duration: '6 months' },
]

export function App() {
  const p = useDemoParams({
    name: 'Apex Coaching Institute',
    owner: 'Rajesh Kumar',
    city: 'Siliguri',
    phone: '+91 98765 43210',
    email: 'hello@apexcoaching.com',
    cal: 'https://cal.com/aiotic/discovery',
  })

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navLogo}>{p.name}</span>
        <a href={p.cal} target="_blank" rel="noreferrer" style={{ ...s.navBtn, textDecoration: 'none', display: 'inline-block' }}>
          Book Free Counselling
        </a>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.badge}>Now Enrolling — Batch 2025–26</div>
        <h1 style={s.h1}>
          Top Ranks Start at<br />{p.name}
        </h1>
        <p style={s.heroSub}>
          Expert faculty · Proven results · {p.city}'s most trusted coaching centre
        </p>
        <div style={s.heroBtns}>
          <a href={p.cal} target="_blank" rel="noreferrer" style={s.btnPrimary}>
            Book Free Counselling →
          </a>
          <a href={`tel:${p.phone.replace(/\D/g, '')}`} style={s.btnGhost}>
            Call {p.phone}
          </a>
        </div>
      </section>

      <hr style={s.divider} />

      {/* Stats */}
      <div style={{ ...s.section, paddingBottom: 0 }}>
        <div style={s.statGrid}>
          {[
            { num: '500+', label: 'Students Enrolled' },
            { num: '92%', label: 'Selection Rate' },
            { num: '12+', label: 'Years of Excellence' },
            { num: '150+', label: 'Top 1000 AIR Ranks' },
          ].map(({ num, label }) => (
            <div key={label} style={s.statCard}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <section style={s.section}>
        <div style={s.sectionLabel}>Programmes</div>
        <h2 style={s.h2}>Courses We Offer</h2>
        <p style={s.sectionSub}>
          Every batch is capped at 40 students. Small groups mean more attention, faster doubt resolution.
        </p>
        <div style={s.courseGrid}>
          {COURSES.map((c) => (
            <div key={c.title} style={s.courseCard}>
              <div style={s.courseTag}>{c.tag}</div>
              <div style={s.courseTitle}>{c.title}</div>
              <p style={s.courseBody}>{c.desc}</p>
              <div style={s.courseMeta}>
                <span>🎓 {c.seats}</span>
                <span>📅 {c.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={s.divider} />

      {/* Contact */}
      <section style={s.section}>
        <div style={s.sectionLabel}>Enquiry</div>
        <h2 style={s.h2}>Visit or Call Us</h2>
        <div style={s.contactCard}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: C.white, marginBottom: '20px' }}>
            {p.name}, {p.city}
          </h3>
          <p style={s.contactDetail}>📞 {p.phone}</p>
          <p style={s.contactDetail}>✉️ {p.email}</p>
          <a
            href={p.cal}
            target="_blank"
            rel="noreferrer"
            style={{ ...s.btnPrimary, display: 'inline-block', marginTop: '28px', textDecoration: 'none' }}
          >
            Book Free Counselling Session →
          </a>
        </div>
      </section>

      {/* Aiotic Demo Banner */}
      <div style={{ ...s.page, paddingBottom: '52px', background: 'transparent', minHeight: 0 }} />
      <div style={s.banner}>
        🤖 Personalized demo by{' '}
        <strong>
          <a href="https://getaiotic.com" target="_blank" rel="noreferrer" style={s.bannerLink}>
            Aiotic Technologies
          </a>
        </strong>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href={p.cal} target="_blank" rel="noreferrer" style={s.bannerLink}>
          Book a free call to get your own website →
        </a>
      </div>
    </div>
  )
}
