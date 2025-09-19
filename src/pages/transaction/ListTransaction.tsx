import { useState } from "react";
import {
  Search,
  Filter,
  DownloadCloud,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

import { useTransaction } from "../../hooks/useTransaction";
import type { TransactionModel } from "../../models/TransactionModel";
import { useNavigate } from "react-router-dom";

export default function ListTransaction() {
  const navigate = useNavigate();

  const { transactions, loading, error } = useTransaction();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pilih Status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter berdasarkan pencarian + status
  const filteredData = (transactions ?? []).filter((transaction) => {
    const role = transaction.id ?? "";
    const statusMatch =
      statusFilter === "Pilih Status" ||
      statusFilter === "Semua" ||
      (statusFilter === "Berhasil" && transaction.status === "COMPLETED") ||
      (statusFilter === "Menunggu Tindakan" &&
        transaction.status === "PENDING") ||
      (statusFilter === "Gagal" && transaction.status === "FAILED");

    return role.toLowerCase().includes(search.toLowerCase()) && statusMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const maxVisible = 5;

  const getPaginationRange = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
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
    }

    return pages;
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Cari ID Transaksi"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
          {/* Dropdown Status */}
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
              <option value="Semua">Semua</option>
              <option value="Menunggu Pelamar">Berhasil</option>
              <option value="Sedang Berlangsung">Menunggu Tindakan</option>
              <option value="Selesai">Gagal</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>

          {/* <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white w-full md:w-auto">
            <span>Export</span>
            <DownloadCloud className="w-4 h-4" />
          </button> */}

          <button
            onClick={() => navigate("/transaction/topup")}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 w-full md:w-auto"
          >
            <span>Top Up</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {paginatedData.map((trans: TransactionModel) => (
              <tr key={trans.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3 whitespace-nowrap">{trans.id ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {trans.createdAt ?? "-"}
                </td>
                <td className="px-4 py-3">{trans.type ?? "-"}</td>
                <td className="px-4 py-3">{trans.amount ?? "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-medium",
                      trans.status === "COMPLETED" && "bg-green-100 text-green-600",
                      trans.status === "PENDING" && "bg-orange-100 text-orange-600",
                      trans.status === "FAILED" && "bg-red-100 text-red-600"
                    )}
                  >
                    {trans.status === "COMPLETED" && "Berhasil"}
                    {trans.status === "PENDING" && "Menunggu Tindakan"}
                    {trans.status === "FAILED" && "Gagal"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => navigate(`/transaction/${trans.id}`)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="h-4 w-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
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
          Menampilkan {startIndex + 1} -{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} dari{" "}
          {filteredData.length} data
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
