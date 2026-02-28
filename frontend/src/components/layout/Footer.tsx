import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-[#0A1A2F] to-black text-slate-300 overflow-hidden">

      {/* Decorative blur effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Branding */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              BookingWorld
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Solution moderne de gestion et de réservation de ressources,
            conçue pour offrir une expérience fluide, performante et sécurisée.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Navigation
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              to="/resources"
              className="text-slate-400 hover:text-white transition duration-300"
            >
              Catalogue
            </Link>

            <Link
              to="/bookings"
              className="text-slate-400 hover:text-white transition duration-300"
            >
              Mes réservations
            </Link>

            <Link
              to="/profile"
              className="text-slate-400 hover:text-white transition duration-300"
            >
              Profil
            </Link>
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            À propos
          </h3>

          <p className="text-slate-400 text-sm">
            Développé par{" "}
            <span className="text-white font-medium">
              Mouad Bounokra
            </span>.
          </p>

          <div className="mt-6 text-xs text-slate-500">
            Plateforme pensée pour la performance,
            l'élégance et la simplicité.
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BookingWorld — Tous droits réservés.
      </div>
    </footer>
  );
}