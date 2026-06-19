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
    firmName:    g('firm',    'FourthWall Studio'),
    founderName: g('founder', 'Arjun Mehta'),
    city:        g('city',    'Mumbai'),
    phone:       g('phone',   '+91 98765 43210'),
    email:       g('email',   'hello@fourthwall.in'),
    tagline:     g('tag',     'We design spaces that feel intentional, lived-in, and timeless'),
    projects:    g('proj',    '120+'),
    clients:     g('clients', '90+'),
    years:       g('years',   '6+'),
    specialty:   g('spec',    'Architecture & Interior Design'),
    revenue:     g('rev',     '₹4.2Cr'),
    cal:         g('cal',     'https://cal.com/aiotic/discovery'),
  }
}
