import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEmployeeDetail } from "@/hooks/internal/useEmployeeIntDetail";
import { activateEmployee } from "@/services/internal/employeeInteDetailService";
import ConfirmActionModal from "./components/ConfirmActionModal";
import Swal from "sweetalert2";

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Detail page for Suspended employee.
 * Shows Reactivate action.
 */
export default function EmployeeDetailSuspended(): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading, error } = useEmployeeDetail(id ?? null);

  const [activateOpen, setActivateOpen] = React.useState(false);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee) return <p className="text-gray-500">Data tidak ditemukan</p>;

  const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  const handleActivate = async () => {
    await activateEmployee(employee.id);
    Swal.fire({ icon: "success", title: "Berhasil", text: `${fullName} kembali diaktifkan` });
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
            <button onClick={() => setActivateOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm">Aktifkan Kembali</button>
          </div>
        </div>
      </div>

      {/* Suspended banner */}
      <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-md p-4">
        Akun ini sedang disuspend — pengguna tidak dapat melakukan aktivitas sampai periode dicabut.
      </div>

      {/* Basic info sections (Data Diri, Education, Experience, Verification) */}
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

      {/* Verification block simplified */}
      <section className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold mb-3">Verifikasi</h3>
        <div className="text-sm">
          {employee.userVerificationFile ? (
            <div className="space-y-2">
              <div className="bg-green-50 border border-green-100 text-green-700 p-3 rounded">Akun terverifikasi pada {employee.updatedAt ? formatDate(employee.updatedAt) : "-"}</div>
            </div>
          ) : (
            <p className="text-gray-500">Dokumen verifikasi tidak tersedia</p>
          )}
        </div>
      </section>

      <ConfirmActionModal
        open={activateOpen}
        title={`Aktifkan Kembali ${fullName}`}
        description="Pengguna akan mendapatkan kembali akses seperti semula."
        confirmLabel="Aktifkan"
        cancelLabel="Batal"
        onClose={() => setActivateOpen(false)}
        onConfirm={async () => {
          await handleActivate();
        }}
      />
    </div>
  );
}