import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/neotutorlogotr.png";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, fetchUser, logout, setUser } = useAuth();

  useEffect(() => {
    if (isLoggedIn) fetchUser();
    else setUser(null);
  }, [isLoggedIn, fetchUser, setUser]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        logout();
        setMenuOpen(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Signout error:", err);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/tutors", label: "Your Tutors" },
    { to: "/contact", label: "Contact" },
  ];

  return (
 <header className="bg-gray-900 text-gray-300 border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    {/* Left: Hamburger menu (mobile only) */}
    <button
      type="button"
      onClick={() => setMobileNavOpen((s) => !s)}
      className="md:hidden p-2 rounded hover:bg-gray-800 focus:outline-none"
    >
      ☰
    </button>

    {/* Center: Logo */}
    <Link
      to="/"
      className="text-xl font-semibold text-white flex items-center space-x-2"
    >
      <img src={Logo} alt="logo" className="w-10" />
      <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
        NeoTutor
      </span>
    </Link>

       {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 me-20 cursor-pointer">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-white transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

    {/* Right: Auth / Avatar */}
    <div className="relative" ref={menuRef}>
      {!isLoggedIn || !user ? (
        <Link to="/auth">
          <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-cyan-500/30 transition-all">
            Sign In / Sign Up
          </Button>
        </Link>
      ) : (
        <>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 hover:ring-cyan-400 transition-all"
          >
            <img
              src={
                user.githubUsername
                  ? `https://avatars.githubusercontent.com/${user.githubUsername}`
                  : Logo
              }
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = Logo)
              }
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -6 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 mt-3 w-56 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3">
                  <div className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-300">
                    @{user.githubUsername ?? "unknown"}
                  </div>
                </div>
                <div className="border-t border-white/5" />
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-rose-400 hover:bg-white/5 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  </div>

  {/* Mobile nav panel */}
  <AnimatePresence>
    {mobileNavOpen && (
      <motion.nav
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 space-y-2"
      >
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileNavOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block text-white font-medium"
                : "block hover:text-white transition-colors"
            }
          >
            {label}
          </NavLink>
        ))}
      </motion.nav>
    )}
  </AnimatePresence>
</header>

  );
}
