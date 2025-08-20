import React, { useEffect, useState } from "react";
import {
  Edit,
  FileText,
  Building2,
  User,
  ExternalLink,
  SquareArrowOutUpRight,
} from "lucide-react";
import type { Profile, ProfileResponse } from "../models/Profile";
import UploadNPWPModal from "../new-components/UploadNpwpModal";

// ----------------------------
// Tooltip Component (simple)
// ----------------------------
function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group flex items-center">
      {children}
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditNPWP = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token tidak ditemukan, silakan login ulang.");
      setLoading(false);
      return;
    }

    fetch("/api/v1/companies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Gagal mengambil data profile");
        const data: ProfileResponse = await res.json();
        setProfile(data.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Data profile kosong</p>;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-4">{profile.name ?? "-"}</h2>
        <button className="flex items-center gap-1 bg-blue-600 text-white text-md px-3 py-1 rounded hover:bg-blue-700">
          <Edit size={14} />
          Edit
        </button>
      </div>

      {/* Data Perusahaan */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <Building2 className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold">Data Perusahaan</h2>
        </div>

        {/* Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 justify-start text-left">
          {/* Logo */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Logo</p>
            {profile.companyLogoUrl ? (
              <img
                src={profile.companyLogoUrl}
                alt="Company Logo"
                className="w-20 h-20 object-contain rounded border"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                N/A
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 justify-start text-left mt-6">
          {/* Nama Perusahaan */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Nama Perusahaan</p>
            <p className="font-medium">{profile.name ?? "-"}</p>
          </div>

          {/* Nomor Telepon */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Nomor Telepon</p>
            <p className="font-medium">
              {profile.companyProfile?.phoneNumber ?? "-"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="font-medium">{profile.email ?? "-"}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              {profile.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          {/* Jenis Industri */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Jenis Industri</p>
            <p className="font-medium">
              {profile.companyProfile?.industry ?? "-"}
            </p>
          </div>

          {/* Website */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Website</p>
            {profile.companyProfile?.webUrl ? (
              <a
                href={profile.companyProfile.webUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {profile.companyProfile.webUrl} <ExternalLink size={14} />
              </a>
            ) : (
              <p className="font-medium">-</p>
            )}
          </div>
        </div>

        {/* Garis pembatas */}
        <hr className="my-6" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          {/* <Building2 className="text-gray-600" size={20} /> */}
          <h2 className="text-lg font-semibold">Alamat</h2>
        </div>

        {/* Alamat */}
        {profile.companyProfile?.address ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
            <div>
              <p className="text-sm text-gray-400 mb-1">Nama Alamat</p>
              <p className="font-medium">
                {profile.companyProfile.address.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Alamat</p>
              <p className="font-medium">
                {profile.companyProfile.address.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Detail Alamat</p>
              <p className="font-medium">
                {profile.companyProfile.address.detail ?? "-"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Alamat belum diisi</p>
        )}
      </div>

      {/* Data PIC */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <User className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold">Data PIC</h2>
        </div>
        {profile.pic ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-start">
            <div>
              <p className="text-sm text-gray-500">Nama Depan</p>
              <p className="font-medium">{profile.pic.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Belakang</p>
              <p className="font-medium">{profile.pic.lastName ?? "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jabatan</p>
              <p className="font-medium">{profile.pic.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile.pic.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="font-medium">{profile.pic.phoneNumber}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Data PIC belum tersedia</p>
        )}
      </div>

      {/* Data Rekening Bank */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <User className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold">Data Rekening Bank</h2>
        </div>
        {profile.companyBankInformation ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-start">
            <div>
              <p className="text-sm text-gray-500">Nama Bank</p>
              <p className="font-medium">
                {profile.companyBankInformation.bank.bankName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor Rekening</p>
              <p className="font-medium">
                {profile.companyBankInformation.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Pemilik Rekening</p>
              <p className="font-medium">
                {profile.companyBankInformation.accountOwner}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Data rekening belum tersedia</p>
        )}
      </div>

      {/* Verifikasi */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* Header */}
        <Header icon={<User size={20} />} title="Verifikasi" />
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 text-start mb-3">NPWP</p>

            <div className="flex items-center gap-3">
              {/* Card File */}
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-white flex-1">
                <div className="rounded-sm bg-blue-100 px-2 py-2">
                  <FileText className="h-5 w-5 text-blue-500 " />
                </div>

                <div>
                  {profile.companyVerificationFile?.npwp ? (
                    <>
                      <a
                        href={profile.companyVerificationFile.npwpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {profile.companyVerificationFile.npwp}
                      </a>
                      <p className="text-xs text-gray-500 text-start px-3 me-4">
                        {profile.companyVerificationFile.npwp}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ${
                          profile.companyVerificationFile.npwpStatus.toLocaleLowerCase() ===
                          "sesuai"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : profile.companyVerificationFile.npwpStatus.toLocaleLowerCase() ===
                              "revisi"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      ></span>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400 italic text-start px-3 me-4">
                        Belum upload NPWP <br /> 0.0 MB
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        Kosong
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Icon Edit / Upload */}
              <Tooltip
                text={
                  profile.companyVerificationFile?.npwpUrl
                    ? "Edit NPWP"
                    : "Upload NPWP"
                }
              >
                <SquareArrowOutUpRight
                  onClick={handleEditNPWP}
                  className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UploadNPWPModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(file, npwpNumber) => {
          console.log("File:", file);
          console.log("NPWP Number:", npwpNumber);
        }}
        initialFileUrl={profile.companyVerificationFile?.npwpUrl}
        initialNpwp={profile.companyVerificationFile?.npwp}
      />
    </div>
  );
}

function Header({ icon, title }: { icon?: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-6 justify-start">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}
