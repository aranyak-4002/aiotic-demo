import { useDemoParams } from '../useParams'

export default function ContactPage() {
  const { phone, email, city, cal } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1C3A35', minHeight: '380px', paddingTop: '72px' }}
      >
        <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
          Reach Out
        </p>
        <h1 className="font-cormorant font-semibold italic text-5xl md:text-6xl text-white leading-tight">
          Contact
        </h1>
        <div className="mt-5 w-16 h-px" style={{ background: '#C9A96E' }} />
      </div>

      {/* Contact Content */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#1C3A35' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT: quote + contact details */}
          <div>
            <blockquote className="font-cormorant font-light italic text-4xl text-white leading-snug mb-12"
              style={{ borderLeft: '2px solid #C9A96E', paddingLeft: '1.5rem' }}>
              "Every great space starts with a conversation."
            </blockquote>

            <div className="space-y-6">
              <div>
                <p className="font-inter text-xs uppercase mb-1" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
                  Phone
                </p>
                <a href={`tel:${phone}`} className="font-inter font-light text-base text-white hover:opacity-75 transition-opacity">
                  {phone}
                </a>
              </div>

              <div>
                <p className="font-inter text-xs uppercase mb-1" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
                  Email
                </p>
                <a href={`mailto:${email}`} className="font-inter font-light text-base text-white hover:opacity-75 transition-opacity">
                  {email}
                </a>
              </div>

              <div>
                <p className="font-inter text-xs uppercase mb-1" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
                  Studio Location
                </p>
                <p className="font-inter font-light text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>{city}</p>
              </div>

              <div className="pt-4">
                <a href={cal} target="_blank" rel="noreferrer"
                  className="inline-block font-inter text-sm px-6 py-3"
                  style={{ border: '1px solid rgba(201,169,110,0.5)', color: '#C9A96E' }}>
                  Or schedule a call →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact form */}
          <div className="rounded-sm p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="font-inter text-xs uppercase mb-6" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
              Send a Message
            </p>

            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              {[
                { label: 'Name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone', type: 'tel', placeholder: '+91 00000 00000' },
              ].map(field => (
                <div key={field.label}>
                  <label className="font-inter text-xs uppercase block mb-2" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent font-inter text-sm text-white placeholder-white/20 pb-2 focus:outline-none"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}
                  />
                </div>
              ))}

              <div>
                <label className="font-inter text-xs uppercase block mb-2" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                  Project Type
                </label>
                <select
                  className="w-full bg-transparent font-inter text-sm text-white pb-2 focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <option value="" style={{ background: '#1C3A35' }}>Select a type</option>
                  <option value="residential" style={{ background: '#1C3A35' }}>Residential</option>
                  <option value="commercial" style={{ background: '#1C3A35' }}>Commercial</option>
                  <option value="hospitality" style={{ background: '#1C3A35' }}>Hospitality</option>
                  <option value="other" style={{ background: '#1C3A35' }}>Other</option>
                </select>
              </div>

              <div>
                <label className="font-inter text-xs uppercase block mb-2" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                  Budget Range
                </label>
                <select
                  className="w-full bg-transparent font-inter text-sm pb-2 focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <option value="" style={{ background: '#1C3A35' }}>Select a range</option>
                  <option value="under10" style={{ background: '#1C3A35' }}>Under ₹10L</option>
                  <option value="10-25" style={{ background: '#1C3A35' }}>₹10L–₹25L</option>
                  <option value="25-50" style={{ background: '#1C3A35' }}>₹25L–₹50L</option>
                  <option value="50plus" style={{ background: '#1C3A35' }}>₹50L+</option>
                </select>
              </div>

              <div>
                <label className="font-inter text-xs uppercase block mb-2" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="w-full bg-transparent font-inter text-sm text-white placeholder-white/20 pb-2 focus:outline-none resize-none"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}
                />
              </div>

              <button
                type="button"
                onClick={() => window.alert("Message sent! We'll be in touch soon.")}
                className="w-full font-inter text-sm py-4 transition-opacity hover:opacity-90"
                style={{ background: '#C9A96E', color: '#1C3A35', fontWeight: 600 }}
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}
