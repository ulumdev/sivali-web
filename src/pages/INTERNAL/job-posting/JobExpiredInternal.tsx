import { useState } from "react";
import {
  Search,
  DownloadCloud,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInternalExpiredJobPostings } from "@/hooks/internal/useJobPostingInternal";
import type { JobPostingModel } from "../../../models/JobPostingModel";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function JobExpiredInternal() {
  const navigate = useNavigate();
  const { jobsExpired, loading, error } = useInternalExpiredJobPostings();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter berdasarkan pencarian
  const filteredData = (jobsExpired ?? []).filter((job) => {
    const role = job.role?.role ?? "";
    const company = job.companyId ?? "";
    return (
      role.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase())
    );
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
            placeholder="Cari role atau company"
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
          <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white w-full md:w-auto">
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
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tanggal Posting</th>
              <th className="px-4 py-3">Perusahaan</th>
              <th className="px-4 py-3">Role</th>
              {/* <th className="px-4 py-3">Jumlah Pekerja</th> */}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tanggal Kerja</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {paginatedData.map((job: JobPostingModel) => (
              <tr key={job.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3 whitespace-nowrap">{job.id ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      })
                    : "-"}
                </td>
                <td className="px-4 py-3">{job.company?.name ?? "-"}</td>
                <td className="px-4 py-3">{job.role?.role ?? "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-medium",
                      job.isActive === false
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {!job.isActive
                      ? "Expired"
                      : "-"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {job.shiftIn
                  ? new Date(job.shiftIn).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    })
                  : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      navigate(`/internal/job-posting/expired/${job.id}`)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="h-4 w-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
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
          Menampilkan {startIndex + 1} -{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} dari{" "}
          {filteredData.length} data
        </p>
        <div className="flex justify-center sm:justify-end gap-1 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

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
