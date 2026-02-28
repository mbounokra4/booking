// src/admin/Users/AdminUsersPage.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, deleteUser } from "../../api/users";
import type { ApiUser } from "../../api/users";

import { useAuth } from "../../hooks/useAuth";

import { AdminLayout } from "../../components/layout/AdminLayout";
import { Navbar } from "../../components/layout/Navbar";

import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

import { Trash2, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<ApiUser[]>({
    queryKey: ["admin-users"],
    queryFn: fetchAllUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

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
              Gestion des utilisateurs</h1>
            <p className="mt-2 text-slate-300">
              {users?.length ?? "—"} compte(s) enregistré(s)
            </p>
          </div>
        </section>

        {isLoading && <Loader />}

        {error && (
          <ErrorMessage message="Impossible de charger les utilisateurs." />
        )}

        {users && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-left bg-slate-50">
                  <th className="px-6 py-4 font-medium">Utilisateur</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Rôle</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, index) => {
                  const isAdmin = u.roles.includes("ROLE_ADMIN");

                  return (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                              isAdmin
                                ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isAdmin ? (
                              <Shield size={16} />
                            ) : (
                              <User size={16} />
                            )}
                          </div>

                          <span className="font-medium text-slate-900">
                            {u.name}
                          </span>

                          {currentUser?.email === u.email && (
                            <span className="text-xs text-slate-500">
                              (vous)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-600">
                        {u.email}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            isAdmin
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isAdmin ? "Administrateur" : "Utilisateur"}
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="px-6 py-4">
                        {currentUser?.email !== u.email && (
                          <button
                            onClick={() => deleteMutation.mutate(Number(u.id))}
                            className="p-2 rounded-xl text-slate-500 hover:bg-red-100 hover:text-red-700 transition duration-300"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AdminLayout>
    </>
  );
}