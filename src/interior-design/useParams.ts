const STORE_KEY = 'aiotic_demo_params'

export function useDemoParams() {
  const url = new URLSearchParams(window.location.search)

  if (url.toString()) {
    sessionStorage.setItem(STORE_KEY, url.toString())
  } else {
    const stored = sessionStorage.getItem(STORE_KEY)
    if (stored) new URLSearchParams(stored).forEach((v, k) => url.set(k, v))
  }

  const g = (key: string, fallback: string) => url.get(key) || fallback

  return {
    firmName:    g('firm',    'Interio Design Studio'),
    founderName: g('founder', 'Priya Sharma'),
    city:        g('city',    'Mumbai'),
    phone:       g('phone',   '+91 98765 43210'),
    email:       g('email',   'hello@interiodesign.com'),
    tagline:     g('tag',     'We help you unlock the beauty and comfort of your space — interiors that inspire and enrich your life'),
    years:       g('years',   '8'),
    projects:    g('proj',    '120+'),
    specialty:   g('spec',    'Residential & Commercial Interiors'),
    cal:         g('cal',     'https://cal.com/aiotic/discovery'),
  }
}
