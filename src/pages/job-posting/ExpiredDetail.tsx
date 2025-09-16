import { useParams } from "react-router-dom";
import { useState } from "react";
import { FileText, User } from "lucide-react";
import { clsx } from "clsx";
import { useJobDetail } from "../../hooks/useJobDetail";
import { useJobWorkers } from "../../hooks/useJobWorkers";

// Contoh dummy kandidat
// const candidates = [
//   {
//     id: "AD39",
//     tanggal: "25 Desember 2024",
//     nama: "Budi Santoso",
//     role: "Bartender",
//     alamat: "Jl. Raya No. 1, Surabaya",
//     jenisKelamin: "Laki-laki",
//     status: "Belum Konfirmasi",
//   },
//   {
//     id: "AD40",
//     tanggal: "25 Desember 2024",
//     nama: "Siti Aminah",
//     role: "Bartender",
//     alamat: "Jl. Raya No. 2, Surabaya",
//     jenisKelamin: "Perempuan",
//     status: "Waiting List",
//   },
//   {
//     id: "AD41",
//     tanggal: "25 Desember 2024",
//     nama: "Ahmad Fauzi",
//     role: "Bartender",
//     alamat: "Jl. Raya No. 2, Surabaya",
//     jenisKelamin: "Laki-laki",
//     status: "Waiting List",
//   },
//   {
//     id: "AD42",
//     tanggal: "25 Desember 2024",
//     nama: "Sari",
//     role: "Bartender",
//     alamat: "Jl. Raya No. 2, Surabaya",
//     jenisKelamin: "Perempuan",
//     status: "Waiting List",
//   },
// ];

export default function ExpiredDetail() {
  const { id } = useParams();
  const { jobDetail, loading, error } = useJobDetail(id ?? "");
  const {
    workers,
    loading: workersLoading,
    error: workersError,
  } = useJobWorkers(id);

  const [activeTab, setActiveTab] = useState<"detail" | "kandidat">("detail");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!jobDetail) return <p>Data tidak ditemukan</p>;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 items-center justify-between">
        <button
          onClick={() => setActiveTab("detail")}
          className={`px-4 py-2 -mb-px border-b-2 w-[50%] ${
            activeTab === "detail"
              ? "border-blue-600 text-blue-600 font-medium"
              : "border-transparent text-gray-500"
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setActiveTab("kandidat")}
          className={`ml-4 px-4 py-2 -mb-px border-b-2 w-[50%] ${
            activeTab === "kandidat"
              ? "border-blue-600 text-blue-600 font-medium"
              : "border-transparent text-gray-500"
          }`}
        >
          Kandidat
        </button>
      </div>

      {/* Content */}
      {activeTab === "detail" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 justify-start text-left mt-6">
            <div>
              <div className="text-xl font-semibold mb-3">
                {jobDetail.roleName?.role ?? "-"}
              </div>
              <span className="px-2 py-2 text-sm font-medium bg-red-100 text-red-600 rounded-md border border-red-600">
                {jobDetail.isActive ? "Expired" : "Aktif"}
              </span>
            </div>
          </div>

          {/* Detail jobDetail Posting */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 justify-start">
              <FileText className="text-gray-600" size={20} />
              <h3 className="text-md font-semibold">Detail Job Posting</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">ID</p>
                <p className="text-sm">{jobDetail.id ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Posting</p>
                <p className="text-sm">{jobDetail.createdAt ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Pekerja</p>
                <p className="text-sm">{jobDetail.totalPekerja ?? "-"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
                <p className="text-sm">{jobDetail.tanggalKerja ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jam Kerja</p>
                <p className="text-sm">{jobDetail.jamKerja ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Upah</p>
                <p className="text-sm">{jobDetail.salary ?? "-"}</p>
              </div>
            </div>

            <div className="mt-6 justify-start">
              <p className="text-sm text-gray-500 mb-2 text-start">Deskripsi</p>
              <ul className="list-disc pl-5 space-y-1 text-start text-sm">
                {Array.isArray(jobDetail.description) &&
                  jobDetail.description.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            {/* Garis pembatas */}
            <hr className="my-6" />
            <div className="flex items-center gap-2 mb-6 justify-start">
              {/* <FileText className="text-gray-600" size={20} /> */}
              <h3 className="text-md font-semibold">Alamat</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
                <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
                <p className="text-sm text-gray-500 mb-1 mt-4">
                  Nama Jalan, Kecamatan, Kota
                </p>
                <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
                <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
                <p className="text-sm">
                  {jobDetail.alamat?.detailAlamat ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Pin Lokasi</p>
                <div className="">
                  <iframe
                    title="Map"
                    src={`https://www.google.com/maps?q=${
                      jobDetail.alamat?.latLng?.lat ?? 0
                    },${
                      jobDetail.alamat?.latLng?.lng ?? 0
                    }&hl=es;z=14&output=embed`}
                    width="100%"
                    height="100%"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data PIC */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 justify-start">
              <User className="text-gray-600" size={20} />
              <h2 className="text-md font-semibold">Data PIC</h2>
            </div>
            {jobDetail.dataPIC ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Depan</p>
                  <p className="text-sm">{jobDetail.dataPIC.namaPIC}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Belakang</p>
                  <p className="text-sm">{jobDetail.dataPIC.namaPIC ?? "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jabatan</p>
                  <p className="text-sm">{jobDetail.dataPIC.posisi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-sm">{jobDetail.dataPIC.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                  <p className="text-sm">{jobDetail.dataPIC.nomorTelepon}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Data PIC belum tersedia</p>
            )}
          </div>
        </div>
      ) : (
        // Kandidat Tab
        <div className="space-y-6">
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            {workersLoading && <p>Loading kandidat...</p>}
            {workersError && <p className="text-red-500">{workersError}</p>}
            {!workersLoading && workers.length === 0 && (
              <p>Tidak ada kandidat</p>
            )}
            {workers.length > 0 && (
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Alamat</th>
                    <th className="px-4 py-3">Jenis Kelamin</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm bg-white text-left">
                  {workers.map((w) => (
                    <tr key={w.id} className="border-t">
                      <td className="px-4 py-2">{w.id}</td>
                      <td className="px-4 py-2">{w.createdAt}</td>
                      <td className="px-4 py-2">{w.user?.firstName + " " + w.user?.lastName}</td>
                      <td className="px-4 py-2">{w.isAccepted}</td>
                      <td className="px-4 py-2">{w.user?.personalInfo?.userAddress?.name}</td>
                      <td className="px-4 py-2">{w.user?.personalInfo?.gender}</td>
                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "px-2 py-1 rounded text-xs font-medium",
                            w.status === "Waiting List"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                          )}
                        >
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
