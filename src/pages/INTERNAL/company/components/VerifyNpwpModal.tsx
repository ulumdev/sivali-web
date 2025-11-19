import { useState } from "react";
import { X } from "lucide-react";

interface VerifyNPWPModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  npwpNumber?: string;
  npwpImageUrl?: string;
  onVerify: (isApproved: boolean, reason?: string) => Promise<void>;
}

export default function VerifyNPWPModal({
  isOpen,
  onClose,
  companyName,
  npwpNumber,
  npwpImageUrl,
  onVerify,
}: VerifyNPWPModalProps) {
  const [verification, setVerification] = useState<"sesuai" | "tidak-sesuai" | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!verification) {
      return;
    }

    if (verification === "tidak-sesuai" && !reason.trim()) {
      setError("Silakan isi alasan penolakan");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onVerify(verification === "sesuai", reason);
      // Reset state on success
      setVerification(null);
      setReason("");
      onClose();
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat memverifikasi NPWP");
      console.error("Error verifying NPWP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setVerification(null);
      setReason("");
      setError(null);
      onClose();
    }
  };

  const fileName = `NPWP_${companyName.slice(0, 6).toUpperCase()}.jpg`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">{fileName}</h2>
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
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          {/* NPWP Image Preview */}
          <div className="flex justify-center">
            {npwpImageUrl ? (
              <img
                src={npwpImageUrl}
                alt="NPWP Preview"
                className="w-full max-w-sm rounded-lg border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-full max-w-sm h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300 flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <div className="text-xs font-semibold text-blue-800">
                    KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
                  </div>
                  <div className="text-xs text-blue-700">
                    DIREKTORAT JENDERAL PAJAK
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-blue-900">
                    <div>NPWP : XX.YYY.YYY-Z.XXX.YYY</div>
                    <div>Nama : ?</div>
                    <div>NIK : XXXXX-X.XXXXXX.X</div>
                    <div>Alamat : Jl. _____ No. ___ RT. ___ RW. ___</div>
                    <div>Kel. _____ Kec. _____ Kab. _____</div>
                    <div>Prop. _____</div>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-blue-800">
                    KPP : Pratama ABC
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NPWP Number */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">NPWP</h3>
            <p className="text-2xl font-bold text-gray-900 tracking-wide">
              {npwpNumber ?? "51.710.109-0.006.777"}
            </p>
          </div>

          {/* Verification Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Verifikasi
            </h3>
            <div className="space-y-3">
              {/* Sesuai */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="verification"
                  value="sesuai"
                  checked={verification === "sesuai"}
                  onChange={(e) => {
                    setVerification(e.target.value as "sesuai");
                    setReason("");
                    setError(null);
                  }}
                  disabled={loading}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Sesuai
                </span>
              </label>

              {/* Tidak Sesuai */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="verification"
                  value="tidak-sesuai"
                  checked={verification === "tidak-sesuai"}
                  onChange={(e) => {
                    setVerification(e.target.value as "tidak-sesuai");
                    setError(null);
                  }}
                  disabled={loading}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Tidak Sesuai
                </span>
              </label>

              {/* Alasan (if tidak sesuai) */}
              {verification === "tidak-sesuai" && (
                <div className="ml-7 mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan :
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      setError(null);
                    }}
                    disabled={loading}
                    placeholder="Contoh: Nomor NPWP tidak sesuai dengan data yang terdaftar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50 disabled:opacity-50"
                    rows={3}
                  />
                </div>
              )}
            </div>
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
            disabled={loading || !verification}
            className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-colors ${
              verification && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } disabled:opacity-50`}
          >
            {loading ? "Memproses..." : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
}