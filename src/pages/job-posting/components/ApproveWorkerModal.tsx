import { useState } from "react";
import { Check } from "lucide-react";

interface ApproveWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  workerName?: string;
}

export default function ApproveWorkerModal({
  isOpen,
  onClose,
  onConfirm,
  workerName = "Kandidat",
}: ApproveWorkerModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error approving worker:", error);
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
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            Terima Kandidat
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Apakah Anda yakin ingin menerima <span className="font-semibold">{workerName}</span> sebagai kandidat terpilih?
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
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Memproses..." : "Terima"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}