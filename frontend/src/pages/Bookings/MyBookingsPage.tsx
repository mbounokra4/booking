// src/pages/Bookings/MyBookingsPage.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyBookings, cancelBooking } from "../../api/bookings";

import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { BookingCard } from "../../components/shared/BookingCard";
import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MyBookingsPage() {
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });

  const activeBookings =
    bookings?.filter((b) => b.status !== "cancelled") ?? [];

  const cancelledBookings =
    bookings?.filter((b) => b.status === "cancelled") ?? [];

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
            Mes réservations
          </motion.h1>

          <p className="mt-4 text-slate-300">
            Retrouvez et gérez toutes vos réservations en un seul endroit.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">

        {isLoading && <Loader />}

        {error && (
          <ErrorMessage message="Impossible de charger vos réservations." />
        )}

        {bookings && bookings.length === 0 && (
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl text-center py-16 px-6">
            <p className="mb-6 text-slate-600">
              Vous n'avez aucune réservation pour le moment.
            </p>

            <Link
              to="/resources"
              className="inline-block px-8 py-3 rounded-2xl bg-[#0A1A2F] text-white font-semibold shadow-xl hover:scale-105 active:scale-95 transition duration-300"
            >
              Parcourir les ressources
            </Link>
          </div>
        )}

        {/* ACTIVE BOOKINGS */}
        {activeBookings.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                En cours ({activeBookings.length})
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {activeBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:-translate-y-2 transition duration-300"
                >
                  <BookingCard
                    booking={booking}
                    onCancel={(id) => cancelMutation.mutate(Number(id))}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CANCELLED BOOKINGS */}
        {cancelledBookings.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
              Annulées ({cancelledBookings.length})
            </h2>

            <div className="flex flex-col gap-4 opacity-60">
              {cancelledBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookingCard booking={booking} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}