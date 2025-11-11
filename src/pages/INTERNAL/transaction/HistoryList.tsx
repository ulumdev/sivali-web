// import React, { useState, useMemo } from "react";
// import {
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   DownloadCloud,
// } from "lucide-react";
// import { useTransactionFetcher } from "@/hooks/internal/useTransactionInternal";
// import type { TransactionModel } from "@/models/internal/TransactionModel";
// import { useNavigate } from "react-router-dom";
// import useDebouncedValue from "@/hooks/internal/useDebouncedValue";
// // import StatusBadge from "@/pages/internal/transaction/TopupList"; // adapt imports

// function formatDate(s?: string) {
//   if (!s) return "-";
//   return new Date(s).toLocaleDateString("id-ID");
// }
// function formatCurrency(a?: string) {
//   if (!a) return "-";
//   const n = Number(a);
//   if (Number.isNaN(n)) return a;
//   return "Rp " + n.toLocaleString("id-ID");
// }
// function StatusBadge({ status }: { status?: string }) {
//   if (!status)
//     return <span className="px-2 py-1 rounded text-xs bg-gray-100">-</span>;
//   const s = status.toUpperCase();
//   if (s === "COMPLETED")
//     return (
//       <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
//         {s}
//       </span>
//     );
//   if (s === "CANCELLED" || s === "FAILED")
//     return (
//       <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700">
//         {s}
//       </span>
//     );
//   return (
//     <span className="px-2 py-1 rounded text-xs bg-amber-50 text-amber-700">
//       {s}
//     </span>
//   );
// }

// function Pagination({
//   totalItems,
//   page,
//   rowsPerPage,
//   onPageChange,
// }: {
//   totalItems: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange: (p: number) => void;
// }) {
//   const total = Math.max(1, Math.ceil(totalItems / rowsPerPage));
//   const pages: (number | string)[] = [];
//   const maxVisible = 5;
//   if (total <= maxVisible) {
//     for (let i = 1; i <= total; i++) pages.push(i);
//   } else {
//     if (page <= 3) pages.push(1, 2, 3, 4, "...", total);
//     else if (page >= total - 2)
//       pages.push(1, "...", total - 3, total - 2, total - 1, total);
//     else pages.push(1, "...", page - 1, page, page + 1, "...", total);
//   }

//   return (
//     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
//       <p className="text-center sm:text-left">
//         Menampilkan {totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1} -{" "}
//         {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} data
//       </p>

//       <div className="flex justify-center sm:justify-end gap-1 items-center">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         {pages.map((p, idx) =>
//           p === "..." ? (
//             <span key={idx} className="px-2">
//               ...
//             </span>
//           ) : (
//             <button
//               key={idx}
//               onClick={() => onPageChange(Number(p))}
//               className={`px-3 py-1 border rounded ${
//                 page === p
//                   ? "bg-blue-600 text-white"
//                   : "bg-white hover:bg-gray-100"
//               }`}
//             >
//               {p}
//             </button>
//           )
//         )}

//         <button
//           onClick={() => onPageChange(total)}
//           disabled={page === total}
//           className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function HistoryList() {
//   const navigate = useNavigate();
//   const { data, loading, error } = useTransactionFetcher("all", {
//     page: 1,
//     limit: 200,
//   });
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebouncedValue(query, 300);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   const filtered = useMemo(() => {
//     if (!debouncedQuery) return data;
//     const q = debouncedQuery.toLowerCase();
//     return (data ?? []).filter((t) => {
//       const ref = (t.reference ?? "").toLowerCase();
//       const type = (t.type ?? "").toLowerCase();
//       const company = (t.company?.name ?? "").toLowerCase();
//       const user = (
//         (t.user?.firstName ?? "") +
//         " " +
//         (t.user?.lastName ?? "")
//       ).toLowerCase();
//       const amount = (t.amount ?? "").toLowerCase();
//       const status = (t.status ?? "").toLowerCase();
//       return (
//         ref.includes(q) ||
//         type.includes(q) ||
//         company.includes(q) ||
//         user.includes(q) ||
//         amount.includes(q) ||
//         status.includes(q)
//       );
//     });
//   }, [data, debouncedQuery]);

//   React.useEffect(() => setPage(1), [debouncedQuery]);

//   const totalItems = filtered.length;
//   const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-semibold">List Transaction - History</h2>
//         <button className="flex items-center gap-2 px-3 py-2 border rounded bg-white">
//           <DownloadCloud className="w-4 h-4" /> Export
//         </button>
//       </div>

//       <div className="relative w-full md:w-1/3">
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Cari reference, company, user..."
//           className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
//         />
//         <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto border rounded-lg shadow-sm">
//             <table className="min-w-full border-collapse">
//               <thead className="bg-gray-50 text-left text-sm font-medium border-b">
//                 <tr>
//                   <th className="px-4 py-3">Reference</th>
//                   <th className="px-4 py-3">Type</th>
//                   <th className="px-4 py-3">Amount</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Company</th>
//                   <th className="px-4 py-3">User</th>
//                   <th className="px-4 py-3">Created</th>
//                   <th className="px-4 py-3 text-center">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm bg-white">
//                 {pageData.map((t: TransactionModel) => (
//                   <tr key={t.id} className="hover:bg-indigo-50 border-t">
//                     <td className="px-4 py-3">{t.reference ?? t.id}</td>
//                     <td className="px-4 py-3">{t.type ?? "-"}</td>
//                     <td className="px-4 py-3 font-medium">
//                       {formatCurrency(t.amount)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <StatusBadge status={t.status} />
//                     </td>
//                     <td className="px-4 py-3">{t.company?.name ?? "-"}</td>
//                     <td className="px-4 py-3">
//                       {t.user
//                         ? `${t.user.firstName ?? ""} ${t.user.lastName ?? ""}`
//                         : "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       {formatDate(t.createdAt)}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() =>
//                           navigate(`/internal/transactions/${t.id}`)
//                         }
//                         className="p-1 hover:bg-gray-100 rounded"
//                       >
//                         <Eye className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {pageData.length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="text-center py-6 text-gray-500">
//                       Tidak ada data
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* reuse Pagination component from PayrollList */}
//           <Pagination totalItems={totalItems} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} />
//         </>
//       )}
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  DownloadCloud,
} from "lucide-react";
import { useTransactionFetcher } from "@/hooks/internal/useTransactionInternal";
import type { TransactionModel } from "@/models/internal/TransactionModel";
import { useNavigate } from "react-router-dom";
import useDebouncedValue from "@/hooks/internal/useDebouncedValue";

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function formatCurrency(a?: string) {
  if (!a) return "-";
  const n = Number(a);
  if (Number.isNaN(n)) return a;
  // format with thousand separators (Rp)
  return "Rp " + n.toLocaleString("id-ID");
}

