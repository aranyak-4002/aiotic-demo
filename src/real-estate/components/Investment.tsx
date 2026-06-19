const listings = [
  {
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=120&auto=format&fit=crop',
    name: 'Azure Villa',
    type: 'Investment Property · Premium Grade',
    price: '₹5.8L',
    returns: '10% returns',
    monthly: '₹11,275 / mo',
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&auto=format&fit=crop',
    name: 'Serenity Harbor',
    type: 'Waterfront Property',
    price: '₹7.9L',
    returns: '12% returns',
    monthly: '₹14,200 / mo',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&auto=format&fit=crop',
    name: 'Peak View Residences',
    type: 'Hill Station · Luxury',
    price: '₹4.2L',
    returns: '9% returns',
    monthly: '₹8,900 / mo',
  },
]

export default function Investment() {
  return (
    <section className="bg-white py-16 px-8" style={{ borderTop: '1px solid #E8E8E5' }}>
      <div className="max-w-7xl mx-auto">
        <h3 className="font-sans font-semibold text-base text-[#0D0D0D] mb-1">Offers for investment</h3>
        <p className="font-sans font-light text-sm text-gray-400 mb-8">Handpicked properties with verified return projections</p>

        <div>
          {listings.map((l, i) => (
            <div key={i} className="flex items-center gap-5 py-5" style={{ borderBottom: '1px solid #E8E8E5' }}>
              <img src={l.img} alt={l.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-sm text-[#0D0D0D]">{l.name}</p>
                <p className="font-sans font-light text-xs text-gray-400 mt-0.5">{l.type}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-sans font-bold text-base text-[#0D0D0D]">{l.price}</p>
                <p className="font-sans text-sm text-green-700 mt-0.5">{l.returns}</p>
                <p className="font-sans font-semibold text-xs text-gray-500 mt-0.5">{l.monthly}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2 ml-4">
                <button className="font-sans font-medium text-xs text-white px-4 py-1.5 rounded bg-[#0D0D0D] hover:bg-black transition-colors">
                  Book now
                </button>
                <button className="font-sans text-xs text-gray-400 hover:text-black transition-colors">
                  Download brochure ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
