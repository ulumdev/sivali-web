import { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useTransactionDetail } from "@/hooks/internal/useTransactionIntDetail";
// import type { TransactionModel } from "@/models/internal/TransactionModel";

/**
 * TransactionDetail
 * Single detail page that adapts layout based on data.type:
 * - PAYROLL: shows attendance, report, company & worker bank info
 * - TOPUP: shows company & user bank info
 * - PAYMENT: shows job posting details (if available)
 *
 * Status headline adjusts to success/fail/in-progress based on data.status
 */

function formatDateTime(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
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
  return "Rp " + n.toLocaleString("id-ID");
}

function StatusPill({ status }: { status?: string }) {
  const s = (status ?? "").toLowerCase();
  if (s === "completed" || s === "success" || s === "berhasil")
    return <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">Transaksi Berhasil</span>;
  if (s === "cancelled" || s === "failed")
    return <span className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600">Transaksi Gagal</span>;
  return <span className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-700">Dalam Proses</span>;
}

export default function HistoryDetail(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useTransactionDetail(id ?? null);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-gray-500">Transaksi tidak ditemukan</p>;

  const type = (data.type ?? "").toLowerCase();

  // Helpers to render bank info blocks (company & user)
  const CompanyBankBlock = () => (
    <div className="bg-white rounded-lg border p-4 w-full">
      <div className="text-xs text-gray-500 mb-2">Data Rekening Perusahaan</div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border text-gray-400">🏢</div>
        <div>
          <div className="font-medium">{data.company?.name ?? "-"}</div>
          <div className="text-xs text-gray-500">{data.company?.email ?? "-"}</div>
          <div className="text-xs text-gray-400 mt-2">
            {/* if companyBankInformation exists show accountOwner and accountNumber */}
            {data.company?.companyBankInformation ? (
              <>
                {data.company.companyBankInformation.accountOwner ?? "-"} &nbsp;•&nbsp; {data.company.companyBankInformation.accountNumber ?? "-"}
              </>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const UserBankBlock = () => (
    <div className="bg-white rounded-lg border p-4 w-full">
      <div className="text-xs text-gray-500 mb-2">Data Rekening Pekerja</div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border text-gray-400">👤</div>
        <div>
          <div className="font-medium">{data.user ? `${data.user.firstName ?? ""} ${data.user.lastName ?? ""}` : "-"}</div>
          <div className="text-xs text-gray-500">{data.user?.email ?? "-"}</div>
          <div className="text-xs text-gray-400 mt-2">
            {/* user bank if available */}
            {data.user?.userBank ? (
              <>
                {data.user.userBank.accountOwner ?? "-"} &nbsp;•&nbsp; {data.user.userBank.accountNumber ?? "-"}
              </>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{data.company?.name ?? data.user?.firstName ?? "Transaksi"}</div>
          <div className="text-sm text-gray-500">{data.reference ?? data.id}</div>
        </div>

        <div className="flex items-center gap-4">
          <StatusPill status={data.status} />
          {data.jobId && (
            <a href={`/internal/job-postings/${data.jobId}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 inline-flex items-center gap-1">
              Lihat Job Posting <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Transaction main card */}
      <div className="bg-white rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-gray-500">ID</div>
            <div className="font-medium">{(data.id ?? "").replace(/-/g, "").slice(0, 18).toUpperCase()}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Tanggal</div>
            <div className="font-medium">{formatDateTime(data.createdAt)}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Jumlah</div>
            <div className="font-medium">{formatCurrency(data.amount)}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mt-3">Tipe</div>
            <div className="font-medium">{data.type ?? "-"}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mt-3">Nama Perusahaan</div>
            <div className="font-medium">{data.company?.name ?? "-"}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mt-3">Keterangan</div>
            <div className="font-medium">{data.description ?? "-"}</div>
          </div>
        </div>
      </div>

      {/* conditional sections by type */}
      {type === "payroll" && (
        <>
          {/* Payroll: show company & worker bank, attendance & report */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompanyBankBlock />
            <UserBankBlock />
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm font-semibold mb-3">Absensi</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500">Absen Datang</div>
                <div className="font-medium">{data.jobAttendanceList?.checkIn ?? "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Absen Pulang</div>
                <div className="font-medium">{data.jobAttendanceList?.checkOut ?? "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-medium">
                  {data.jobAttendanceList?.status ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">{data.jobAttendanceList.status}</span>
                  ) : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Reports - if any, show sample layout */}
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm font-semibold mb-3">Laporan</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-indigo-50 p-3 rounded">
                <div className="text-xs text-gray-500">Absen Datang</div>
                <div className="text-sm font-medium mt-2">{data.jobAttendanceList?.checkIn ?? "-"}</div>
                <div className="text-xs text-gray-400 mt-2">Keterangan: {data.jobAttendanceList?.lateReason ?? "-"}</div>
                {/* proof / bukti */}
                {data.proofUrl && (
                  <div className="mt-3">
                    <a href={data.proofUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 inline-flex items-center gap-2">
                      Lihat Bukti <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-indigo-50 p-3 rounded">
                <div className="text-xs text-gray-500">Absen Pulang</div>
                <div className="text-sm font-medium mt-2">{data.jobAttendanceList?.checkOut ?? "-"}</div>
                <div className="text-xs text-gray-400 mt-2">Keterangan: -</div>
                {data.proofUrl && (
                  <div className="mt-3">
                    <a href={data.proofUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 inline-flex items-center gap-2">
                      Lihat Bukti <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {type === "topup" && (
        <>
          {/* Topup: show company & user bank info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompanyBankBlock />
            <UserBankBlock />
          </div>

          {/* Proof */}
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm font-semibold mb-3">Bukti Topup</div>
            {data.proofUrl ? (
              <div className="flex items-center gap-4">
                <a href={data.proofUrl} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center gap-2">
                  Lihat Bukti <ExternalLink size={14} />
                </a>
                <div className="text-xs text-gray-500">{data.proofUrl}</div>
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada bukti</p>
            )}
          </div>
        </>
      )}

      {type === "payment" && (
        <>
          {/* Payment: show main data + job posting detail if available */}
          <div className="bg-white rounded-lg border p-4">
            <div className="text-sm font-semibold mb-3">Detail Job Posting</div>
            {data.job ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">ID</div>
                  <div className="font-medium">{data.job.id ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Role</div>
                  <div className="font-medium">{data.job.role?.role ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Jumlah Pekerja</div>
                  <div className="font-medium">{data.job.workerNumber ?? "-"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mt-3">Upah</div>
                  <div className="font-medium">{data.job.salary ? formatCurrency(String(data.job.salary)) : "-"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mt-3">Tanggal Kerja</div>
                  <div className="font-medium">{data.job.shiftIn ? formatDate(data.job.shiftIn) : "-"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mt-3">Jam Kerja</div>
                  <div className="font-medium">{data.job.shiftIn && data.job.shiftOut ? `${new Date(data.job.shiftIn).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - ${new Date(data.job.shiftOut).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}` : "-"}</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Detail job posting tidak tersedia</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}