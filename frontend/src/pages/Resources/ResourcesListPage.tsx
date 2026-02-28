import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchResources } from "../../api/resources";
import type { Resource } from "../../api/resources";

import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ResourceCard } from "../../components/shared/ResourceCard";

import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Input } from "../../components/ui/Input";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

type ResourceType = "room" | "equipment" | "car" | "space";

const TYPE_FILTERS: { label: string; value: ResourceType | "all" }[] = [
  { label: "Tout", value: "all" },
  { label: "Salles", value: "room" },
  { label: "Équipements", value: "equipment" },
  { label: "Voitures", value: "car" },
  { label: "Espaces", value: "space" },
];

export default function ResourcesListPage() {
  const [typeFilter, setTypeFilter] = useState<ResourceType | "all">("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  const filteredResources =
    data?.filter((r: Resource) => {
      const matchType = typeFilter === "all" || r.type === typeFilter;
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    }) ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ================= HERO HEADER ================= */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1A2F] to-black text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl"
          >
            Ressources disponibles
          </motion.h1>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Consultez et réservez salles, équipements, espaces et véhicules en toute simplicité.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-4 py-16">

        {/* FILTER CARD */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-12 border border-slate-200">

          <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* Search */}
            <div className="relative flex-1 w-full max-w-md">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une ressource..."
                className="pl-10"
              />
            </div>

            {/* Type filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-4 py-2 text-sm rounded-full border transition duration-300 ${
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
        </div>

        {/* CONTENT */}
        {isLoading && <Loader />}

        {error && (
          <ErrorMessage
            message="Impossible de charger les ressources."
            onRetry={refetch}
          />
        )}

        {!isLoading && !error && (
          <>
            <p className="text-sm text-slate-500 mb-6">
              {filteredResources.length} ressource
              {filteredResources.length !== 1 ? "s" : ""}
            </p>

            {filteredResources.length === 0 ? (
              <div className="text-center py-20 text-slate-500 text-sm">
                Aucune ressource ne correspond à votre recherche.
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:-translate-y-3 hover:scale-[1.02] transition duration-300"
                  >
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}