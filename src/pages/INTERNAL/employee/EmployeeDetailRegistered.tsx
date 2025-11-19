import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEmployeeDetail } from "@/hooks/internal/useEmployeeIntDetail";
import { activateEmployee } from "@/services/internal/employeeInteDetailService";
import ConfirmActionModal from "./components/ConfirmActionModal";
import { apiRequest } from "@/services/api";
import Swal from "sweetalert2";

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Detail page for Registered employee.
 * Supports:
 * - Verify document (KTP / CV) — uses a generic verify-document endpoint (please confirm with backend)
 * - Activate employee (use activateEmployee)
 *
 * Note: The verify-document endpoint path/body below is assumed:
 * PUT /api/v1/internals/companies/workers/{id}/verify-document
 * body: { documentType: "KTP" | "CV", status: "SUCCESS" | "REJECTED", reason?: string }
 *
 * If backend uses different path/body, update the apiRequest call accordingly.
 */
export default function EmployeeDetailRegistered(): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading, error, refetch } = useEmployeeDetail(id ?? null);

  const [activateOpen, setActivateOpen] = React.useState(false);
  const [verifyDocType, setVerifyDocType] = React.useState<"KTP" | "CV" | null>(null);
  const [verifyOpen, setVerifyOpen] = React.useState(false);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee) return <p className="text-gray-500">Data tidak ditemukan</p>;

  const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  const verifyDocument = async (documentType: "KTP" | "CV", status: "SUCCESS" | "REJECTED", payload?: { reason?: string }) => {
    // Assumed endpoint — change if backend differs
    const path = `/api/v1/internals/companies/workers/${employee.id}/verify-document`;
    const body = { documentType, status, ...payload };
    await apiRequest(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const handleVerifyConfirm = async (payload?: any) => {
    if (!verifyDocType) return;
    // default to SUCCESS when confirming
    await verifyDocument(verifyDocType, "SUCCESS", payload ?? {});
    Swal.fire({ icon: "success", title: "Berhasil", text: `${verifyDocType} berhasil diverifikasi` });
    // refresh detail
    refetch();
    setVerifyOpen(false);
  };

  const handleActivate = async () => {
    await activateEmployee(employee.id);
    Swal.fire({ icon: "success", title: "Berhasil", text: `${fullName} telah diaktifkan` });
    navigate("/internal/employees/verified", { state: { bannerMessage: `${fullName} telah diaktifkan` } });
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      <div className="bg-white rounded-lg border p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border">
            {employee.profilePictureUrl ? (
              <img src={employee.profilePictureUrl} alt={fullName} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-400">👤</div>
            )}
          </div>

          <div>
            <div className="text-xs text-gray-500">ID {employee.id?.slice(0, 8).toUpperCase()}</div>
            <div className="text-2xl font-semibold leading-tight">{fullName || "Nama Tidak Tersedia"}</div>
            <div className="text-sm text-gray-500 mt-1">{employee.email ?? "-"}</div>
            <div className="text-sm text-gray-400 mt-1">{employee.phoneNumber ?? "-"}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-xs text-gray-500">TERAKHIR LOGIN</div>
          <div className="text-sm">{employee.lastLoginAt ? formatDate(employee.lastLoginAt) : "-"}</div>

          <div className="flex gap-2">
            <button onClick={() => { setVerifyDocType("KTP"); setVerifyOpen(true); }} className="px-3 py-2 bg-white border rounded-md text-sm">Verifikasi KTP</button>
            <button onClick={() => { setVerifyDocType("CV"); setVerifyOpen(true); }} className="px-3 py-2 bg-white border rounded-md text-sm">Verifikasi CV</button>
            <button onClick={() => setActivateOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm text-green-700">Aktifkan</button>
          </div>
        </div>
      </div>

      {/* Registered notice */}
      <div className="bg-blue-50 border border-blue-100 text-blue-700 rounded-md p-4">
        Akun terdaftar tetapi belum diaktifkan. Pastikan dokumen diverifikasi sebelum mengaktifkan.
      </div>

      {/* Detail sections simplified */}
      <section className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold mb-3">Data Diri</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Nama Depan</p>
            <p className="font-medium">{employee.firstName ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Nama Belakang</p>
            <p>{employee.lastName ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Tanggal Lahir</p>
            <p>{employee.personalInfo?.dateOfBirth ? formatDate(employee.personalInfo.dateOfBirth) : "-"}</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold mb-3">Verifikasi</h3>
        <div className="text-sm">
          {employee.userVerificationFile ? (
            <div className="space-y-2">
              <div className="bg-gray-50 border border-gray-100 text-gray-700 p-3 rounded">Status dokumen (lihat tautan untuk detail)</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-white border p-3 rounded w-44">
                  <div className="text-xs text-gray-500">KTP</div>
                  <div className="text-sm">{employee.userVerificationFile.ktpUrl ? <a href={employee.userVerificationFile.ktpUrl} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center gap-2">Lihat <ExternalLink size={14} /></a> : "-"}</div>
                </div>
                <div className="bg-white border p-3 rounded w-44">
                  <div className="text-xs text-gray-500">CV</div>
                  <div className="text-sm">{employee.userVerificationFile.cvUrl ? <a href={employee.userVerificationFile.cvUrl} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center gap-2">Lihat <ExternalLink size={14} /></a> : "-"}</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Dokumen verifikasi tidak tersedia</p>
          )}
        </div>
      </section>

      {/* Confirm verify modal (used for both KTP and CV verification) */}
      <ConfirmActionModal
        open={verifyOpen}
        title={verifyDocType ? `Verifikasi ${verifyDocType}` : "Verifikasi Dokumen"}
        description={`Anda akan menandai ${verifyDocType ?? "dokumen"} sebagai terverifikasi.`}
        confirmLabel="Verifikasi"
        cancelLabel="Batal"
        danger={false}
        showReason={false}
        onClose={() => { setVerifyOpen(false); setVerifyDocType(null); }}
        onConfirm={async (payload?: any) => {
          await handleVerifyConfirm(payload);
        }}
      />

      {/* Activate modal */}
      <ConfirmActionModal
        open={activateOpen}
        title={`Aktifkan ${fullName}`}
        description="Pengguna akan mendapatkan akses untuk melakukan aktivitas seperti biasa."
        confirmLabel="Aktifkan"
        cancelLabel="Batal"
        danger={false}
        onClose={() => setActivateOpen(false)}
        onConfirm={async () => {
          await handleActivate();
        }}
      />
    </div>
  );
}