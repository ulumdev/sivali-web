import { useState } from "react";
import {
  Search,
  DownloadCloud,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { EmployeeModel } from "@/models/internal/EmployeeModel";
import { useSuspendedEmployee } from "@/hooks/internal/useEmployeeInternal";
import { useNavigate } from "react-router-dom";

export default function EmployeeSuspended() {
  const navigate = useNavigate();
  const { employees, loading, error } = useSuspendedEmployee();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = (employees ?? []).filter((w) => {
    const name = `${w.firstName ?? ""} ${w.lastName ?? ""}`.trim();
    const email = w.email ?? "";
    const phone = w.phoneNumber ?? "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const maxVisible = 5;

  const getPaginationRange = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= maxVisible) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) pages = [1, 2, 3, 4, "...", totalPages];
      else if (currentPage >= totalPages - 2)
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      else pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
    return pages;
  };

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setCurrentPage(1);
  };

  const formatDate = (s?: string) =>
    s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-";

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Cari nama, email, atau telepon"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
            <span>Export</span>
            <DownloadCloud className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
            <tr>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telepon</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {paginatedData.map((w: EmployeeModel) => (
              <tr key={w.id} className="hover:bg-indigo-50 border-t">
                <td className="px-4 py-3">
                  <img
                    src={w.profilePictureUrl || "/images/default-avatar.png"}
                    alt={w.firstName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{`${w.firstName ?? "-"} ${w.lastName ?? ""}`}</td>
                <td className="px-4 py-3 text-gray-600">{w.email ?? "-"}</td>
                <td className="px-4 py-3">{w.phoneNumber ?? "-"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                    Suspended
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{w.lastLoginAt ? formatDate(w.lastLoginAt) : "-"}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => navigate(`/internal/employees/${w.id}`)} className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
        <p className="text-center sm:text-left">
          Menampilkan {startIndex + 1} - {Math.min(startIndex + rowsPerPage, filteredData.length)} dari {filteredData.length} data
        </p>
        <div className="flex justify-center sm:justify-end gap-1 items-center">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {getPaginationRange().map((page, idx) =>
            page === "..." ? <span key={idx} className="px-2">...</span> : (
              <button key={idx} onClick={() => setCurrentPage(Number(page))} className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}>
                {page}
              </button>
            )
          )}

          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}