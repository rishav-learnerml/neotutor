import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/neotutorlogotr.png"; // Adjust the path as necessary

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="text-xl font-semibold text-white flex items-center space-x-2">
          <img src={Logo} alt="logo" className="w-10" />
          <span>NeoTutor</span>
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 hidden md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "hover:text-white transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tutor"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "hover:text-white transition-colors"
            }
          >
            Tutor
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium"
                : "hover:text-white transition-colors"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-800 focus:outline-none"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
