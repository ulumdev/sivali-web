import { useState } from "react";
import Swal from "sweetalert2";
import { blockCompany } from "@/services/internal/companyInternalService";

type Props = {
  open: boolean;
  companyId: string | null;
  companyName?: string | null;
  onClose: () => void;
  onBlocked: (companyId: string, companyName?: string | null) => void;
};

/**
 * Modal UI for blocking a company (matches provided design)
 */
export default function BlockCompanyModal({ open, companyId, companyName, onClose, onBlocked }: Props) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("Violation of terms of service");

  if (!open) return null;

  const handleBlock = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      await blockCompany(companyId, reason);
      // success
      onBlocked(companyId, companyName);
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err?.message ?? "Gagal memblokir perusahaan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => !loading && onClose()} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600">😡</div>
          </div>
          <h3 className="text-lg font-semibold">Blokir {companyName ?? "Perusahaan"}</h3>
          <p className="text-sm text-gray-600 text-center">
            Pengguna akan kehilangan akses untuk melakukan aktivitas secara permanen.
          </p>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded p-3 text-sm"
            rows={3}
            placeholder="Alasan pemblokiran (opsional)"
          />

          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={() => !loading && onClose()}
              className="flex-1 px-4 py-3 rounded bg-gray-100"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleBlock}
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded text-white ${loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"}`}
            >
              {loading ? "Memblokir..." : "Blokir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}