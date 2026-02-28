// src/pages/Register/RegisterPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate("/resources");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'inscription"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* HERO BACKGROUND */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#0A1A2F] to-black overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur">
              <Calendar size={22} className="text-white" />
            </div>

            <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              BookingWorld
            </span>
          </div>

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-xl font-semibold text-slate-900 mb-2">
              Créer un compte
            </h1>

            <p className="text-sm text-slate-600 mb-6">
              Rejoignez la plateforme en quelques secondes.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Nom complet"
                type="text"
                placeholder="Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Adresse email"
                type="email"
                placeholder="vous@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Mot de passe"
                type="password"
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                hint="Au moins 6 caractères"
              />

              {error && (
                <p className="text-sm text-red-600 font-medium">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition"
              >
                Créer mon compte
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-300 mt-6">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}