import { useDemoParams } from '../useParams'

export default function ContactPage() {
  const { phone, email, city, cal } = useDemoParams()

  return (
    <>
      {/* Page Hero */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#1A1A1A', minHeight: '340px', paddingTop: '65px' }}
      >
        <div className="w-12 h-px bg-gray-600 mb-8" />
        <h1 className="font-playfair font-bold text-5xl text-white leading-tight">Get In Touch</h1>
        <p className="font-inter font-light text-gray-400 mt-4 text-base max-w-lg">
          Let's discuss your project
        </p>
      </div>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* LEFT: Contact info */}
            <div>
              <p className="font-inter uppercase text-xs tracking-widest text-gray-400 mb-2">Contact Details</p>
              <h2 className="font-playfair font-bold text-3xl text-gray-900 mb-8 leading-tight">
                We'd love to hear from you
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-5 border border-gray-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900 flex-shrink-0">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <div>
                    <p className="font-inter text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                    <a href={`tel:${phone}`} className="font-inter text-sm text-gray-900 hover:text-gray-600 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-gray-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900 flex-shrink-0">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <div>
                    <p className="font-inter text-xs uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <a href={`mailto:${email}`} className="font-inter text-sm text-gray-900 hover:text-gray-600 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-gray-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-900 flex-shrink-0">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <div>
                    <p className="font-inter text-xs uppercase tracking-widest text-gray-400 mb-1">Location</p>
                    <p className="font-inter text-sm text-gray-900">{city}</p>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="p-5 bg-[#F8F8F6]">
                <p className="font-inter text-xs uppercase tracking-widest text-gray-400 mb-3">Working Hours</p>
                <p className="font-inter text-sm text-gray-700">Mon–Sat: 10am–7pm</p>
                <p className="font-inter text-sm text-gray-400 mt-1">Sunday: Closed</p>
              </div>
            </div>

            {/* RIGHT: Contact form */}
            <div>
              <p className="font-inter uppercase text-xs tracking-widest text-gray-400 mb-2">Send a Message</p>
              <h2 className="font-playfair font-bold text-3xl text-gray-900 mb-8 leading-tight">
                Tell us about your project
              </h2>

              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full border border-gray-200 px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full border border-gray-200 px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Project Type
                  </label>
                  <select className="w-full border border-gray-200 px-4 py-3 font-inter text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors bg-white">
                    <option value="">Select a type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-inter text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project, budget, timeline..."
                    className="w-full border border-gray-200 px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => window.alert("Message sent! We'll be in touch soon.")}
                  className="w-full bg-gray-900 text-white font-inter text-sm py-4 hover:bg-gray-700 transition-colors"
                >
                  Send Message
                </button>
              </form>

              {/* Book call CTA */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="font-inter text-sm text-gray-500 mb-3">Or book a direct call</p>
                <a href={cal} target="_blank" rel="noreferrer"
                  className="inline-block border border-gray-900 text-gray-900 font-inter text-sm py-2 px-6 hover:bg-gray-900 hover:text-white transition-colors">
                  Schedule a Call →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
