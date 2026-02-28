import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";

import {
  Calendar,
  CircleUser,
  PanelsTopLeft,
  DoorOpen,
} from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A1A2F]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold text-white no-underline group"
        >
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur group-hover:bg-white/20 transition">
            <Calendar size={20} />
          </div>
          <span className="text-lg tracking-wide bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            BookingWorld
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 text-sm font-medium">
          {user ? (
            <>
              <Link
                to="/resources"
                className="px-4 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition duration-300"
              >
                Ressources
              </Link>

              <Link
                to="/bookings"
                className="px-4 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition duration-300"
              >
                Mes réservations
              </Link>

              {/* Profil */}
              <Link
                to="/profile"
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition duration-300"
                aria-label="Profil"
              >
                <CircleUser size={20} />
              </Link>

              {/* Admin */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition duration-300"
                  aria-label="Administration"
                >
                  <PanelsTopLeft size={20} />
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-200 hover:text-red-400 hover:bg-white/10 transition duration-300"
                aria-label="Se déconnecter"
              >
                <DoorOpen size={20} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition duration-300"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-2xl bg-white text-[#0A1A2F] font-semibold shadow-xl hover:scale-105 active:scale-95 transition duration-300"
              >
                S'inscrire
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}