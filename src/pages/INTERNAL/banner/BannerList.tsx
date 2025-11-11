import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useBannerInternal } from "@/hooks/internal/useBannerInternal";
import type { BannerModel } from "@/models/internal/BannerModel";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteBanner,
  updateBanner,
} from "@/services/internal/bannerInternalService";
import useDebouncedValue from "@/hooks/internal/useDebouncedValue";

/**
 * BannerList - List view styled to match provided design (image 10)
 */
export default function BannerList() {
  const { banners, loading, error, refetch } = useBannerInternal();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  // UI states for per-row operations (toggle loading, menu open)
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

  // client-side filter
  const filtered = useMemo(() => {
    if (!debouncedQuery) return banners ?? [];
    const q = debouncedQuery.toLowerCase();
    return (banners ?? []).filter(
      (b) =>
        (b.title ?? "").toLowerCase().includes(q) ||
        (b.description ?? "").toLowerCase().includes(q) ||
        (b.id ?? "").toLowerCase().includes(q)
    );
  }, [banners, debouncedQuery]);

  React.useEffect(() => setPage(1), [debouncedQuery]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // const formatDate = (s?: string) =>
  //   s ? new Date(s).toLocaleDateString("id-ID") : "-";
  const truncate = (s?: string, n = 70) =>
    s && s.length > n ? s.slice(0, n - 3) + "..." : s ?? "-";
  const shortId = (id?: string) =>
    id ? `IDX${id.replace(/-/g, "").slice(0, 16)}` : "-";

  const handleDelete = (b: BannerModel) => {
    Swal.fire({
      title: "Hapus Banner",
      text: `Yakin menghapus banner "${b.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteBanner(b.id);
          Swal.fire({
            icon: "success",
            title: "Terhapus",
            text: "Banner berhasil dihapus",
          });
          refetch();
        } catch (err: any) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: err?.message ?? "Gagal menghapus banner",
          });
        }
      }
    });
  };

  const handleToggle = async (b: BannerModel) => {
    const newStatus = !b.isActive;
    const statusText = newStatus ? "mengaktifkan" : "menonaktifkan";
    const statusTitle = newStatus ? "Aktifkan Banner" : "Nonaktifkan Banner";

    Swal.fire({
      title: statusTitle,
      text: `Yakin ingin ${statusText} banner "${b.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
      confirmButtonColor: newStatus ? "#3085d6" : "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setTogglingId(b.id);
        try {
          await updateBanner(b.id, { isActive: newStatus });
          await refetch();
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Banner berhasil ${
              newStatus ? "diaktifkan" : "dinonaktifkan"
            }`,
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err: any) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: err?.message ?? "Gagal mengubah status",
          });
        } finally {
          setTogglingId(null);
        }
      }
    });
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul atau isi banner"
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/internal/banners/create")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Banner
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="text-left px-6 py-4 text-xs text-gray-500">ID</th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                GAMBAR
              </th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">ISI</th>
              <th className="text-left px-6 py-4 text-xs text-gray-500">
                STATUS
              </th>
              <th className="text-center px-6 py-4 text-xs text-gray-500">
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-6 py-4 align-top text-sm text-gray-700">
                  {shortId(b.id)}
                </td>
                <td className="px-6 py-4 align-top">
                  {b.bannerUrl ? (
                    <img
                      src={b.bannerUrl}
                      alt={b.title}
                      className="w-40 h-20 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-40 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="text-sm text-gray-700 font-medium">
                    {b.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {truncate(b.description, 120)}
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={Boolean(b.isActive)}
                        onChange={() => handleToggle(b)}
                        disabled={togglingId === b.id}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm text-gray-600">
                        {b.isActive ? "Active" : "Inactive"}
                      </span>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 align-top text-center relative">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() =>
                        setMenuOpenFor(menuOpenFor === b.id ? null : b.id)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                      aria-label="menu"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {menuOpenFor === b.id && (
                    <div className="absolute right-4 mt-2 bg-white border rounded shadow-md z-20">
                      <button
                        onClick={() => {
                          setMenuOpenFor(null);
                          navigate(`/internal/banners/edit/${b.id}`);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpenFor(null);
                          handleDelete(b);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Tidak ada banner
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > rowsPerPage && (
        <div className="flex items-center justify-between text-sm mt-3">
          <div className="text-gray-600">
            Menampilkan {totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1} -{" "}
            {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} data
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
