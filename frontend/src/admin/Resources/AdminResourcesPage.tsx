// src/admin/Resources/AdminResourcesPage.tsx

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
} from "../../api/resources";

import type { Resource } from "../../api/resources";

import { AdminLayout } from "../../components/layout/AdminLayout";
import { Loader } from "../../components/ui/Loader";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Navbar } from "../../components/layout/Navbar";

import { Pencil, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

type FormData = Omit<Resource, "id">;

const EMPTY_FORM: FormData = {
  name: "",
  type: "room",
  capacity: 10,
  description: null,
  location: "",
  available: true,
};

function normalizeType(type: string): string {
  switch (type.toLowerCase()) {
    case "salle":
      return "room";
    case "équipement":
      return "equipment";
    case "voiture":
      return "car";
    case "espace":
      return "space";
    default:
      return type;
  }
}

export default function AdminResourcesPage() {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Resource | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const {
    data: resources,
    isLoading,
    error,
  } = useQuery<Resource[]>({
    queryKey: ["admin-resources"],
    queryFn: fetchResources,
  });

  const createMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Resource> }) =>
      updateResource(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
    },
  });

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(resource: Resource) {
    const { id, ...rest } = resource;
    setEditTarget(resource);
    setForm({
      ...rest,
      type: normalizeType(rest.type),
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
  }

  function handleDelete(id: number) {
    if (!window.confirm("Supprimer cette ressource ?")) return;
    deleteMutation.mutate(id);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      description: form.description?.trim() || null,
    };

    if (editTarget) {
      updateMutation.mutate({
        id: editTarget.id,
        data: payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  }

  return (
    <>
      <Navbar />

      <AdminLayout>

        {/* HERO HEADER */}
        <section className="relative py-14 mb-10 bg-gradient-to-br from-[#0A1A2F] to-black text-white rounded-3xl overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative px-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                Gestion des ressources
              </h1>
              <p className="mt-2 text-slate-300">
                {resources?.length ?? "—"} ressource(s) enregistrée(s)
              </p>
            </div>

            <Button
              onClick={openCreate}
              className="rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition"
            >
              <Plus size={16} />
              Ajouter
            </Button>
          </div>
        </section>

        {isLoading && <Loader />}

        {error && (
          <ErrorMessage message="Impossible de charger les ressources." />
        )}

        {resources && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-left bg-slate-50">
                  <th className="px-6 py-4 font-medium">Nom</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Capacité</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {resources.map((r, index) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {r.name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {r.type}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {r.capacity}
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => openEdit(r)}
                        className="p-2 rounded-xl hover:bg-slate-100 transition"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* MODAL */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={editTarget ? "Modifier la ressource" : "Nouvelle ressource"}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <label className="text-sm font-medium text-slate-700">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="mt-2 w-full border border-slate-300 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1A2F]"
              >
                <option value="room">Salle</option>
                <option value="equipment">Équipement</option>
                <option value="car">Voiture</option>
                <option value="space">Espace</option>
              </select>
            </label>

            <Input
              label="Capacité"
              type="number"
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: Number(e.target.value) })
              }
              required
            />

            <Input
              label="Description"
              value={form.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Input
              label="Localisation"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              isLoading={createMutation.isPending || updateMutation.isPending}
              className="rounded-2xl"
            >
              {editTarget ? "Enregistrer" : "Créer"}
            </Button>
          </form>
        </Modal>
      </AdminLayout>
    </>
  );
}