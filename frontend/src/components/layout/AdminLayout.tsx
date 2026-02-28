import React from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Top spacing for visual breathing */}
        <div className="px-8 py-10">

          {/* Content container */}
          <div className="
            max-w-6xl mx-auto
            bg-white/70 backdrop-blur-xl
            border border-slate-200
            rounded-3xl
            shadow-xl
            p-8
          ">
            {children}
          </div>

        </div>
      </main>
    </div>
  );
}