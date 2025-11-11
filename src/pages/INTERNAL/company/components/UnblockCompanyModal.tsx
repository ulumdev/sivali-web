import { useState } from "react";
import Swal from "sweetalert2";
import { activateCompany } from "@/services/internal/companyInternalService";

type Props = {
  open: boolean;
  companyId: string | null;
  companyName?: string | null;
  onClose: () => void;
  onUnblocked?: (companyId: string, companyName?: string | null) => void;
};

/**
 * Unblock confirmation modal (matches provided design)
 */
export default function UnblockCompanyModal({ open, companyId, companyName, onClose, onUnblocked }: Props) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleUnblock = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      await activateCompany(companyId);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: `${companyName ?? "Perusahaan"} berhasil dibuka blokirnya`,
        timer: 2000,
        showConfirmButton: false,
      });
      onUnblocked?.(companyId, companyName);
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Gagal membuka blokir" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => !loading && onClose()} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">🙂</div>
          </div>
          <h3 className="text-lg font-semibold">Buka Blokir {companyName ?? "Perusahaan"}</h3>
          <p className="text-sm text-gray-600 text-center">
            Pengguna akan mendapatkan akses untuk kembali mengakses layanan seperti semula.
          </p>

          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              onClick={() => !loading && onClose()}
              className="flex-1 px-4 py-3 rounded bg-gray-100"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleUnblock}
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Memproses..." : "Buka Blokir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}