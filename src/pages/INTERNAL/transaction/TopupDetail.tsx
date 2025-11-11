import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink, FileText, Building2, CheckCircle, XCircle, CreditCard, User  } from "lucide-react";
import { useTransactionDetail } from "@/hooks/internal/useTransactionIntDetail";
import ProcessTopupModal from "./components/ProcessTopupModal";
import { updateTopupTransaction } from "@/services/internal/transactionInternalService";

function formatCurrency(amount?: string | number) {
  if (!amount) return "-";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return String(amount);
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const s = status.toUpperCase();
  
  if (s === "COMPLETED") 
    return <span className="inline-block px-4 py-1.5 rounded border-2 border-green-600 text-green-700 font-medium text-sm">Transaksi Berhasil</span>;
  if (s === "FAILED") 
    return <span className="inline-block px-4 py-1.5 rounded border-2 border-red-600 text-red-700 font-medium text-sm">Transaksi Gagal</span>;
  if (s === "CANCELLED") 
    return <span className="inline-block px-3 py-1 rounded text-sm bg-red-100 text-red-700 font-medium">CANCELLED</span>;
  if (s === "PROCESS") 
    return <span className="inline-block px-3 py-1 rounded text-sm border border-orange-400 text-orange-600 font-medium">Proses Tertunda</span>;
  if (s === "PENDING")
    return <span className="inline-block px-4 py-1.5 rounded text-sm bg-blue-100 text-blue-700 font-medium">PENDING</span>;
  
  return <span className="inline-block px-3 py-1 rounded text-sm bg-gray-100 text-gray-700 font-medium">{s}</span>;
}

export default function TopupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useTransactionDetail(id ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const handleProcessTopup = () => {
    setIsModalOpen(true);
  };

  const handleConfirmProcess = async (isApproved: boolean, _reason?: string) => {
    try {
      const payload = {
        status: isApproved ? ("COMPLETED" as const) : ("FAILED" as const),
        internalId: data.internal?.id ?? data.internalId ?? "",
      };

      const response = await updateTopupTransaction(data.id, payload);

      if (response.ok) {
        // Set notification
        setNotification({
          type: isApproved ? "success" : "error",
          message: isApproved 
            ? `Top up ${data.company?.name ?? "Unknown"} berhasil` 
            : `Top up ${data.company?.name ?? "Unknown"} gagal`
        });
        
        await refetch(); // Refresh data
      } else {
        window.alert(response.message || "Gagal memproses top up");
      }
    } catch (err: any) {
      window.alert(err?.message || "Terjadi kesalahan saat memproses top up");
      throw err;
    }
  };

  const showProcessButton = data.status?.toUpperCase() === "PROCESS" || data.status?.toUpperCase() === "PENDING";
  const isCompleted = data.status?.toUpperCase() === "COMPLETED";
  const isFailed = data.status?.toUpperCase() === "FAILED";

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

        {/* Header: Company Name + External Link */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {data.company?.name ?? "Unknown Company"}
              </h1>
              <ExternalLink className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
            </div>
            <div>
              <StatusBadge status={data.status} />
            </div>
          </div>

          {/* Process Button - Top Right */}
          {showProcessButton && (
            <button
              onClick={handleProcessTopup}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              Proses Top Up
            </button>
          )}

          {/* Proses Ulang Button - If Failed */}
          {isFailed && (
            <button
              onClick={handleProcessTopup}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              Proses Ulang Top Up
            </button>
          )}
        </div>

        {/* Card Transaksi - Full Width */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-gray-700" />
            <h2 className="text-base font-semibold text-gray-900">Transaksi</h2>
          </div>

          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            <InfoField label="ID" value={data.reference ?? data.id} />
            <InfoField label="Tanggal" value={formatDate(data.createdAt)} />
            <InfoField label="Jumlah" value={formatCurrency(data.amount)} />
            <InfoField label="Tipe" value={data.type ?? "-"} />
            <InfoField label="Nama Perusahaan" value={data.company?.name ?? "-"} />
            <InfoField label="Jenis Industri" value="FINTECH" />
          </div>
        </div>

        {/* Card Perusahaan - Full Width (Only for pending/process) */}
        {!isCompleted && !isFailed && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Perusahaan</h2>
            </div>

            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              <InfoField 
                label="Nama Telepon Perusahaan" 
                value={data.company?.pic?.phoneNumber ?? "-"} 
              />
              <InfoField 
                label="Jenis Industri" 
                value="FINTECH" 
              />
              <InfoField 
                label="Website Perusahaan" 
                value={data.company?.email ?? "-"}
                link={data.company?.email}
              />
              <InfoField 
                label="Nama PIC" 
                value={data.company?.pic ? `${data.company.pic.firstName ?? ""} ${data.company.pic.lastName ?? ""}`.trim() : "-"} 
              />
              <InfoField 
                label="Email PIC" 
                value={data.company?.pic?.email ?? "-"} 
              />
              <InfoField 
                label="Nomor Telepon PIC" 
                value={data.company?.pic?.phoneNumber ?? "-"} 
              />
            </div>
          </div>
        )}

        {/* Data Rekening - Only show when COMPLETED or FAILED */}
        {(isCompleted || isFailed) && (
          <div className="grid grid-cols-2 gap-6">
            {/* Data Rekening Perusahaan */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATA REKENING PERUSAHAAN
              </div>

              <div className="space-y-4">
                {/* Company Info with Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {data.company?.companyLogoUrl ? (
                      <img 
                        src={data.company.companyLogoUrl} 
                        alt={data.company.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {data.company?.name ?? "Unknown Company"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.company?.email ?? "-"}
                    </div>
                  </div>
                </div>

                {/* Bank Info */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CreditCard className="w-4 h-4 text-gray-400" />
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
                {/* User Info with Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {data.user?.profilePictureUrl ? (
                      <img 
                        src={data.user.profilePictureUrl} 
                        alt={`${data.user.firstName} ${data.user.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {data.user ? `${data.user.firstName ?? ""} ${data.user.lastName ?? ""}`.trim() : "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.user?.email ?? "-"}
                    </div>
                  </div>
                </div>

                {/* Bank Info */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">DIMAS ZELO</span>
                  <span className="text-gray-400">BSI - 1234567891011</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProcessTopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={data}
        onConfirm={handleConfirmProcess}
      />
    </>
  );
}

// Helper Component for Info Field (3-column layout)
function InfoField({ 
  label, 
  value, 
  link 
}: { 
  label: string; 
  value: string; 
  link?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-500 font-normal">{label}</span>
      {link ? (
        <a 
          href={`mailto:${link}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-normal flex items-center gap-1"
        >
          {value}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      ) : (
        <span className="text-sm text-gray-900 font-normal">
          {value}
        </span>
      )}
    </div>
  );
}