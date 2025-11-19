import { X, FileCheck } from "lucide-react";

interface RevisionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

export default function RevisionConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: RevisionConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        {/* Header with Close Button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
              <FileCheck className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            Revisi Berkas
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Apakah Anda yakin ingin mengirim revisi berkas ini? Pastikan semua
            detail sudah benar sebelum melanjutkan
          </p>
        </div>

        {/* Footer - Actions */}
        <div className="px-8 pb-8 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Verifikasi"}
          </button>
        </div>
      </div>
    </div>
  );
}