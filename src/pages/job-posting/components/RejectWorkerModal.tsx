import { useState } from "react";
import { X } from "lucide-react";

interface RejectWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  workerName?: string;
}

export default function RejectWorkerModal({
  isOpen,
  onClose,
  onConfirm,
  workerName = "Kandidat",
}: RejectWorkerModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error rejecting worker:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-red-500 flex items-center justify-center">
              <X className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            Tolak Kandidat
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Apakah Anda yakin ingin menolak <span className="font-semibold">{workerName}</span> sebagai kandidat?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              onClick={() => !loading && onClose()}
              disabled={loading}
              className="flex-1 px-5 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 px-5 py-3 rounded-lg text-white font-medium transition-colors ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Memproses..." : "Tolak"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}