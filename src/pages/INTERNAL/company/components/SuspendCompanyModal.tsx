import { useState } from "react";
import Swal from "sweetalert2";
import { suspendCompany } from "@/services/internal/companyInternalService";

type Props = {
  open: boolean;
  companyId: string | null;
  companyName?: string | null;
  onClose: () => void;
  onSuccess?: (companyId: string, companyName?: string | null) => void;
};

/**
 * Simple suspend modal: admin provides reason and suspendUntil (date).
 * suspendUntil is optional; if omitted backend may use default rules.
 */
export default function SuspendCompanyModal({ open, companyId, companyName, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [suspendUntil, setSuspendUntil] = useState<string>(""); // ISO date string yyyy-MM-dd

  if (!open) return null;

  const handleSuspend = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const payload: { reason?: string; suspendUntil?: string } = {};
      if (reason.trim()) payload.reason = reason.trim();
      if (suspendUntil) {
        // convert yyyy-MM-dd to ISO end-of-day to be safe (optional)
        const iso = new Date(suspendUntil).toISOString();
        payload.suspendUntil = iso;
      }
      await suspendCompany(companyId, payload);
      Swal.fire({ icon: "success", title: "Berhasil", text: `${companyName ?? "Perusahaan"} berhasil disuspend` });
      onSuccess?.(companyId, companyName);
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Terjadi kesalahan saat suspend" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => !loading && onClose()} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">⚠️</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center">Suspend {companyName ?? "Perusahaan"}</h3>
          <p className="text-sm text-gray-600 text-center">
            Pengguna akan diblokir sementara dan tidak dapat melakukan aktivitas sampai periode berakhir.
          </p>

          <input
            type="date"
            value={suspendUntil}
            onChange={(e) => setSuspendUntil(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded p-3 text-sm"
            rows={3}
            placeholder="Alasan suspend (opsional)"
          />

          <div className="flex gap-3 w-full">
            <button type="button" onClick={() => !loading && onClose()} className="flex-1 px-4 py-3 rounded bg-gray-100">
              Batal
            </button>
            <button type="button" onClick={handleSuspend} disabled={loading} className={`flex-1 px-4 py-3 rounded text-white ${loading ? "bg-amber-400" : "bg-amber-600 hover:bg-amber-700"}`}>
              {loading ? "Menyimpan..." : "Suspend"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}