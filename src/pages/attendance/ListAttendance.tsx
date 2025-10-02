// src/pages/attendance/ListAttendance.tsx
import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import type { AttendanceRecord } from "@/models/AttendanceModel";
import { useNavigate } from "react-router-dom";

export default function ListAttendance() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pilih Status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { attendance, total, loading, error } = useAttendance(
    currentPage,
    rowsPerPage,
    statusFilter !== "Pilih Status" ? statusFilter : undefined
  );

  // Filter pencarian
  const filteredData = (attendance ?? []).filter((item) =>
    (item.user?.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination (local fallback kalau API tidak support pagination)
  const totalPages = Math.ceil(total / rowsPerPage);

  const getPaginationRange = () => {
    let pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }

    return pages;
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Cari Nama User"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        {/* Status filter */}
        <div className="relative w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none pr-10 pl-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pilih Status">Pilih Status</option>
            <option value="PROCESS">Proses</option>
            <option value="SUCCESS">Diterima</option>
            <option value="FAIL">Ditolak</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Absen Datang</th>
              <th className="px-4 py-3">Absen Pulang</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {filteredData.map((att: AttendanceRecord) => (
              <tr key={att.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3">{att.id ?? "-"}</td>
                <td className="px-4 py-3">
                  {att.createdAt
                    ? new Date(att.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td className="px-4 py-3">{att.user?.name ?? "-"}</td>
                <td className="px-4 py-3">{att.job?.role?.role ?? "-"}</td>
                <td className="px-4 py-3">
                  {att.job?.shiftIn
                    ? new Date(att.job.shiftIn).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  {att.job?.shiftOut
                    ? new Date(att.job.shiftOut).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  {att.status === "PROCESS" && (
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-2 hover:bg-gray-200 rounded bg-gray-100"
                        onClick={() => navigate(`/attendance/${att.id}`)}
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-2 flex items-center justify-center bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 w-full md:w-auto">
                        <Check className=" h-4" />
                        Konfirmasi
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded bg-gray-100">
                        <X className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  )}
                  {att.status === "FAIL" && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">
                      Absen Ditolak
                    </span>
                  )}
                  {att.status === "SUCCESS" && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-600">
                      Absen Diterima
                    </span>
                  )}
                </td>
                {/* <td className="px-4 py-3 text-center">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4 text-gray-500" />
                  </button>
                </td> */}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
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
          Menampilkan {(currentPage - 1) * rowsPerPage + 1} -{" "}
          {Math.min(currentPage * rowsPerPage, total)} dari {total} data
        </p>
        <div className="flex justify-center sm:justify-end gap-1 items-center">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page numbers */}
          {getPaginationRange().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(Number(page))}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
