import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Eye, DownloadCloud } from "lucide-react";
import { useTransactionFetcher } from "@/hooks/internal/useTransactionInternal";
import type { TransactionModel } from "@/models/internal/TransactionModel";
import { useNavigate } from "react-router-dom";
import useDebouncedValue from "@/hooks/internal/useDebouncedValue";
// import StatusBadge from "@/pages/internal/transaction/TopupList"; // or copy StatusBadge into a shared file

// For simplicity reuse same component structure as TopupList but source="payroll"
function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID");
}
function formatCurrency(a?: string) {
  if (!a) return "-";
  const n = Number(a);
  if (Number.isNaN(n)) return a;
  return "Rp " + n.toLocaleString("id-ID");
}
function StatusBadge({ status }: { status?: string }) {
  if (!status) return <span className="px-2 py-1 rounded text-xs bg-gray-100">-</span>;
  const s = status.toUpperCase();
  if (s === "COMPLETED") return <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">{s}</span>;
  if (s === "CANCELLED" || s === "FAILED") return <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700">{s}</span>;
  return <span className="px-2 py-1 rounded text-xs bg-amber-50 text-amber-700">{s}</span>;
}

export default function PayrollList() {
  const navigate = useNavigate();
  const { data, loading, error } = useTransactionFetcher("payroll", { page: 1, limit: 100 });
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = useMemo(() => {
    if (!debouncedQuery) return data;
    const q = debouncedQuery.toLowerCase();
    return (data ?? []).filter((t) => {
      const ref = (t.reference ?? "").toLowerCase();
      const company = (t.company?.name ?? "").toLowerCase();
      const user = ((t.user?.firstName ?? "") + " " + (t.user?.lastName ?? "")).toLowerCase();
      const amount = (t.amount ?? "").toLowerCase();
      const status = (t.status ?? "").toLowerCase();
      return ref.includes(q) || company.includes(q) || user.includes(q) || amount.includes(q) || status.includes(q);
    });
  }, [data, debouncedQuery]);

  React.useEffect(() => setPage(1), [debouncedQuery]);

  const totalItems = filtered.length;
  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">List Transaction - Payroll</h2>
        <button className="flex items-center gap-2 px-3 py-2 border rounded bg-white">
          <DownloadCloud className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="relative w-full md:w-1/3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari reference, company, user..." className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm" />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
      </div>

      {loading ? <p className="text-gray-500">Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
        <>
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50 text-left text-sm font-medium border-b">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Perusahaan</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Jumlah</th>
                  <th className="px-4 py-3">Status</th>
                  {/* <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Created</th> */}
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm bg-white">
                {pageData.map((t: TransactionModel) => (
                  <tr key={t.id} className="hover:bg-indigo-50 border-t">
                    <td className="px-4 py-3">{t.id ?? '-'}</td>
                    <td className="px-4 py-3">{formatDate(t.createdAt)}</td>
                    <td className="px-4 py-3">{t.user ? `${t.user.firstName ?? ""} ${t.user.lastName ?? ""}` : "-"}</td>
                    <td className="px-4 py-3">{t.company?.name ?? "-"}</td>
                    <td className="px-4 py-3">{t.type ?? "-"}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(t.amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    {/* <td className="px-4 py-3">{t.company?.name ?? "-"}</td>
                    <td className="px-4 py-3">{t.user ? `${t.user.firstName ?? ""} ${t.user.lastName ?? ""}` : "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(t.createdAt)}</td> */}
                    <td className="px-4 py-3 text-center"><button onClick={() => navigate(`/internal/transaction/payroll/${t.id}`)} className="p-1 hover:bg-gray-100 rounded"><Eye className="w-4 h-4 text-gray-600" /></button></td>
                  </tr>
                ))}
                {pageData.length === 0 && (<tr><td colSpan={7} className="text-center py-6 text-gray-500">Tidak ada data</td></tr>)}
              </tbody>
            </table>
          </div>

          <Pagination totalItems={totalItems} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

// reuse Pagination from TopupList (you can move Pagination component to shared file if preferred)
function Pagination({ totalItems, page, rowsPerPage, onPageChange }: any) {
  const total = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const pages: (number | string)[] = [];
  const maxVisible = 5;
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (page <= 3) pages.push(1, 2, 3, 4, "...", total);
    else if (page >= total - 2) pages.push(1, "...", total - 3, total - 2, total - 1, total);
    else pages.push(1, "...", page - 1, page, page + 1, "...", total);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
      <p className="text-center sm:text-left">
        Menampilkan {totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1} - {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} data
      </p>

      <div className="flex justify-center sm:justify-end gap-1 items-center">
        <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
        {pages.map((p, idx) => p === "..." ? <span key={idx} className="px-2">...</span> : <button key={idx} onClick={() => onPageChange(Number(p))} className={`px-3 py-1 border rounded ${page === p ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}>{p}</button>)}
        <button onClick={() => onPageChange(total)} disabled={page === total} className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}