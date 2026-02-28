// src/admin/Bookings/AdminBookingsPage.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllBookings, deleteBooking } from "../../api/bookings";

import { AdminLayout } from "../../components/layout/AdminLayout";
import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Navbar } from "../../components/layout/Navbar";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminBookingsPage() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: fetchAllBookings,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });

  function formatStatus(status: string) {
    if (status === "confirmed") return "Confirmée";
    if (status === "cancelled") return "Annulée";
    return "En attente";
  }

  return (
    <>
      <Navbar />

      <AdminLayout>
        {/* HERO HEADER */}
        <section className="relative py-14 mb-10 bg-gradient-to-br from-[#0A1A2F] to-black text-white rounded-3xl overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
              Gestion des réservations
            </h1>
            <p className="mt-2 text-slate-300">
              Supervisez et administrez toutes les réservations de la plateforme.
            </p>
          </div>
        </section>

        {isLoading && <Loader />}

        {error && (
          <ErrorMessage message="Impossible de charger les réservations admin." />
        )}

        {bookings && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-left bg-slate-50">
                  <th className="px-6 py-4 font-medium">Ressource</th>
                  <th className="px-6 py-4 font-medium">Utilisateur</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Horaire</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b, index) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {b.resource.name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {b.user.name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(b.date).toLocaleDateString("fr-FR")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {b.startTime} - {b.endTime}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {formatStatus(b.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteMutation.mutate(b.id)}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-100 hover:text-red-800 transition duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AdminLayout>
    </>
  );
}