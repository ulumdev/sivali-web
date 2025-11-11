import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { RoleModel } from "@/models/internal/RoleModel";
import { createRole, updateRole } from "@/services/internal/roleServiceInt";

type Mode = "create" | "edit";

type Props = {
  open: boolean;
  mode: Mode;
  role?: RoleModel | null;
  onClose: () => void;
  onSaved: () => void; // called after successful create/update so parent can refetch
};

export default function RoleModal({ open, mode, role, onClose, onSaved }: Props) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const title = mode === "create" ? "Tambah Role" : "Edit Role";

  useEffect(() => {
    if (mode === "edit" && role) {
      setValue(role.role ?? "");
    } else {
      setValue("");
    }
  }, [mode, role, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = (value ?? "").trim();
    if (!trimmed) {
      Swal.fire({ icon: "warning", title: "Field kosong", text: "Nama role tidak boleh kosong" });
      return;
    }

    setSaving(true);
    try {
      if (mode === "create") {
        await createRole({ role: trimmed });
        Swal.fire({ icon: "success", title: "Berhasil", text: "Role berhasil dibuat" });
      } else if (mode === "edit" && role) {
        await updateRole(role.id, { role: trimmed });
        Swal.fire({ icon: "success", title: "Berhasil", text: "Role berhasil diperbarui" });
      }
      onSaved();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Terjadi kesalahan" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!saving) onClose();
        }}
      />
      {/* modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama role"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                if (!saving) onClose();
              }}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              disabled={saving}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded text-white text-sm ${saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}