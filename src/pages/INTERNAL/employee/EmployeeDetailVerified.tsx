import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEmployeeDetail } from "@/hooks/internal/useEmployeeIntDetail";
import { suspendEmployee, blockEmployee } from "@/services/internal/employeeInteDetailService";
import ConfirmActionModal from "./components/ConfirmActionModal";
import Swal from "sweetalert2";

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Detail page for Verified employee.
 * Shows Suspend and Block actions.
 */
export default function EmployeeDetailVerified(): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading, error } = useEmployeeDetail(id ?? null);

  const [suspendOpen, setSuspendOpen] = React.useState(false);
  const [blockOpen, setBlockOpen] = React.useState(false);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee) return <p className="text-gray-500">Data tidak ditemukan</p>;

  const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  const handleSuspend = async (payload?: any) => {
    await suspendEmployee(employee.id, payload ?? {});
    Swal.fire({ icon: "success", title: "Berhasil", text: `${fullName} telah disuspend` });
    // redirect to suspended list with banner message
    navigate("/internal/employees/suspended", { state: { bannerMessage: `${fullName} telah disuspend` } });
  };

  const handleBlock = async (payload?: any) => {
    await blockEmployee(employee.id, payload ?? {});
    Swal.fire({ icon: "success", title: "Berhasil", text: `${fullName} telah diblokir` });
    navigate("/internal/employees/blocked", { state: { bannerMessage: `${fullName} telah diblokir` } });
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      {/* Header */}
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

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs bg-green-50 text-green-700 border border-green-100">
              Verified
            </span>

            <div className="flex gap-2">
              <button onClick={() => setSuspendOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm hover:bg-gray-50">Suspend</button>
              <button onClick={() => setBlockOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm text-red-600 hover:bg-red-50">Block</button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic sections (Data Diri, Education, Experience, Verification) - simplified rendering */}
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
              <div className="bg-green-50 border border-green-100 text-green-700 p-3 rounded">Akun terverifikasi pada {employee.updatedAt ? formatDate(employee.updatedAt) : "-"}</div>
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

      {/* Suspend modal */}
      <ConfirmActionModal
        open={suspendOpen}
        title={`Suspend ${fullName}`}
        description="Pengguna akan kehilangan akses untuk melakukan aktivitas sementara."
        confirmLabel="Suspend"
        cancelLabel="Batal"
        danger={true}
        showReason
        showDate
        onClose={() => setSuspendOpen(false)}
        onConfirm={async (payload?: any) => {
          await handleSuspend(payload);
        }}
      />

      {/* Block modal */}
      <ConfirmActionModal
        open={blockOpen}
        title={`Blokir ${fullName}`}
        description="Pengguna akan kehilangan akses untuk melakukan aktivitas secara permanen."
        confirmLabel="Blokir"
        cancelLabel="Batal"
        danger={true}
        showReason
        onClose={() => setBlockOpen(false)}
        onConfirm={async (payload?: any) => {
          await handleBlock(payload);
        }}
      />
    </div>
  );
}