function TypeDot({ type }: { type?: string }) {
  const t = (type ?? "").toLowerCase();
  const map: Record<string, string> = {
    payroll: "bg-red-500",
    payment: "bg-green-500",
    topup: "bg-blue-600",
    default: "bg-gray-400",
  };
  const color = map[t] ?? map.default;
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color} inline-block`} />
      <span className="text-sm text-gray-700 capitalize">{type ?? "-"}</span>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status)
    return <span className="px-2 py-1 rounded text-xs bg-gray-100">-</span>;
  const s = status.toLowerCase();
  if (s === "completed" || s === "success" || s === "berhasil")
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">
        Berhasil
      </span>
    );
  if (s === "cancelled" || s === "failed")
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-700">
        Gagal
      </span>
    );
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-700">
      {status}
    </span>
  );
}

function Pagination({
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
}: {
  totalItems: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (p: number) => void;
}) {
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
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm text-gray-600">
        Menampilkan {totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1} -{" "}
        {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} data
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-3 py-2 text-sm text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(Number(p))}
              className={`px-3 py-2 border rounded ${page === p ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"}`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(total)}
          disabled={page === total}
          className="px-3 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function HistoryList() {
  const navigate = useNavigate();
  // fetch "all" transactions; keep limit high to allow client search
  const { data, loading, error } = useTransactionFetcher("all", {
    page: 1,
    limit: 200,
  });

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = useMemo(() => {
    if (!debouncedQuery) return data;
    const q = debouncedQuery.toLowerCase();
    return (data ?? []).filter((t) => {
      const ref = (t.reference ?? "").toLowerCase();
      const type = (t.type ?? "").toLowerCase();
      const company = (t.company?.name ?? "").toLowerCase();
      const user = (
        (t.user?.firstName ?? "") +
        " " +
        (t.user?.lastName ?? "")
      ).toLowerCase();
      const amount = (t.amount ?? "").toLowerCase();
      const status = (t.status ?? "").toLowerCase();
      return (
        ref.includes(q) ||
        type.includes(q) ||
        company.includes(q) ||
        user.includes(q) ||
        amount.includes(q) ||
        status.includes(q)
      );
    });
  }, [data, debouncedQuery]);

  React.useEffect(() => setPage(1), [debouncedQuery]);

  const totalItems = filtered.length;
  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">List Transaction</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border rounded bg-white hover:bg-gray-50 text-sm">
            <DownloadCloud className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* search + filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Nama, Perusahaan, Role"
            className="w-full pl-10 pr-3 py-3 border rounded-lg text-sm bg-white"
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50">Pilih Status</button>
          <button className="px-3 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50">Export</button>
        </div>
      </div>

      {/* table card */}
      <div className="overflow-x-auto">
        <div className="bg-white border rounded-lg shadow-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">TANGGAL</th>
                <th className="px-6 py-4">TRANSAKSI</th>
                <th className="px-6 py-4">TIPE</th>
                <th className="px-6 py-4">JUMLAH</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody className="text-sm bg-white">
              {loading ? (
                // simple loading rows
                Array.from({ length: rowsPerPage }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300">Loading...</td>
                    <td className="px-6 py-6 text-gray-300 text-center">—</td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-red-500">{error}</td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Tidak ada data</td>
                </tr>
              ) : (
                pageData.map((t: TransactionModel) => (
                  <tr key={t.id} className="border-t hover:bg-indigo-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{(t.id ?? "")}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(t.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t.reference ? `${t.reference}` : (t.description ?? "-")}</td>
                    <td className="px-6 py-4 text-sm"><TypeDot type={t.type} /></td>
                    <td className="px-6 py-4 text-sm font-medium">{formatCurrency(t.amount)}</td>
                    <td className="px-6 py-4 text-sm"><StatusBadge status={t.status} /></td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/internal/transaction/history/${t.id}`)}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label={`Lihat detail ${t.reference ?? t.id}`}
                      >
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-end">
        <Pagination totalItems={totalItems} page={page} rowsPerPage={rowsPerPage} onPageChange={setPage} />
      </div>
    </div>
  );
}