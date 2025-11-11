import { useMemo, useState, useEffect } from "react";
import {
  Search,
  DownloadCloud,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useVerifiedCompanies } from "@/hooks/internal/useCompanyInternal";
import type { CompanyModel } from "@/models/internal/CompanyModel";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import BlockCompanyModal from "./components/BlockCompanyModal";

/**
 * CompanyVerifiedInt - modified to:
 * - show search + status filter + export controls
 * - action menu with "Lihat Detail" and "Blokir"
 * - open BlockCompanyModal and call API on confirm
 * - display transient banner after successful block
 */

export default function CompanyVerifiedInt() {
  const navigate = useNavigate();
  const location = useLocation() as Location<{ bannerMessage?: string }>;
  const { companies, loading, error, refetch } = useVerifiedCompanies();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // menu/UI state
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [companyToBlock, setCompanyToBlock] = useState<CompanyModel | null>(null);
  // const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // banner state initialized from navigation state (if any)
  const [bannerMessage, setBannerMessage] = useState<string | null>(location.state?.bannerMessage ?? null);

  // clear history state so banner doesn't persist on refresh/back
  useEffect(() => {
    if (bannerMessage) {
      // replace current history state with empty state (keeps URL same)
      navigate(location.pathname, { replace: true, state: {} });
      // auto-hide banner after 6s
      const id = setTimeout(() => setBannerMessage(null), 6000);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerMessage]);

  // Filter
  const filteredData = useMemo(() => {
    const q = (search ?? "").toLowerCase().trim();
    return (companies ?? []).filter((company) => {
      if (!q) return true;
      const name = company.name ?? "";
      const email = company.email ?? "";
      const industry = company.companyProfile?.industry ?? "";
      return (
        name.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        industry.toLowerCase().includes(q)
      );
    });
  }, [companies, search]);

  // Pagination calculations with guards
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  // clamp currentPage if it becomes out of range
  if (currentPage > totalPages) setCurrentPage(totalPages);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const openBlockModal = (company: CompanyModel) => {
    setCompanyToBlock(company);
    setBlockModalOpen(true);
    setMenuOpenFor(null);
  };

  const handleBlocked = (_id: string, name?: string | null) => {
    // show banner and refetch list
    setBannerMessage(`${name ?? "Perusahaan"} telah diblokir`);
    // refresh data
    refetch?.();
    // auto-hide banner after some time
    setTimeout(() => setBannerMessage(null), 6000);
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Banner message */}
      {bannerMessage && (
        <div className="rounded border border-red-200 bg-red-50 text-red-700 px-4 py-3">
          {bannerMessage}
        </div>
      )}

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            aria-label="Cari perusahaan"
            placeholder="Cari Nama Perusahaan atau Jenis Industri"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100">Pilih Status</button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
            <span>Export</span>
            <DownloadCloud className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-white text-left text-sm font-medium border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Jenis Industri</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Terakhir Login</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white text-left">
            {paginatedData.map((company: CompanyModel) => (
              <tr key={company.id} className="hover:bg-indigo-50 border-t">
                <td className="px-4 py-3 font-medium">{company.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-4 py-3 font-medium">{company.name}</td>
                <td className="px-4 py-3 text-gray-600">{company.email}</td>
                <td className="px-4 py-3">{company.companyProfile?.industry ?? "-"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-600">
                    Verifikasi Selesai
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {company.lastLoginAt ? new Date(company.lastLoginAt).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                </td>
                <td className="px-4 py-3 text-center relative">
                  <button
                    onClick={() => setMenuOpenFor(menuOpenFor === company.id ? null : company.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Aksi"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>

                  {menuOpenFor === company.id && (
                    <div className="absolute right-4 mt-2 bg-white border rounded shadow-md z-10">
                      <button
                        onClick={() => {
                          setMenuOpenFor(null);
                          navigate(`/internal/companies/verified/${company.id}`);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => openBlockModal(company)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                      >
                        Blokir
                      </button>
                    </div>
                  )}
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
          {filteredData.length === 0
            ? "Menampilkan 0 dari 0"
            : `Menampilkan ${startIndex + 1} - ${Math.min(startIndex + rowsPerPage, filteredData.length)} dari ${filteredData.length} data`}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Block modal */}
      <BlockCompanyModal
        open={blockModalOpen}
        companyId={companyToBlock?.id ?? null}
        companyName={companyToBlock?.name ?? null}
        onClose={() => setBlockModalOpen(false)}
        onBlocked={(id, name) => handleBlocked(id, name)}
      />
    </div>
  );
}

