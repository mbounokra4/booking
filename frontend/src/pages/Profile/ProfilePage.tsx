// src/pages/Profile/ProfilePage.tsx

import { useAuth } from "../../hooks/useAuth";

import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input } from "../../components/ui/Input";

import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Vous devez être connecté pour voir votre profil.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ================= HERO HEADER ================= */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1A2F] to-black text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl"
          >
            Mon profil
          </motion.h1>

          <p className="mt-4 text-slate-300">
            Consultez les informations de votre compte.
          </p>
        </div>
      </section>

      {/* ================= PROFILE CARD ================= */}
      <main className="max-w-xl mx-auto px-4 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 shadow-2xl"
        >
          {/* User header */}
          <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-200">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A1A2F] to-black flex items-center justify-center shadow-lg">
              <User size={26} className="text-white" />
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">
                {user.email}
              </p>

              <span className="mt-1 inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                {user.role === "admin"
                  ? "Administrateur"
                  : "Utilisateur"}
              </span>
            </div>
          </div>

          {/* Form (readonly) */}
          <div className="flex flex-col gap-5">
            <Input
              label="Email"
              value={user.email}
              disabled
            />

            <Input
              label="Rôle"
              value={user.role}
              disabled
            />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}