import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { fetchResources } from "../../api/resources";
import { fetchAllBookings } from "../../api/bookings";
import { fetchAllUsers } from "../../api/users";

import { AdminLayout } from "../../components/layout/AdminLayout";
import { Loader } from "../../components/ui/Loader";
import { Navbar } from "../../components/layout/Navbar";

import { BookOpen, Users, CalendarCheck, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({ label, value, icon, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 flex items-center gap-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
    >
      <div className={`p-4 rounded-2xl text-white ${gradient}`}>
        {icon}
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const resources = useQuery({
    queryKey: ["admin-resources"],
    queryFn: fetchResources,
  });

  const bookings = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: fetchAllBookings,
  });

  const users = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAllUsers,
  });

  const isLoading =
    resources.isLoading || bookings.isLoading || users.isLoading;

  const stats = {
    resources: resources.data?.length ?? 0,
    bookings: bookings.data?.length ?? 0,
    users: users.data?.length ?? 0,
    activeBookings:
      bookings.data?.filter((b) => b.status === "confirmed").length ?? 0,
  };

  const recentBookings = bookings.data
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <>
      <Navbar />

      <AdminLayout>
        {/* HERO HEADER */}
        <section className="relative py-16 mb-10 bg-gradient-to-br from-[#0A1A2F] to-black text-white rounded-3xl overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
              Dashboard Administrateur
            </h1>
            <p className="mt-2 text-slate-300">
              Vue globale des performances de la plateforme.
            </p>
          </div>
        </section>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                label="Ressources"
                value={stats.resources}
                icon={<BookOpen size={22} />}
                gradient="bg-gradient-to-br from-blue-600 to-blue-800"
              />

              <StatCard
                label="Utilisateurs"
                value={stats.users}
                icon={<Users size={22} />}
                gradient="bg-gradient-to-br from-green-600 to-green-800"
              />

              <StatCard
                label="Réservations"
                value={stats.bookings}
                icon={<CalendarCheck size={22} />}
                gradient="bg-gradient-to-br from-orange-500 to-orange-700"
              />

              <StatCard
                label="Confirmées"
                value={stats.activeBookings}
                icon={<TrendingUp size={22} />}
                gradient="bg-gradient-to-br from-purple-600 to-purple-800"
              />
            </div>

            {/* RECENT BOOKINGS */}
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">
                  Réservations récentes
                </h2>
              </div>

              {!recentBookings || recentBookings.length === 0 ? (
                <p className="text-sm text-slate-600 p-6">
                  Aucune réservation pour le moment.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-left">
                      <th className="px-6 py-4 font-medium">Ressource</th>
                      <th className="px-6 py-4 font-medium">Utilisateur</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Statut</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {b.resource.name}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {b.user?.name}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {new Date(b.date).toLocaleDateString("fr-FR")}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              b.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
}