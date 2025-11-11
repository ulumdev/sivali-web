import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ExternalLink, 
  FileText, 
  Calendar, 
  Phone, 
  CheckCircle, 
  XCircle,
  Clock,
  Image as ImageIcon,
  FileImage
} from "lucide-react";
import { useTransactionDetail } from "@/hooks/internal/useTransactionIntDetail";
import ProcessPayrollModal from "./components/ProcessPayrollModal";
import { updatePayrollTransaction } from "@/services/internal/transactionInternalService";

function formatCurrency(amount?: string | number) {
  if (!amount) return "-";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return String(amount);
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { 
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatTime(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const s = status.toUpperCase();
  
  if (s === "COMPLETED") 
    return <span className="inline-block px-4 py-1.5 rounded border-2 border-green-600 text-green-700 font-medium text-sm">Transaksi Berhasil</span>;
  if (s === "FAILED" || s === "CANCELLED") 
    return <span className="inline-block px-4 py-1.5 rounded border-2 border-red-600 text-red-700 font-medium text-sm">Transaksi Gagal</span>;
  if (s === "PROCESS" || s === "PENDING") 
    return <span className="inline-block px-4 py-1.5 rounded border-2 border-blue-600 text-blue-700 font-medium text-sm">Sedang Diproses</span>;
  
  return <span className="inline-block px-3 py-1 rounded text-sm bg-gray-100 text-gray-700 font-medium">{s}</span>;
}

function AbsensiStatusBadge({ status }: { status?: string }) {
  const s = status?.toUpperCase();
  
  if (s === "COMPLETED" || s === "APPROVED") 
    return <span className="inline-block px-3 py-1 rounded text-xs bg-green-100 text-green-700 font-medium">Absensi Diterima</span>;
  if (s === "REJECTED" || s === "FAILED") 
    return <span className="inline-block px-3 py-1 rounded text-xs bg-red-100 text-red-700 font-medium">Absensi Ditolak</span>;
  
  return <span className="inline-block px-3 py-1 rounded text-xs bg-blue-100 text-blue-700 font-medium">Absensi Diterima</span>;
}

export default function PayrollDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useTransactionDetail(id ?? "");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          ← Kembali
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error || "Data tidak ditemukan"}</p>
        </div>
      </div>
    );
  }

  const userName = data.user ? `${data.user.firstName ?? ""} ${data.user.lastName ?? ""}`.trim() : "Unknown User";
  const showProcessButton = data.status?.toUpperCase() === "PROCESS" || data.status?.toUpperCase() === "PENDING";
  const isCompleted = data.status?.toUpperCase() === "COMPLETED";
  const isFailed = data.status?.toUpperCase() === "FAILED" || data.status?.toUpperCase() === "CANCELLED";
  
  const hasAttendance = data.jobAttendanceList?.checkIn || data.jobAttendanceList?.checkOut;
  const hasReport = data.jobAttendanceList?.photoIn || data.jobAttendanceList?.photoOut;
  const attendanceStatus = data.jobAttendanceList?.status;

  const handleLihatJobPosting = () => {
    // Navigate to job posting detail
    if (data.jobId) {
      navigate(`/internal/jobs/${data.jobId}`);
    }
  };

  const handleProsesPayroll = () => {
    setIsModalOpen(true);
  };

  const handleConfirmProcess = async (isApproved: boolean, _reason?: string) => {
    try {
      const attendanceId = data.jobAttendanceListId ?? data.jobAttendanceList?.id ?? "";
      
      if (!attendanceId) {
        window.alert("Attendance ID tidak ditemukan");
        throw new Error("Attendance ID tidak ditemukan");
      }

      const payload = {
        internalId: data.internal?.id ?? data.internalId ?? "",
      };

      const response = await updatePayrollTransaction(attendanceId, payload);

      if (response.ok) {
        // Set notification
        setNotification({
          type: isApproved ? "success" : "error",
          message: isApproved 
            ? `Payroll ${userName} berhasil` 
            : `Payroll ${userName} gagal`
        });
        
        await refetch(); // Refresh data
      } else {
        window.alert(response.message || "Gagal memproses payroll");
      }
    } catch (err: any) {
      window.alert(err?.message || "Terjadi kesalahan saat memproses payroll");
      throw err;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Alert Banner */}
        {notification && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${
            notification.type === "success" 
              ? "bg-green-50 border-green-500" 
              : "bg-red-50 border-red-500"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              notification.type === "success" ? "text-green-800" : "text-red-800"
            }`}>
              {notification.message}
            </span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
        >
          ← Kembali
        </button>

        {/* Header: User Name + External Link */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {userName}
              </h1>
              <ExternalLink className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
            </div>
            <div>
              <StatusBadge status={data.status} />
            </div>
          </div>

          {/* Action Buttons - Top Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLihatJobPosting}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
            >
              Lihat Job Posting
            </button>
            
            {(showProcessButton || isFailed) && (
              <button
                onClick={handleProsesPayroll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                Proses Penggajian
              </button>
            )}
          </div>
        </div>

        {/* Card Transaksi */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-gray-700" />
            <h2 className="text-base font-semibold text-gray-900">Transaksi</h2>
          </div>

          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            <InfoField label="ID" value={data.reference ?? data.id} />
            {isCompleted && <InfoField label="Tanggal" value={formatDate(data.processedAt ?? data.createdAt)} />}
            {isCompleted && <InfoField label="Jumlah" value={formatCurrency(data.amount)} />}
            <InfoField label="Tipe" value={data.type ?? "-"} />
            {isCompleted && <InfoField label="Nama Perusahaan" value={data.company?.name ?? "-"} />}
            {isCompleted && <InfoField label="Role" value={data.job?.role?.role ?? "-"} />}
            {!isCompleted && <InfoField label="Jumlah" value={formatCurrency(data.amount)} />}
          </div>
        </div>

        {/* Show different cards based on status */}
        {isCompleted && (
          <div className="grid grid-cols-2 gap-6">
            {/* Data Rekening Perusahaan */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATA REKENING PERUSAHAAN
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {data.company?.companyLogoUrl ? (
                      <img src={data.company.companyLogoUrl} alt={data.company.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">{data.company?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{data.company?.name}</div>
                    <div className="text-sm text-gray-500">{data.company?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">JOHN DOE</span>
                  <span className="text-gray-400">BSI - 1234567891011</span>
                </div>
              </div>
            </div>

            {/* Data Rekening Pekerja */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATA REKENING PEKERJA
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {data.user?.profilePictureUrl ? (
                      <img src={data.user.profilePictureUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">{userName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{userName}</div>
                    <div className="text-sm text-gray-500">{data.user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">JOCELYN ASHLEY</span>
                  <span className="text-gray-400">BSI - 1234567891011</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isCompleted && (
          <>
            {/* Card Absensi */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">Absensi</h2>
              </div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                <InfoField 
                  label="Tanggal Kerja" 
                  value={formatDate(data.job?.shiftIn)} 
                />
                <InfoField 
                  label="Nama Perusahaan" 
                  value={data.company?.name ?? "-"} 
                />
                <InfoField 
                  label="Role" 
                  value={data.job?.role?.role ?? "-"} 
                />
                <InfoField 
                  label="Absen Datang" 
                  value={hasAttendance ? formatTime(data.jobAttendanceList?.checkIn ?? undefined) : "Tidak ada absensi"}
                  className={!hasAttendance ? "text-red-600" : ""}
                />
                <InfoField 
                  label="Absen Pulang" 
                  value={hasAttendance ? formatTime(data.jobAttendanceList?.checkOut ?? undefined) : "Tidak ada absensi"}
                  className={!hasAttendance ? "text-red-600" : ""}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500 font-normal">Status</span>
                  <AbsensiStatusBadge status={attendanceStatus} />
                </div>
              </div>
            </div>

            {/* Card Laporan - Only show if has report */}
            {hasReport && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileImage className="w-5 h-5 text-gray-700" />
                  <h2 className="text-base font-semibold text-gray-900">Laporan</h2>
                </div>

                {/* 2 Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Absen Datang */}
                  <div className="space-y-4">
                    <div className="px-4 py-2 bg-blue-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-blue-900">Absen Datang</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Laporan Terkini
                        </div>
                        <span className="text-sm text-gray-900 font-medium">
                          {formatTime(data.jobAttendanceList?.checkIn ?? undefined)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Batas Waktu
                        </div>
                        <span className="text-sm text-gray-900 font-medium">
                          {formatTime(data.job?.shiftIn)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <InfoField label="Alasan" value="Terkendala Jaringan" />
                      <InfoField label="Keterangan" value="Terkendala 15 menit" />
                    </div>

                    {/* Bukti Image */}
                    <div className="space-y-2">
                      <span className="text-xs text-gray-500">Bukti</span>
                      <div className="relative group">
                        {data.jobAttendanceList?.photoIn ? (
                          <img 
                            src={data.jobAttendanceList.photoIn} 
                            alt="Bukti Absen Datang"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">Screenshot.jpg</span>
                          <span className="text-xs text-gray-400">1.8 MB</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Button */}
                    <button 
                      className={`w-full py-2 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 ${
                        isFailed 
                          ? "border-red-500 text-red-700 hover:bg-red-50" 
                          : "border-green-500 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {isFailed ? "Laporan Ditolak" : "Laporan Diterima"}
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Absen Pulang */}
                  <div className="space-y-4">
                    <div className="px-4 py-2 bg-blue-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-blue-900">Absen Pulang</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Laporan Terkini
                        </div>
                        <span className="text-sm text-gray-900 font-medium">
                          {formatTime(data.jobAttendanceList?.checkOut ?? undefined)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Batas Waktu
                        </div>
                        <span className="text-sm text-gray-900 font-medium">
                          {formatTime(data.job?.shiftOut)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <InfoField label="Alasan" value="Terkendala Jaringan" />
                      <InfoField label="Keterangan" value="Terkendala 15 menit" />
                    </div>

                    {/* Bukti Image */}
                    <div className="space-y-2">
                      <span className="text-xs text-gray-500">Bukti</span>
                      <div className="relative group">
                        {data.jobAttendanceList?.photoOut ? (
                          <img 
                            src={data.jobAttendanceList.photoOut} 
                            alt="Bukti Absen Pulang"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">Screenshot.jpg</span>
                          <span className="text-xs text-gray-400">1.8 MB</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Button */}
                    <button 
                      className={`w-full py-2 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 ${
                        isFailed 
                          ? "border-red-500 text-red-700 hover:bg-red-50" 
                          : "border-green-500 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {isFailed ? "Laporan Ditolak" : "Laporan Diterima"}
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card Kontak */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">Kontak</h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <InfoField 
                  label="Email" 
                  value={data.user?.email ?? "-"} 
                />
                <InfoField 
                  label="Nomor Telepon" 
                  value={data.company?.pic?.phoneNumber ?? "08123456789"} 
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <ProcessPayrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={data}
        onConfirm={handleConfirmProcess}
      />
    </>
  );
}

// Helper Component for Info Field
function InfoField({ 
  label, 
  value, 
  className = ""
}: { 
  label: string; 
  value: string; 
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-500 font-normal">{label}</span>
      <span className={`text-sm text-gray-900 font-normal ${className}`}>
        {value}
      </span>
    </div>
  );
}