import React, { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, FileText, CreditCard, User, ExternalLink } from "lucide-react";
import { useCompanyIntDetail } from "@/hooks/internal/useCompanyIntDetail";
// import type { CompanyDetailModel } from "@/models/internal/CompanyDetailModel";
import BlockCompanyModal from "./components/BlockCompanyModal";
import SuspendCompanyModal from "./components/SuspendCompanyModal";

/**
 * CompanyDetailVerified - updated UI + suspend & block modal integrations
 */
function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CompanyDetailVerified(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companyDetail, loading, error } = useCompanyIntDetail(id);

  const [blockOpen, setBlockOpen] = React.useState(false);
  const [suspendOpen, setSuspendOpen] = React.useState(false);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!companyDetail) return <p className="text-gray-500">Data tidak ditemukan</p>;

  // const onBlockedSuccess = () => {
  //   // refresh the page / data - use what fits your app; here we reload
  //   window.location.reload();
  // };

  // const onSuspendSuccess = () => {
  //   window.location.reload();
  // };
  const onBlockedSuccess = () => {
    // navigate back to the verified list and pass banner message
    navigate("/internal/companies/verified", {
      state: { bannerMessage: `${companyDetail.name} telah diblokir` },
      replace: true,
    });
  };

  const onSuspendSuccess = () => {
    navigate("/internal/companies/verified", {
      state: { bannerMessage: `${companyDetail.name} telah disuspend` },
      replace: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header box */}
      <div className="bg-white rounded-lg border p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border">
            <img
              src={companyDetail.companyLogoUrl || "/images/default-company.png"}
              alt={companyDetail.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <div className="text-xs text-gray-500">JD{companyDetail.id?.slice(0, 4).toUpperCase()}</div>
            <div className="text-2xl font-semibold leading-tight">{companyDetail.name}</div>
            <div className="text-sm text-gray-500 mt-1">{companyDetail.email}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-xs text-gray-500">TERAKHIR LOGIN</div>
          <div className="text-sm">{formatDate(companyDetail.lastLoginAt)}</div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs bg-green-50 text-green-700 border border-green-100">
              <CheckCircle size={14} /> Verified
            </span>

            <div className="flex gap-2">
              <button onClick={() => setSuspendOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm hover:bg-gray-50">Suspend</button>
              <button onClick={() => setBlockOpen(true)} className="px-3 py-2 bg-white border rounded-md text-sm text-red-600 hover:bg-red-50">Block</button>
            </div>
          </div>
        </div>
      </div>

      {/* Verified banner */}
      <div className="bg-green-50 border border-green-100 text-green-700 rounded-md p-4">
        Akun anda berhasil di verifikasi pada {formatDate(companyDetail.updatedAt ?? companyDetail.createdAt)}.
      </div>

      {/* Data PIC */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-gray-600" size={18} />
          <h3 className="font-semibold">Data PIC</h3>
        </div>

        {companyDetail.pic ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-500">Nama Depan</p>
              <p className="font-medium">{companyDetail.pic.firstName ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nama Belakang</p>
              <p>{companyDetail.pic.lastName ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Jabatan</p>
              <p>{companyDetail.pic.position ?? "-"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p>{companyDetail.pic.email ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nomor Telepon PIC</p>
              <p>{companyDetail.pic.phoneNumber ?? "-"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">PIC belum tersedia</p>
        )}
      </section>

      {/* Data Perusahaan */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-gray-600" size={18} />
          <h3 className="font-semibold">Data Perusahaan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-xs text-gray-500">Nomor Telepon Perusahaan</p>
            <p>{companyDetail.companyProfile?.phoneNumber ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Jenis Industri</p>
            <p>{companyDetail.companyProfile?.industry ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Website Perusahaan</p>
            <p>
              {companyDetail.companyProfile?.webUrl ? (
                <a href={companyDetail.companyProfile.webUrl} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center gap-2">
                  <ExternalLink size={14} /> {companyDetail.companyProfile.webUrl}
                </a>
              ) : (
                "-"
              )}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs text-gray-500 mb-2">Alamat</p>
            <div className="bg-indigo-50 px-3 py-2 rounded text-sm text-indigo-700">Alamat</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Nama Alamat</p>
                <p>{companyDetail.companyProfile?.about ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nama Jalan, Kecamatan, Kota</p>
                <p>{companyDetail.companyProfile?.webUrl ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Detail Alamat</p>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Info */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="text-gray-600" size={18} />
          <h3 className="font-semibold">Data Rekening Bank</h3>
        </div>

        {companyDetail.companyBankInformation ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-500">Nama Bank</p>
              <p>{companyDetail.companyBankInformation.bankId ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nomor Rekening</p>
              <p>{companyDetail.companyBankInformation.accountNumber ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nama Pemilik Rekening</p>
              <p>{companyDetail.companyBankInformation.accountOwner ?? "-"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Informasi bank belum tersedia</p>
        )}
      </section>

      {/* Verification */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-gray-600" size={18} />
          <h3 className="font-semibold">Verifikasi</h3>
        </div>

        <div className="bg-green-50 border border-green-100 p-4 rounded mb-4 text-green-700">
          Akun terverifikasi — dokumen diverifikasi oleh admin.
        </div>

        <div className="text-sm">
          <p className="text-xs text-gray-500 mb-2">NPWP</p>
          {companyDetail.companyVerificationFile?.npwpUrl ? (
            <div className="flex items-center gap-3">
              <a href={companyDetail.companyVerificationFile.npwpUrl} target="_blank" rel="noreferrer" className="text-blue-600">
                Lihat NPWP
              </a>
              <span className="text-xs text-gray-500">{companyDetail.companyVerificationFile?.npwpStatus ?? "-"}</span>
            </div>
          ) : (
            <p className="text-gray-500">-</p>
          )}
        </div>
      </section>

      {/* modals */}
      <BlockCompanyModal
        open={blockOpen}
        companyId={companyDetail.id}
        companyName={companyDetail.name}
        onClose={() => setBlockOpen(false)}
        onBlocked={() => onBlockedSuccess()}
      />

      <SuspendCompanyModal
        open={suspendOpen}
        companyId={companyDetail.id}
        companyName={companyDetail.name}
        onClose={() => setSuspendOpen(false)}
        onSuccess={() => onSuspendSuccess()}
      />
    </div>
  );
}