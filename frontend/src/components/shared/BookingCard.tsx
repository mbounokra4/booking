// src/components/shared/BookingCard.tsx

import { Calendar, Clock, Trash2 } from "lucide-react";
import type { Booking } from "../../api/bookings";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: number) => void;
  isAdmin?: boolean;
}

/* =========================
   Status style premium
========================= */
function getStatusStyle(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-slate-100 text-slate-500";
    case "pending":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getStatusLabel(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "cancelled":
      return "Annulée";
    case "pending":
      return "En attente";
    default:
      return status;
  }
}

export function BookingCard({
  booking,
  onCancel,
  isAdmin = false,
}: BookingCardProps) {
  return (
    <div className="
      bg-white/90 backdrop-blur-sm
      border border-slate-200
      rounded-2xl
      p-5
      flex justify-between gap-6
      shadow-sm
      hover:shadow-xl hover:-translate-y-1
      transition
    ">
      {/* LEFT */}
      <div className="flex flex-col gap-3">

        {/* Title + Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className="font-semibold text-slate-900 text-sm">
            {booking.resource.name}
          </h4>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
              booking.status
            )}`}
          >
            {getStatusLabel(booking.status)}
          </span>
        </div>

        {/* Admin info */}
        {isAdmin && (
          <p className="text-xs text-slate-500">
            Réservé par :{" "}
            <span className="font-medium text-slate-700">
              {booking.user.name}
            </span>
          </p>
        )}

        {/* Date + Time */}
        <div className="flex flex-wrap gap-6 text-xs text-slate-500">

          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" />
            {new Date(booking.date).toLocaleDateString("fr-FR")}
          </span>

          <span className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            {booking.startTime} – {booking.endTime}
          </span>
        </div>
      </div>

      {/* CANCEL BUTTON */}
      {onCancel && booking.status !== "cancelled" && (
        <button
          onClick={() => onCancel(booking.id)}
          className="
            p-2 rounded-xl
            text-red-600
            hover:bg-red-50
            hover:scale-105
            active:scale-95
            transition
            shrink-0
          "
          aria-label="Annuler la réservation"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}