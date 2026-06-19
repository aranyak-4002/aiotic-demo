const brands = [
  'Asian Paints',
  'Century Ply',
  'Godrej Interio',
  'Greenply',
  'Kajaria',
  'Sleepwell',
]

export default function Brands() {
  return (
    <section className="border-t border-b border-gray-100 py-8 bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-10 min-w-max mx-auto">
          {brands.map(b => (
            <span key={b}
              className="font-inter font-bold uppercase text-sm tracking-widest text-gray-300 whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
