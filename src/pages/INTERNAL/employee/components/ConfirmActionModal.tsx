import { type ReactNode, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: (payload?: any) => Promise<void> | void;
  showReason?: boolean;
  showDate?: boolean;
};

/**
 * Generic confirm modal with optional reason input and optional date input (for suspendUntil)
 */
export default function ConfirmActionModal({
  open,
  title,
  description,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  danger = false,
  onClose,
  onConfirm,
  showReason = false,
  showDate = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<string>("");

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const payload: any = {};
      if (showReason) payload.reason = reason;
      if (showDate && date) {
        // convert yyyy-mm-dd to ISO end-of-day
        const iso = new Date(date).toISOString();
        payload.suspendUntil = iso;
      }
      await onConfirm(payload);
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Terjadi kesalahan" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30" onClick={() => !loading && onClose()} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="text-3xl">{danger ? "⚠️" : "ℹ️"}</div>
          </div>

          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <div className="text-sm text-gray-600 text-center">{description}</div>}

          {showReason && (
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Alasan (opsional)" className="w-full border rounded p-2 text-sm" rows={3} />
          )}

          {showDate && (
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          )}

          <div className="flex gap-3 w-full">
            <button type="button" onClick={() => !loading && onClose()} className="flex-1 px-4 py-2 rounded bg-gray-100">
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded text-white ${danger ? (loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700") : (loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700")}`}
            >
              {loading ? "Memproses..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}