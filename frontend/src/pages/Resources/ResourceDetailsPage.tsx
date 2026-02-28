import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { fetchResource } from "../../api/resources";
import { createBooking } from "../../api/bookings";
import { useAuth } from "../../hooks/useAuth";

import { Navbar } from "../../components/layout/Navbar";
import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";

import { MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react";

export default function ResourceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    data: resource,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resource", id],
    queryFn: () => fetchResource(Number(id)),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      setBookingSuccess(true);
    },
    onError: (err: Error) => {
      setFormError(err.message);
    },
  });

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!resource) return;

    if (startTime >= endTime) {
      setFormError("L'heure de fin doit être après l'heure de début.");
      return;
    }

    mutation.mutate({
      date,
      startTime,
      endTime,
      resource_id: resource.id,
    });
  }

  function closeModal() {
    setModalOpen(false);
    setBookingSuccess(false);
    setFormError("");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HEADER HERO */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1A2F] to-black text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-8 transition"
          >
            <ArrowLeft size={16} />
            Retour aux ressources
          </button>

          {resource && (
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl"
            >
              {resource.name}
            </motion.h1>
          )}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">

        {isLoading && <Loader />}
        {error && <ErrorMessage message="Ressource introuvable" />}

        {resource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 shadow-2xl"
          >
            <p className="text-slate-600 leading-relaxed">
              {resource.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                <Users size={16} />
                Capacité : {resource.capacity}
              </span>

              <span className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                <MapPin size={16} />
                {resource.location}
              </span>
            </div>

            <div className="mt-10">
              <Button
                onClick={() => setModalOpen(true)}
                disabled={!resource.available}
                className="px-8 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition duration-300"
              >
                Réserver cette ressource
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={`Réserver — ${resource?.name}`}
      >
        {bookingSuccess ? (
          <div className="text-center py-8">
            <CheckCircle size={50} className="text-green-600 mx-auto" />
            <p className="mt-4 font-semibold text-lg">
              Réservation confirmée !
            </p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="flex flex-col gap-5">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Début"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />

              <Input
                label="Fin"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}

            <Button type="submit" isLoading={mutation.isPending}>
              Confirmer
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}