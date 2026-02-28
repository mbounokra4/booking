import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import type { Resource } from "../../api/resources";

interface ResourceCardProps {
  resource: Resource;
}

function getTypeStyle(type: string) {
  switch (type) {
    case "room":
      return "bg-blue-100 text-blue-700";
    case "equipment":
      return "bg-orange-100 text-orange-700";
    case "car":
      return "bg-purple-100 text-purple-700";
    case "space":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div
      className="
        bg-white/90 backdrop-blur-sm
        border border-slate-200
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-xl hover:-translate-y-1
        transition
        flex flex-col justify-between
      "
    >
      {/* HEADER */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-slate-900 leading-snug">
            {resource.name}
          </h3>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getTypeStyle(
              resource.type
            )}`}
          >
            {resource.type}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* META */}
        <div className="flex flex-col gap-2 text-xs text-slate-500 mb-5">
          <span className="flex items-center gap-2">
            <Users size={14} className="text-slate-400" />
            Capacité : {resource.capacity} pers.
          </span>

          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            {resource.location}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-auto">
        <span
          className={`text-xs font-medium ${
            resource.available
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ● {resource.available ? "Disponible" : "Indisponible"}
        </span>

        <Link
          to={`/resources/${resource.id}`}
          className="
            text-sm font-medium
            text-[#0A1A2F]
            hover:underline
            transition
          "
        >
          Voir →
        </Link>
      </div>
    </div>
  );
}