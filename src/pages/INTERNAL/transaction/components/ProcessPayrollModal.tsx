import { useState } from "react";
import { X, Wallet } from "lucide-react";
import type { TransactionModel } from "@/models/internal/TransactionModel";

interface ProcessPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionModel;
  onConfirm: (isApproved: boolean, reason?: string) => Promise<void>;
}

function formatCurrency(amount?: string | number) {
  if (!amount) return "-";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return String(amount);
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { 
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function ProcessPayrollModal({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}: ProcessPayrollModalProps) {
  const [confirmation, setConfirmation] = useState<"berhasil" | "gagal" | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!confirmation) {
      window.alert("Silakan pilih konfirmasi pembayaran");
      return;
    }

    if (confirmation === "gagal" && !reason.trim()) {
      window.alert("Silakan isi alasan pembayaran gagal");
      return;
    }

    setLoading(true);
    try {
      await onConfirm(confirmation === "berhasil", reason);
      onClose();
    } catch (error) {
      console.error("Error processing payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setConfirmation(null);
      setReason("");
      onClose();
    }
  };

  const userName = transaction.user 
    ? `${transaction.user.firstName ?? ""} ${transaction.user.lastName ?? ""}`.trim() 
    : "Unknown User";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between rounded-t-2xl">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Payroll {userName}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{formatDate(transaction.job?.shiftIn)}</span>
                <span>•</span>
                <span>{transaction.company?.name ?? "Unknown"}</span>
                <span>•</span>
                <span>{transaction.job?.role?.role ?? "-"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Nominal Payroll */}
          <div className={`${confirmation === "gagal" ? "border-2 border-blue-500 rounded-lg p-4" : ""}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Nominal Payroll</h3>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Jumlah</div>
              <div className="text-xl font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          </div>

          {/* Tujuan (Only show in negative flow with border) */}
          {confirmation === "gagal" && (
            <div className="border-2 border-blue-500 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Penerima</h3>
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{userName.toUpperCase()}</div>
                <div className="text-sm text-gray-500">
                  BSI - {transaction.user?.userBank ?? "1234567891011"}
                </div>
              </div>
            </div>
          )}

          {/* Tujuan (Show without border in positive flow) */}
          {confirmation !== "gagal" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tujuan</h3>
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{userName.toUpperCase()}</div>
                <div className="text-sm text-gray-500">
                  BSI - {transaction.user?.userBank ?? "1234567891011"}
                </div>
              </div>
            </div>
          )}

          {/* Konfirmasi Pembayaran */}
          <div className={`${confirmation === "gagal" ? "border-2 border-blue-500 rounded-lg p-4" : ""}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Konfirmasi Pembayaran
            </h3>
            <div className="space-y-2">
              {/* Ya, pembayaran berhasil */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="confirmation"
                  value="berhasil"
                  checked={confirmation === "berhasil"}
                  onChange={(e) => {
                    setConfirmation(e.target.value as "berhasil");
                    setReason("");
                  }}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Ya, pembayaran berhasil</span>
              </label>

              {/* Tidak, pembayaran gagal */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="confirmation"
                  value="gagal"
                  checked={confirmation === "gagal"}
                  onChange={(e) => setConfirmation(e.target.value as "gagal")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Tidak, pembayaran gagal</span>
              </label>

              {/* Alasan (if gagal) */}
              {confirmation === "gagal" && (
                <div className="mt-3 ml-6">
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={true}
                      readOnly
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Alasan :</span>
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Nomor rekening tidak ditemukan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Info Text */}
          <div className="text-xs text-gray-400 leading-relaxed">
            Sebelum melanjutkan, pastikan Anda telah mengirim upah kepada pekerja melalui data rekening penerima diatas. 
            Jika terdapat kesalahan data rekening bank atau lainnya Anda dapat menghubungi pekerja melalui kontak yang 
            tertera pada halaman detail payroll.
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between gap-3 rounded-b-2xl">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !confirmation}
            className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
}