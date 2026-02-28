import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Users,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/resources", icon: BookOpen, label: "Ressources" },
  { to: "/admin/bookings", icon: CalendarCheck, label: "Réservations" },
  { to: "/admin/users", icon: Users, label: "Utilisateurs" },
];

export function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-gradient-to-b from-[#0A1A2F] to-black text-white flex flex-col min-h-screen border-r border-white/10">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h2 className="text-lg font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-300",
                isActive
                  ? "bg-white text-[#0A1A2F] font-semibold shadow-lg"
                  : "text-slate-300 hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            <Icon
              size={18}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}