export function useDemoParams() {
  const p = new URLSearchParams(window.location.search)
  return {
    agencyName: p.get('agency')  || 'Horizon Estate',
    agentName:  p.get('agent')   || 'Rahul Sharma',
    city:       p.get('city')    || 'Pune',
    phone:      p.get('phone')   || '+91 98765 43210',
    email:      p.get('email')   || 'hello@horizonestate.in',
    tagline:    p.get('tag')     || 'Find a place you will call home',
    properties: p.get('props')   || '500+',
    years:      p.get('years')   || '8',
    clients:    p.get('clients') || '1,200+',
    locations:  p.get('locs')    || '12',
    avgPrice:   p.get('avg')     || '₹82L',
    returns:    p.get('ret')     || '14%',
    growth:     p.get('growth')  || '19%',
    specialty:  p.get('spec')    || 'Residential & Commercial',
  }
}
