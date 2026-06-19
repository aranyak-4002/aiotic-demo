import { useDemoParams } from '../useParams'

export default function CTA() {
  const { phone, cal } = useDemoParams()

  return (
    <section id="contact" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <h2 className="font-playfair font-bold text-gray-900 leading-snug"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
              Would you like to discuss your amazing project with us?
            </h2>
            <p className="font-inter text-gray-500 mt-4 leading-relaxed">
              Let's work together — we'll help you create your dream space with our best
              interior design expertise.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href={cal} target="_blank" rel="noreferrer"
                className="bg-gray-900 text-white font-inter text-sm py-3 px-6 hover:bg-gray-700 transition-colors">
                Book a Free Call
              </a>
              <a href={`tel:${phone.replace(/\D/g, '')}`}
                className="border border-gray-900 text-gray-900 font-inter text-sm py-3 px-6 hover:bg-gray-900 hover:text-white transition-colors">
                Call {phone}
              </a>
            </div>
          </div>

          {/* Overlapping images */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop"
              alt="White sofa living room"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3' }}
            />
            <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 border-4 border-white overflow-hidden"
              style={{ width: '40%', aspectRatio: '1/1' }}>
              <img
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&auto=format&fit=crop"
                alt="Bedroom corner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
