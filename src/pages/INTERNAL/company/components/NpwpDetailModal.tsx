import { X } from "lucide-react";

interface NPWPDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  npwpNumber?: string;
  npwpImageUrl?: string;
  status: "SUCCESS" | "FAIL";
  rejectionReason?: string;
}

export default function NPWPDetailModal({
  isOpen,
  onClose,
  companyName,
  npwpNumber,
  npwpImageUrl,
  status,
  rejectionReason,
}: NPWPDetailModalProps) {
  if (!isOpen) return null;

  const fileName = `NPWP_${companyName.slice(0, 6).toUpperCase()}.jpg`;
  const isApproved = status === "SUCCESS";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">{fileName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* NPWP Image Preview */}
          <div className="flex justify-center">
            {npwpImageUrl ? (
              <img
                src={npwpImageUrl}
                alt="NPWP Preview"
                className="w-full max-w-sm rounded-lg border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-full max-w-sm h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300 flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <div className="text-xs font-semibold text-blue-800">
                    KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
                  </div>
                  <div className="text-xs text-blue-700">
                    DIREKTORAT JENDERAL PAJAK
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-blue-900">
                    <div>NPWP : XX.YYY.YYY-Z.XXX.YYY</div>
                    <div>Nama : ?</div>
                    <div>NIK : XXXXX-X.XXXXXX.X</div>
                    <div>Alamat : Jl. _____ No. ___ RT. ___ RW. ___</div>
                    <div>Kel. _____ Kec. _____ Kab. _____</div>
                    <div>Prop. _____</div>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-blue-800">
                    KPP : Pratama ABC
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NPWP Number */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">NPWP</h3>
            <p className="text-2xl font-bold text-gray-900 tracking-wide">
              {npwpNumber ?? "51.710.109-0.006.777"}
            </p>
          </div>

          {/* Verification Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Verifikasi
            </h3>
            
            {isApproved ? (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                <span>Sesuai</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <span>Tidak Sesuai</span>
                </div>
                
                {rejectionReason && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Alasan :
                    </p>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer - Close Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}