import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Pencil, Trash, Plus } from "lucide-react";
import { useRoleInt } from "@/hooks/internal/useRoleInt"; 
// import { useNavigate } from "react-router-dom";
import RoleModal from "@/new-components/RoleModal";
import Swal from "sweetalert2";
import type { RoleModel } from "@/models/internal/RoleModel";
import { deleteRole } from "@/services/internal/roleServiceInt";

export default function RoleList() {
  // const navigate = useNavigate();
  const { roles, loading, error, refetch } = useRoleInt();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRole, setSelectedRole] = useState<RoleModel | null>(null);

  const openCreate = () => {
    setSelectedRole(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (r: RoleModel) => {
    setSelectedRole(r);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = (r: RoleModel) => {
    Swal.fire({
      title: "Hapus Role",
      text: `Yakin ingin menghapus role "${r.role}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteRole(r.id);
          Swal.fire({ icon: "success", title: "Terhapus", text: "Role berhasil dihapus" });
          refetch();
        } catch (err: any) {
          console.error(err);
          Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Gagal menghapus role" });
        }
      }
    });
  };

  // Filter
  const filtered = (roles ?? []).filter((r) => {
    const name = r.role ?? "";
    return name.toLowerCase().includes(search.toLowerCase()) || String(r.id).includes(search);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + rowsPerPage);

  const maxVisible = 5;
  const getPaginationRange = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const formatDate = (s?: string) =>
    s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-";

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header + actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">List Roles</h2>
        <div className="flex items-center gap-3">
          <button onClick={openCreate} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Tambah Role
          </button>
        </div>
      </div>

      {/* Top bar: search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Cari role atau ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 text-left text-sm font-medium border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm bg-white">
            {paginated.map((r: RoleModel) => (
              <tr key={r.id} className="hover:bg-indigo-50 border-t">
                <td className="px-4 py-3 whitespace-nowrap">{r.id}</td>
                <td className="px-4 py-3 font-medium">{r.role}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(r.updatedAt)}</td>
                <td className="px-4 py-3 text-center">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => openEdit(r)} className="p-1 hover:bg-gray-100 rounded">
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    {/* <button onClick={() => navigate(`/internal/roles/${r.id}`)} className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button> */}
                    <button onClick={() => handleDelete(r)} className="p-1 hover:bg-gray-100 rounded">
                      <Trash className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
        <p className="text-center sm:text-left">
          Menampilkan {filtered.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + rowsPerPage, filtered.length)} dari {filtered.length} data
        </p>

        <div className="flex justify-center sm:justify-end gap-1 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {getPaginationRange().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(Number(page))}
                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Role modal */}
      <RoleModal
        open={modalOpen}
        mode={modalMode}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSaved={() => {
          refetch();
        }}
      />
    </div>
  );
}