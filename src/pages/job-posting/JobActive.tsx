// import React from "react";
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

interface JobPosting {
  id: string;
  tanggal: string;
  role: string;
  jumlahPekerja: number;
  status: string;
}

const roles = ["Bartender", "Cashier", "Waiters"];
const dummyData: JobPosting[] = Array.from({ length: 200 }, (_, i) => ({
  id: `DX12345678901234${i + 1}`,
  tanggal: "20/08/2025 21:24",
  role: roles[Math.floor(Math.random() * roles.length)],
  jumlahPekerja: Math.floor(Math.random() * 10) + 1,
  status: i % 2 === 0 ? "Menunggu Pelamar" : "Sedang Berlangsung",
}));

export default function ActiveJobPosting() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pilih Status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter berdasarkan pencarian + status
  const filteredData = dummyData.filter((job) => {
    const matchesSearch = job.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "Semua" || statusFilter === "Pilih Status" ? true : job.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        {/* Search bar */}
        <div className="relative w-[40%]">
          <input
            type="text"
            placeholder="Cari role"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset ke page 1
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Dropdown Status dengan icon Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // reset ke page 1
              }}
              className="appearance-none pr-10 pl-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pilih Status">Pilih Status</option>
              <option value="Semua">Semua</option>
              <option value="Menunggu Pelamar">Menunggu Pelamar</option>
              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
            </select>
            {/* Icon Filter */}
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
          {/* <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
            <span>Pilih Status</span>
            <Filter className="w-4 h-4" />
          </button> */}
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
            <span>Export</span>
            <DownloadCloud className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <span>Buat Job Posting</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
            <tr>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Tanggal</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Jumlah Pekerja</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {paginatedData.map((job) => (
              <tr key={job.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3">{job.id}</td>
                <td className="px-4 py-3">{job.tanggal}</td>
                <td className="px-4 py-3">{job.role}</td>
                <td className="px-4 py-3">{job.jumlahPekerja}</td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-medium",
                      job.status === "Menunggu Pelamar"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    )}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="p-1 hover:bg-gray-100 rounded">
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
      <div className="flex justify-between items-center text-sm">
        <p>
          Menampilkan {startIndex + 1} -{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} dari{" "}
          {filteredData.length} data
        </p>
        <div className="flex gap-1 items-center">
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
