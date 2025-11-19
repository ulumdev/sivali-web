import React, { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  FileText,
  CreditCard,
  User,
  ExternalLink,
  Ban,
  ArrowLeft,
} from "lucide-react";
import { useCompanyIntDetail } from "@/hooks/internal/useCompanyIntDetail";
import BlockCompanyModal from "./components/BlockCompanyModal";
import SuspendCompanyModal from "./components/SuspendCompanyModal";
import NPWPDetailModal from "./components/NpwpDetailModal";

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
  const [npwpDetailOpen, setNpwpDetailOpen] = React.useState(false); // NEW

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!companyDetail)
    return <p className="text-gray-500">Data tidak ditemukan</p>;

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
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:w-1/3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* <button
            onClick={() => setSuspendOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white"
          >
            <CirclePause className="w-4 h-4" />
            <span>Suspend</span>
          </button> */}
          <button
            onClick={() => setBlockOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white"
          >
            <Ban className="w-4 h-4" />
            <span>Blokir</span>
          </button>
        </div>
      </div>
      {/* Header box */}
      <div className="bg-white rounded-lg border p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-left">
          Profil Perusahaan
        </h2>

        {/* Content divided into left and right */}
        <div className="flex items-start justify-between gap-4">
          {/* Left side: Image + Company Info */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border">
              <img
                src={
                  companyDetail.companyLogoUrl || "/images/default-company.png"
                }
                alt={companyDetail.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="text-left">
              <div className="text-xs text-gray-500 mb-1">
                JD{companyDetail.id?.slice(0, 4).toUpperCase()}
              </div>
              <div className="text-xl font-semibold leading-tight">
                {companyDetail.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {companyDetail.email}
              </div>
            </div>
          </div>

          {/* Right side: Last Login + Status */}
          <div className="flex items-start gap-6">
            {/* Last Login */}
            <div className="flex flex-col items-start">
              <div className="text-xs text-gray-500 mb-1">TERAKHIR LOGIN</div>
              <div className="text-xs">
                {formatDate(companyDetail.lastLoginAt)}
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col items-start">
              <div className="text-xs text-gray-500 mb-1">STATUS</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-xs text-black font-medium">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data PIC */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-gray-600" size={18} />
          <h3 className="font-semibold">Data PIC</h3>
        </div>

        {companyDetail.pic ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
            <div>
              <p className="text-xs text-gray-500">Nama Depan</p>
              <p className="font-medium">
                {companyDetail.pic.firstName ?? "-"}
              </p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
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
                <a
                  href={companyDetail.companyProfile.webUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black inline-flex items-center gap-2"
                >
                  {companyDetail.companyProfile.webUrl}
                  <ExternalLink size={16} className="text-blue-600" />{" "}
                </a>
              ) : (
                "-"
              )}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="w-full bg-indigo-50 p-2 text-md font-semibold text-indigo-700 rounded-lg mb-6">
              <p>Alamat</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Nama Alamat</p>
                <p>{companyDetail.companyProfile?.about ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  Nama Jalan, Kecamatan, Kota
                </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
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

        {/* Success Alert */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800">
            Akun anda berhasil di verifikasi pada{" "}
            <span className="font-semibold">24 Juni 2024</span>
          </span>
        </div>

        {/* NPWP Section */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider text-left">
            NPWP
          </p>

          <div className="flex items-center gap-3 w-1/2">
            {/* Card File */}
            <div className="flex items-center gap-2 p-2 border rounded-lg bg-white flex-1">
              <div className="rounded-sm bg-blue-100 px-2 py-2">
                <FileText className="h-5 w-5 text-blue-700" />
              </div>

              <div className="flex items-center justify-between w-full">
                {companyDetail.companyVerificationFile?.npwpUrl ? (
                  <>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        NPWP_JDTECH.jpg
                      </p>
                      <p className="text-xs text-gray-500">1.8 MB</p>
                    </div>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 bg-green-50 text-green-700 border-green-200"
                      style={{
                        marginLeft: "auto",
                        height: "auto",
                        width: "auto",
                        alignSelf: "center",
                      }}
                    >
                      Sesuai
                    </span>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 italic text-start px-3 me-4">
                      Belum ada bukti
                      <br /> 0.0 MB
                    </p>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400 ml-2"
                      style={{
                        marginLeft: "auto",
                        height: "auto",
                        width: "auto",
                        alignSelf: "center",
                      }}
                    >
                      Kosong
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Icon - Open Detail Modal */}
            {companyDetail.companyVerificationFile?.npwpUrl ? (
              <button
                onClick={() => setNpwpDetailOpen(true)}
                title="Lihat Detail NPWP"
                className="flex-shrink-0"
              >
                <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
              </button>
            ) : (
              <ExternalLink className="h-5 w-5 text-gray-400 cursor-not-allowed" />
            )}
          </div>
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

      {/* NPWP Detail Modal - NEW */}
      <NPWPDetailModal
        isOpen={npwpDetailOpen}
        onClose={() => setNpwpDetailOpen(false)}
        companyName={companyDetail.name ?? "-"}
        npwpNumber={companyDetail.companyVerificationFile?.npwp}
        npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl}
        status="SUCCESS"
        rejectionReason={undefined}
      />
    </div>
  );
}
