import { useState } from "react";
import { X, Wallet } from "lucide-react";
import type { TransactionModel } from "@/models/internal/TransactionModel";

interface ProcessTopupModalProps {
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

export default function ProcessTopupModal({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}: ProcessTopupModalProps) {
  const [verification, setVerification] = useState<"sesuai" | "tidak-sesuai" | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!verification) {
      alert("Silakan pilih verifikasi bukti pembayaran");
      return;
    }

    if (verification === "tidak-sesuai" && !reason.trim()) {
      alert("Silakan isi alasan penolakan");
      return;
    }

    setLoading(true);
    try {
      await onConfirm(verification === "sesuai", reason);
      onClose();
    } catch (error) {
      console.error("Error processing topup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setVerification(null);
      setReason("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Top Up {transaction.company?.name ?? "Unknown"}
              </h2>
              <p className="text-sm text-gray-500">FINTECH</p>
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
          {/* Bukti Transfer & Nominal Top Up - 2 Columns */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Bukti Transfer */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bukti Transfer</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {transaction.proofUrl && transaction.proofUrl !== "#" ? (
                  <img
                    src={transaction.proofUrl}
                    alt="Bukti Transfer"
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center space-y-2">
                      <div className="text-blue-600 font-bold text-lg">BRI</div>
                      <div className="text-xs text-gray-500">Transaksi Berhasil</div>
                      <div className="border-t border-gray-200 my-4"></div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Tanggal</span>
                          <span>2024-12-18 14:28 WIB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nomor Referensi</span>
                          <span>413208538024</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sumber Dana</span>
                          <span>12345678901234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nama Pengirim</span>
                          <span>JOHN DOE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bank Tujuan</span>
                          <span>BRI</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nama Tujuan</span>
                          <span>PT SIVALI DIGITAL INDONESIA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rekening</span>
                          <span>0123456789</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 my-4"></div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-blue-600">{formatCurrency(transaction.amount)}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        Simpan bukti ini sebagai konfirmasi pembayaran Anda
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Nominal Top Up & Bank Data */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Nominal Top Up</h3>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Jumlah</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Data Rekening Bank</h3>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Pengirim</div>
                    <div className="text-sm text-gray-900 font-medium">JOHN DOE</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">BSI - 1234567891011</div>
                  </div>
                </div>
              </div>

              {/* Verifikasi Bukti Pembayaran */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Verifikasi Bukti Pembayaran
                </h3>
                <div className="space-y-2">
                  {/* Sesuai */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      value="sesuai"
                      checked={verification === "sesuai"}
                      onChange={(e) => {
                        setVerification(e.target.value as "sesuai");
                        setReason("");
                      }}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Sesuai</span>
                  </label>

                  {/* Tidak Sesuai */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      value="tidak-sesuai"
                      checked={verification === "tidak-sesuai"}
                      onChange={(e) => setVerification(e.target.value as "tidak-sesuai")}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Tidak Sesuai</span>
                  </label>

                  {/* Alasan (if tidak sesuai) */}
                  {verification === "tidak-sesuai" && (
                    <div className="mt-3">
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          checked={true}
                          readOnly
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Alasan :</span>
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Bukti transfer salah, uang belum masuk"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !verification}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
}