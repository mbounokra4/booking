import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

import { fetchResources } from "../api/resources";
import type { Resource } from "../api/resources";
import { Flame } from "lucide-react";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ResourceCard } from "../components/shared/ResourceCard";

import { Loader } from "../components/ui/Loader";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { Input } from "../components/ui/Input";

import { Search, Users, MessageCircle, Sparkles } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";

type ResourceType = "room" | "equipment" | "car" | "space";

const TYPE_FILTERS = [
  { label: "Tout", value: "all" },
  { label: "Salles", value: "room" },
  { label: "Équipements", value: "equipment" },
  { label: "Voitures", value: "car" },
  { label: "Espaces", value: "space" },
] as const;

export default function HomePage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  const [typeFilter, setTypeFilter] = useState<ResourceType | "all">("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
    enabled: !!user,
  });

  const filteredResources =
    data?.filter((r: Resource) => {
      const matchType = typeFilter === "all" || r.type === typeFilter;
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    }) ?? [];

  if (authLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F]/80 via-[#0A1A2F]/60 to-black/80 backdrop-blur-md" />

        <div className="relative max-w-6xl mx-auto px-4 py-36 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6 text-sm"
          >
            <Flame size={16} /> Plateforme de réservation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
          >
            BookingWorld
          </motion.h1>

          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            Trouvez votre ressource. Réservez en quelques secondes.
            Passez du solo au social en un instant.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link
              to="/resources"
              className="px-8 py-4 rounded-2xl bg-white text-[#0A1A2F] font-semibold shadow-2xl hover:scale-110 transition duration-300 active:scale-95"
            >
              Explorer les ressources
            </Link>

            <Link
              to="/profile"
              className="px-8 py-4 rounded-2xl border border-white text-white font-semibold hover:bg-white hover:text-[#0A1A2F] transition duration-300 active:scale-95"
            >
              Espace utilisateur
            </Link>
          </div>

          {/* HERO STATS */}
          <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm">
            <div>
              <p className="text-3xl font-bold">{data?.length ?? 0}+</p>
              <p className="text-slate-300">Ressources</p>
            </div>
            <div>
              <p className="text-3xl font-bold">3M+</p>
              <p className="text-slate-300">Utilisateurs</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-slate-300">Sécurisé</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-slate-300">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMENT ÇA MARCHE ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[#0A1A2F]">
            Comment ça marche ?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Recherchez", desc: "Trouvez la ressource parfaite." },
              { step: "02", title: "Réservez", desc: "Confirmez instantanément." },
              { step: "03", title: "Profitez", desc: "Vivez l’expérience sans friction." },
            ].map((item) => (
              <div
                key={item.step}
                className="p-10 rounded-3xl bg-slate-50 shadow-lg hover:shadow-2xl hover:-translate-y-4 transition duration-300"
              >
                <p className="text-5xl font-bold text-[#0A1A2F]/20">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING ================= */}
      {user && data && (
        <section className="py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
              <Flame />
              <h2 className="text-3xl font-bold">
                Les plus réservées aujourd’hui
              </h2>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x">
              {data.slice(0, 6).map((resource) => (
                <div
                  key={resource.id}
                  className="min-w-[320px] bg-white/80 backdrop-blur border border-slate-200 rounded-3xl shadow-2xl p-4 hover:-translate-y-4 hover:scale-[1.02] transition duration-300"
                >
                  <ResourceCard resource={resource} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SEARCH + RESOURCES ================= */}
      {user ? (
        <section className="bg-white py-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-3xl mx-auto border border-slate-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une ressource..."
                    className="pl-10"
                  />
                </div>

                <button
                  onClick={() => navigate("/resources")}
                  className="bg-[#0A1A2F] text-white px-6 py-3 rounded-xl font-medium hover:scale-105 active:scale-95 transition"
                >
                  Rechercher
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {TYPE_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setTypeFilter(f.value)}
                    className={`px-4 py-2 text-sm rounded-full border transition ${
                      typeFilter === f.value
                        ? "bg-[#0A1A2F] text-white border-[#0A1A2F]"
                        : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-semibold">
                  Ressources disponibles
                </h2>

                <button
                  onClick={() => navigate("/resources")}
                  className="text-[#0A1A2F] font-medium hover:underline"
                >
                  Voir tout →
                </button>
              </div>

              {isLoading && <Loader />}
              {error && (
                <ErrorMessage
                  message="Impossible de charger les ressources."
                  onRetry={refetch}
                />
              )}

              {!isLoading && !error && filteredResources.length > 0 && (
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.slice(0, 6).map((resource) => (
                    <div
                      key={resource.id}
                      className="hover:-translate-y-3 hover:scale-[1.02] transition duration-300"
                    >
                      <ResourceCard resource={resource} />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && !error && filteredResources.length === 0 && (
                <p className="text-center text-slate-500 py-12">
                  Aucune ressource trouvée.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-28 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-[#0A1A2F]">
              Connectez-vous pour accéder aux ressources
            </h2>
            <p className="mt-4 text-slate-600">
              Créez un compte ou connectez-vous pour rechercher et réserver.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block bg-[#0A1A2F] text-white px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Se connecter
            </Link>
          </div>
        </section>
      )}

      {/* ================= KPI SECTION ================= */}
      <section className="py-24 bg-slate-50 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto my-20 text-center">
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-3xl font-bold text-[#0A1A2F]">+98%</p>
          <p className="text-gray-600 text-sm mt-1">Taux de satisfaction</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-3xl font-bold text-[#0A1A2F]">-60%</p>
          <p className="text-gray-600 text-sm mt-1">Temps de réservation réduit</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-3xl font-bold text-[#0A1A2F]">x3</p>
          <p className="text-gray-600 text-sm mt-1">Engagement utilisateur</p>
        </div>
      </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative bg-gradient-to-br from-[#0A1A2F] to-black text-white py-32 text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

    <h3 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
      Prêt à passer au niveau supérieur ?
    </h3>

        <p className="mt-6 text-slate-300 text-lg">
          Simple, rapide et sécurisé. Commencez dès maintenant.
        </p>

        <button
          onClick={() => navigate("/resources")}
          className="mt-10 bg-white text-[#0A1A2F] px-10 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-110 active:scale-95 transition duration-300"
        >
          Explorer maintenant
        </button>
      </section>
     {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto my-20 text-center">
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-3xl font-bold text-[#0A1A2F]">
            {user ? data?.length ?? 0 : 0}+
          </p>
          <p className="text-gray-600 text-sm mt-1">Ressources disponibles</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-xl font-semibold text-[#0A1A2F]">
            Réservation instantanée
          </p>
          <p className="text-gray-600 text-sm mt-1">En quelques clics</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <p className="text-3xl font-bold text-[#0A1A2F]">100%</p>
          <p className="text-gray-600 text-sm mt-1">Sécurisé</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}