import logo from "../assets/neotutorlogotr.png";

export default function Contact() {
  return (
    <main className="flex items-center justify-center py-16 px-4 h-[90vh]">
      <section
        className="w-8/12 max-w-5xl 
        group overflow-hidden rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 bg-white/10 backdrop-blur-lg border border-white/20
        grid md:grid-cols-2 p-8 md:p-12 gap-8"
      >

        <div className=" flex flex-col">

        <img src={logo} alt="logo" className="w-32 pb-6" />

        {/* Contact Info */}
        <div className="flex flex-col justify-center">
        </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Get in Touch ✨
          </h2>
          <p className="text-slate-400 mb-6">
            We'd love to hear from you. Reach out anytime!
          </p>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 8V7l-3 2-2-1-7 4-4-2-4 2v1l4-2 4 2 7-4 2 1 3-2z" />
              </svg>
              <span>support@swagcoder.in</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55 1.13 1 1 0 011 .99V20a1 1 0 01-.89 1A16 16 0 014 5.89 1 1 0 015 5h3.5a1 1 0 011 .99 11.36 11.36 0 001.13 3.55 1 1 0 01-.21 1.11z" />
              </svg>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span>Kolkata, West Bengal, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">
              Your Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">
              Your Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">
              Your Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 font-semibold hover:from-cyan-600 hover:to-teal-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
            </svg>
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
