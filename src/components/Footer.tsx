import Logo from "../assets/neotutorlogo.png"; // Adjust the path as necessary
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <img src={Logo} alt="logo" className="w-20" />
          <p className="mt-2 text-sm text-gray-400">
            Your AI-powered learning companion.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/tutor" className="hover:text-white transition-colors">
                Tutor
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Follow Me</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/rishav-chatterjee-fsd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors text-2xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/rishav-learnerml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors text-2xl"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://rishav.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
              className="hover:text-white transition-colors text-2xl"
            >
              <i className="fas fa-globe"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NeoTutor. All rights reserved.
      </div>
    </footer>
  );
}
