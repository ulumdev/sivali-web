// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { FileText, User, Trash2, PencilLine } from "lucide-react";
// import { clsx } from "clsx";
// import { useJobDetail } from "../../hooks/useJobDetail";
// import { useJobWorkers } from "../../hooks/useJobWorkers";

// export default function ActiveDetail() {
//   const { id } = useParams();
//   const { jobDetail, loading, error } = useJobDetail(id ?? "");
//   const {
//     workers,
//     loading: workersLoading,
//     error: workersError,
//   } = useJobWorkers(id);

//   const [activeTab, setActiveTab] = useState<"detail" | "kandidat">("detail");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!jobDetail) return <p>Data tidak ditemukan</p>;

//   return (
//     <div className="space-y-6">
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-4 items-center justify-between">
//         <button
//           onClick={() => setActiveTab("detail")}
//           className={`px-4 py-2 -mb-px border-b-2 w-[50%] ${
//             activeTab === "detail"
//               ? "border-blue-600 text-blue-600 font-medium"
//               : "border-transparent text-gray-500"
//           }`}
//         >
//           Detail
//         </button>
//         <button
//           onClick={() => setActiveTab("kandidat")}
//           className={`ml-4 px-4 py-2 -mb-px border-b-2 w-[50%] ${
//             activeTab === "kandidat"
//               ? "border-blue-600 text-blue-600 font-medium"
//               : "border-transparent text-gray-500"
//           }`}
//         >
//           Kandidat
//         </button>
//       </div>

//       {/* Content */}
//       {activeTab === "detail" ? (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 justify-start text-left mt-6">
//             <div>
//               <div className="text-xl font-semibold mb-3">
//                 {jobDetail.roleName?.role ?? "-"}
//               </div>
//               <div className="flex items-center justify-between gap-3">
//                 {!workersLoading && workers.length === 0 ? (
//                   <>
//                     <span className="px-2 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-md border border-orange-600">
//                       Menunggu lamaran
//                     </span>
//                     <div className="flex gap-2 ml-auto">
//                       <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 w-full md:w-auto">
//                         <PencilLine className="w-4 h-4" />
//                         <span>Edit</span>
//                       </button>
//                       <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white w-full md:w-auto">
//                         <Trash2 className="w-4 h-4" />
//                         <span>Hapus</span>
//                       </button>
//                     </div>
//                   </>
//                 ) : !workersLoading && workers.length > 0 ? (
//                   <span className="px-2 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md border border-blue-600">
//                     Sedang berlangsung
//                   </span>
//                 ) : null}
//               </div>
//             </div>
//           </div>

//           {/* Detail jobDetail Posting */}
//           <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//             {/* Header */}
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               <FileText className="text-gray-600" size={20} />
//               <h3 className="text-md font-semibold">Detail Job Posting</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">ID</p>
//                 <p className="text-sm">{jobDetail.id ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Posting</p>
//                 <p className="text-sm">{jobDetail.createdAt ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Pekerja</p>
//                 <p className="text-sm">{jobDetail.totalPekerja ?? "-"}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
//                 <p className="text-sm">{jobDetail.tanggalKerja ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Jam Kerja</p>
//                 <p className="text-sm">{jobDetail.jamKerja ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Upah</p>
//                 <p className="text-sm">{jobDetail.salary ?? "-"}</p>
//               </div>
//             </div>

//             <div className="mt-6 justify-start">
//               <p className="text-sm text-gray-500 mb-2 text-start">Deskripsi</p>
//               <ul className="list-disc pl-5 space-y-1 text-start text-sm">
//                 {Array.isArray(jobDetail.description) &&
//                   jobDetail.description.map((d, i) => <li key={i}>{d}</li>)}
//               </ul>
//             </div>

//             {/* Garis pembatas */}
//             <hr className="my-6" />
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               {/* <FileText className="text-gray-600" size={20} /> */}
//               <h3 className="text-md font-semibold">Alamat</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
//                 <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
//                 <p className="text-sm text-gray-500 mb-1 mt-4">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
//                 <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
//                 <p className="text-sm">
//                   {jobDetail.alamat?.detailAlamat ?? "-"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-2">Pin Lokasi</p>
//                 <div className="">
//                   <iframe
//                     title="Map"
//                     src={`https://www.google.com/maps?q=${
//                       jobDetail.alamat?.latLng?.lat ?? 0
//                     },${
//                       jobDetail.alamat?.latLng?.lng ?? 0
//                     }&hl=es;z=14&output=embed`}
//                     width="100%"
//                     height="100%"
//                     className="rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Data PIC */}
//           <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//             {/* Header */}
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               <User className="text-gray-600" size={20} />
//               <h2 className="text-md font-semibold">Data PIC</h2>
//             </div>
//             {jobDetail.dataPIC ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nama Depan</p>
//                   <p className="text-sm">{jobDetail.dataPIC.namaPIC}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nama Belakang</p>
//                   <p className="text-sm">{jobDetail.dataPIC.namaPIC ?? "-"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Jabatan</p>
//                   <p className="text-sm">{jobDetail.dataPIC.posisi}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Email</p>
//                   <p className="text-sm">{jobDetail.dataPIC.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
//                   <p className="text-sm">{jobDetail.dataPIC.nomorTelepon}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">Data PIC belum tersedia</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         // Kandidat Tab
//         <div className="space-y-6">
//           <div className="overflow-x-auto border rounded-lg shadow-sm">
//             {workersLoading && <p>Loading kandidat...</p>}
//             {workersError && <p className="text-red-500">{workersError}</p>}
//             {!workersLoading && workers.length === 0 && (
//               <p>Tidak ada kandidat</p>
//             )}
//             {workers.length > 0 && (
//               <table className="min-w-full border-collapse">
//                 <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
//                   <tr>
//                     <th className="px-4 py-3">ID</th>
//                     <th className="px-4 py-3">Tanggal</th>
//                     <th className="px-4 py-3">Nama</th>
//                     <th className="px-4 py-3">Role</th>
//                     <th className="px-4 py-3">Alamat</th>
//                     <th className="px-4 py-3">Jenis Kelamin</th>
//                     <th className="px-4 py-3">Status</th>
//                     <th className="px-4 py-3">Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm bg-white text-left">
//                   {workers.map((w) => (
//                     <tr key={w.id} className="border-t">
//                       <td className="px-4 py-2">{w.id}</td>
//                       <td className="px-4 py-2">{w.createdAt}</td>
//                       <td className="px-4 py-2">
//                         {w.user?.firstName + " " + w.user?.lastName}
//                       </td>
//                       <td className="px-4 py-2">{jobDetail.roleName?.role ?? "-"}</td>
//                       <td className="px-4 py-2">
//                         {w.user?.personalInfo?.userAddress?.name}
//                       </td>
//                       <td className="px-4 py-2">
//                         {w.user?.personalInfo?.gender}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={clsx(
//                             "px-2 py-1 rounded text-xs font-medium",
//                             w.status === "Waiting List"
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-blue-100 text-blue-600"
//                           )}
//                         >
//                           {w.status}
//                         </span>
//                       </td>
//                         <td className="px-4 py-2">
//                         <div className="flex gap-2">
//                           <button
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title="Approve"
//                           >
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polyline points="20 6 9 17 4 12"></polyline>
//                           </svg>
//                           </button>
//                           <button
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Reject"
//                           >
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                           </button>
//                         </div>
//                         </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { FileText, User, Trash2, PencilLine, Check, X } from "lucide-react";
// import { clsx } from "clsx";
// import { useJobDetail } from "../../hooks/useJobDetail";
// import { useJobWorkers } from "../../hooks/useJobWorkers";

// export default function ActiveDetail() {
//   const { id } = useParams();
//   const { jobDetail, loading, error } = useJobDetail(id ?? "");
//   const {
//     workers,
//     loading: workersLoading,
//     error: workersError,
//   } = useJobWorkers(id);

//   const [activeTab, setActiveTab] = useState<"detail" | "kandidat">("detail");

//   // ✅ Handler untuk approve (akan di-implementasi setelah endpoint dikirim)
//   const handleApprove = async (workerId: string) => {
//     console.log("🟢 Approve worker:", workerId);
//     // TODO: Call approve API
//     alert(`Approve worker ${workerId}`);
//   };

//   // ✅ Handler untuk reject (akan di-implementasi setelah endpoint dikirim)
//   const handleReject = async (workerId: string) => {
//     console.log("🔴 Reject worker:", workerId);
//     // TODO: Call reject API
//     alert(`Reject worker ${workerId}`);
//   };

//   // ✅ Helper function untuk cek apakah aksi ditampilkan
//   const shouldShowActions = (status: string) => {
//     const normalizedStatus = status.toUpperCase().trim();
//     // Show actions only for WAITING or WAITING LIST
//     return normalizedStatus === "WAITING" || normalizedStatus === "WAITING LIST";
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!jobDetail) return <p>Data tidak ditemukan</p>;

//   return (
//     <div className="space-y-6">
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-4 items-center justify-between">
//         <button
//           onClick={() => setActiveTab("detail")}
//           className={`px-4 py-2 -mb-px border-b-2 w-[50%] ${
//             activeTab === "detail"
//               ? "border-blue-600 text-blue-600 font-medium"
//               : "border-transparent text-gray-500"
//           }`}
//         >
//           Detail
//         </button>
//         <button
//           onClick={() => setActiveTab("kandidat")}
//           className={`ml-4 px-4 py-2 -mb-px border-b-2 w-[50%] ${
//             activeTab === "kandidat"
//               ? "border-blue-600 text-blue-600 font-medium"
//               : "border-transparent text-gray-500"
//           }`}
//         >
//           Kandidat
//         </button>
//       </div>

//       {/* Content */}
//       {activeTab === "detail" ? (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 justify-start text-left mt-6">
//             <div>
//               <div className="text-xl font-semibold mb-3">
//                 {jobDetail.roleName?.role ?? "-"}
//               </div>
//               <div className="flex items-center justify-between gap-3">
//                 {!workersLoading && workers.length === 0 ? (
//                   <>
//                     <span className="px-2 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-md border border-orange-600">
//                       Menunggu lamaran
//                     </span>
//                     <div className="flex gap-2 ml-auto">
//                       <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 w-full md:w-auto">
//                         <PencilLine className="w-4 h-4" />
//                         <span>Edit</span>
//                       </button>
//                       <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white w-full md:w-auto">
//                         <Trash2 className="w-4 h-4" />
//                         <span>Hapus</span>
//                       </button>
//                     </div>
//                   </>
//                 ) : !workersLoading && workers.length > 0 ? (
//                   <span className="px-2 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md border border-blue-600">
//                     Sedang berlangsung
//                   </span>
//                 ) : null}
//               </div>
//             </div>
//           </div>

//           {/* Detail Job Posting */}
//           <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               <FileText className="text-gray-600" size={20} />
//               <h3 className="text-md font-semibold">Detail Job Posting</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">ID</p>
//                 <p className="text-sm">{jobDetail.id ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Posting</p>
//                 <p className="text-sm">{jobDetail.createdAt ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Pekerja</p>
//                 <p className="text-sm">{jobDetail.totalPekerja ?? "-"}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
//                 <p className="text-sm">{jobDetail.tanggalKerja ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Jam Kerja</p>
//                 <p className="text-sm">{jobDetail.jamKerja ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Upah</p>
//                 <p className="text-sm">{jobDetail.salary ?? "-"}</p>
//               </div>
//             </div>

//             <div className="mt-6 justify-start">
//               <p className="text-sm text-gray-500 mb-2 text-start">Deskripsi</p>
//               <ul className="list-disc pl-5 space-y-1 text-start text-sm">
//                 {Array.isArray(jobDetail.description) &&
//                   jobDetail.description.map((d, i) => <li key={i}>{d}</li>)}
//               </ul>
//             </div>

//             <hr className="my-6" />
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               <h3 className="text-md font-semibold">Alamat</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
//                 <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
//                 <p className="text-sm text-gray-500 mb-1 mt-4">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <p className="text-sm">{jobDetail.alamat?.namaAlamat ?? "-"}</p>
//                 <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
//                 <p className="text-sm">
//                   {jobDetail.alamat?.detailAlamat ?? "-"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-2">Pin Lokasi</p>
//                 <div className="">
//                   <iframe
//                     title="Map"
//                     src={`https://www.google.com/maps?q=${
//                       jobDetail.alamat?.latLng?.lat ?? 0
//                     },${
//                       jobDetail.alamat?.latLng?.lng ?? 0
//                     }&hl=es;z=14&output=embed`}
//                     width="100%"
//                     height="100%"
//                     className="rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Data PIC */}
//           <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//             <div className="flex items-center gap-2 mb-6 justify-start">
//               <User className="text-gray-600" size={20} />
//               <h2 className="text-md font-semibold">Data PIC</h2>
//             </div>
//             {jobDetail.dataPIC ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nama Depan</p>
//                   <p className="text-sm">{jobDetail.dataPIC.namaPIC}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nama Belakang</p>
//                   <p className="text-sm">{jobDetail.dataPIC.namaPIC ?? "-"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Jabatan</p>
//                   <p className="text-sm">{jobDetail.dataPIC.posisi}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Email</p>
//                   <p className="text-sm">{jobDetail.dataPIC.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
//                   <p className="text-sm">{jobDetail.dataPIC.nomorTelepon}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">Data PIC belum tersedia</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         // ✅ Kandidat Tab - UPDATED
//         <div className="space-y-6">
//           <div className="overflow-x-auto border rounded-lg shadow-sm">
//             {workersLoading && <p className="p-4 text-gray-500">Loading kandidat...</p>}
//             {workersError && <p className="text-red-500 p-4">{workersError}</p>}
//             {!workersLoading && workers.length === 0 && (
//               <p className="p-4 text-gray-500 text-center">Tidak ada kandidat</p>
//             )}
//             {workers.length > 0 && (
//               <table className="min-w-full border-collapse">
//                 <thead className="bg-gray-100 text-left text-sm font-medium bg-white border-b">
//                   <tr>
//                     <th className="px-4 py-3">ID</th>
//                     <th className="px-4 py-3">Tanggal</th>
//                     <th className="px-4 py-3">Nama</th>
//                     <th className="px-4 py-3">Role</th>
//                     <th className="px-4 py-3">Alamat</th>
//                     <th className="px-4 py-3">Jenis Kelamin</th>
//                     <th className="px-4 py-3">Status</th>
//                     <th className="px-4 py-3 text-center">Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm bg-white text-left">
//                   {workers.map((w) => (
//                     <tr key={w.id} className="border-t hover:bg-gray-50">
//                       <td className="px-4 py-3">{w.id}</td>
//                       <td className="px-4 py-3">{w.createdAt}</td>
//                       <td className="px-4 py-3 font-medium">
//                         {w.user?.firstName + " " + w.user?.lastName}
//                       </td>
//                       <td className="px-4 py-3">{jobDetail.roleName?.role ?? "-"}</td>
//                       <td className="px-4 py-3">
//                         {w.user?.personalInfo?.userAddress?.name ?? "-"}
//                       </td>
//                       <td className="px-4 py-3">
//                         {w.user?.personalInfo?.gender ?? "-"}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={clsx(
//                             "px-2 py-1 rounded text-xs font-medium",
//                             {
//                               "bg-orange-100 text-orange-600": w.status?.toUpperCase() === "WAITING" || w.status === "Waiting List",
//                               "bg-blue-100 text-blue-600": w.status?.toUpperCase() === "APPROVED",
//                               "bg-red-100 text-red-600": w.status?.toUpperCase() === "REJECTED",
//                               "bg-gray-100 text-gray-600": !["WAITING", "Waiting List", "APPROVED", "REJECTED"].includes(w.status?.toUpperCase() ?? ""),
//                             }
//                           )}
//                         >
//                           {w.status ?? "-"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {/* ✅ Conditional Actions berdasarkan status */}
//                         {shouldShowActions(w.status ?? "") ? (
//                           <div className="flex gap-2 justify-center">
//                             <button
//                               onClick={() => handleApprove(w.id)}
//                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                               title="Approve"
//                               aria-label="Approve candidate"
//                             >
//                               <Check className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleReject(w.id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               title="Reject"
//                               aria-label="Reject candidate"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex justify-center">
//                             <span className="text-xs text-gray-400 italic">-</span>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, User, Trash2, PencilLine, Check, X } from "lucide-react";
import { clsx } from "clsx";
import { useJobDetail } from "../../hooks/useJobDetail";
import { useJobWorkers } from "../../hooks/useJobWorkers";
import ApproveWorkerModal from "./components/ApproveWorkerModal";
import RejectWorkerModal from "./components/RejectWorkerModal";
import { approveWorker, rejectWorker } from "@/services/jobWorkersService";

export default function ActiveDetail() {
  const { id } = useParams();
  const { jobDetail, loading, error } = useJobDetail(id ?? "");
  const {
    workers,
    loading: workersLoading,
    error: workersError,
    refetch: refetchWorkers,
  } = useJobWorkers(id);

  const [activeTab, setActiveTab] = useState<"detail" | "kandidat">("detail");

  // ✅ Modal states
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // ✅ Notification state
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ✅ Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // ✅ Handler untuk open approve modal
  const openApproveModal = (workerId: string, workerName: string) => {
    setSelectedWorker({ id: workerId, name: workerName });
    setApproveModalOpen(true);
  };

  // ✅ Handler untuk open reject modal
  const openRejectModal = (workerId: string, workerName: string) => {
    setSelectedWorker({ id: workerId, name: workerName });
    setRejectModalOpen(true);
  };

  // ✅ Handler untuk approve
  const handleApproveConfirm = async () => {
    if (!selectedWorker) return;

    try {
      const response = await approveWorker(selectedWorker.id);

      if (response.ok) {
        setNotification({
          type: "success",
          message:
            response.message || `${selectedWorker.name} berhasil diterima`,
        });

        // ✅ Refresh workers list
        await refetchWorkers();
      } else {
        throw new Error(response.message || "Gagal menerima kandidat");
      }
    } catch (err: any) {
      console.error("Error approving worker:", err);
      setNotification({
        type: "error",
        message: err?.message || "Terjadi kesalahan saat menerima kandidat",
      });
      throw err; // Re-throw untuk stop loading di modal
    }
  };

  // ✅ Handler untuk reject
  const handleRejectConfirm = async () => {
    if (!selectedWorker) return;

    try {
      const response = await rejectWorker(selectedWorker.id);

      if (response.ok) {
        setNotification({
          type: "success",
          message:
            response.message || `${selectedWorker.name} berhasil ditolak`,
        });

        // ✅ Refresh workers list
        await refetchWorkers();
      } else {
        throw new Error(response.message || "Gagal menolak kandidat");
      }
    } catch (err: any) {
      console.error("Error rejecting worker:", err);
      setNotification({
        type: "error",
        message: err?.message || "Terjadi kesalahan saat menolak kandidat",
      });
      throw err;
    }
  };

  // ✅ Helper function untuk cek apakah aksi ditampilkan
  // const shouldShowActions = (status: string) => {
  //   const normalizedStatus = status.toUpperCase().trim();
  //   return (
  //     normalizedStatus === "WAITING" || normalizedStatus === "WAITING LIST"
  //   );
  // };

  if (loading) return <p className="text-gray-500 p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!jobDetail)
    return <p className="text-gray-500 p-6">Data tidak ditemukan</p>;

  return (
    <div className="space-y-6">
      {/* ✅ Notification Banner */}
      {notification && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 animate-slide-down ${
            notification.type === "success"
              ? "bg-green-50 border-green-500"
              : "bg-red-50 border-red-500"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <X className="w-5 h-5 text-red-600" />
          )}
          <span
            className={`text-sm font-medium ${
              notification.type === "success"
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {notification.message}
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("detail")}
          className={`flex-1 px-4 py-3 -mb-px border-b-2 font-medium transition-colors ${
            activeTab === "detail"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setActiveTab("kandidat")}
          className={`flex-1 px-4 py-3 -mb-px border-b-2 font-medium transition-colors ${
            activeTab === "kandidat"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Kandidat
        </button>
      </div>

      {/* Content */}
      {activeTab === "detail" ? (
        <div className="space-y-6">
          {/* Job Header */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="text-xl font-semibold mb-3">
                {jobDetail.roleName?.role ?? "-"}
              </div>
              <div className="flex items-center justify-between gap-3">
                {!workersLoading && workers.length === 0 ? (
                  <>
                    <span className="px-3 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-md border border-orange-600">
                      Menunggu lamaran
                    </span>
                    <div className="flex gap-2 ml-auto">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        <PencilLine className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </>
                ) : !workersLoading && workers.length > 0 ? (
                  <span className="px-3 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md border border-blue-600">
                    Sedang berlangsung
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Detail Job Posting */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-gray-600" size={20} />
              <h3 className="text-md font-semibold">Detail Job Posting</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">ID</p>
                <p className="text-sm font-medium">{jobDetail.id ?? "-"}</p>
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
                <p className="text-sm font-semibold">
                  {jobDetail.salary ?? "-"}
                </p>
              </div>
            </div>

            <div className="mt-6 text-left">
              <p className="text-sm text-gray-500 mb-2">Deskripsi</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {Array.isArray(jobDetail.description) &&
                  jobDetail.description.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <hr className="my-6" />

            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-md font-semibold">Alamat</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-left">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
                  <p className="text-sm">
                    {jobDetail.alamat?.namaAlamat ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Nama Jalan, Kecamatan, Kota
                  </p>
                  <p className="text-sm">
                    {jobDetail.alamat?.namaAlamat ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Detail Alamat</p>
                  <p className="text-sm">
                    {jobDetail.alamat?.detailAlamat ?? "-"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Pin Lokasi</p>
                <div className="h-64 rounded-lg overflow-hidden border">
                  <iframe
                    title="Map"
                    src={`https://www.google.com/maps?q=${
                      jobDetail.alamat?.latLng?.lat ?? 0
                    },${
                      jobDetail.alamat?.latLng?.lng ?? 0
                    }&hl=es;z=14&output=embed`}
                    width="100%"
                    height="100%"
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data PIC */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-gray-600" size={20} />
              <h2 className="text-md font-semibold">Data PIC</h2>
            </div>
            {jobDetail.dataPIC ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 text-left">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Depan</p>
                  <p className="text-sm font-medium">
                    {jobDetail.dataPIC.namaPIC}
                  </p>
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
              <p className="text-gray-500 text-sm">Data PIC belum tersedia</p>
            )}
          </div>
        </div>
      ) : (
        // ✅ Kandidat Tab
        <div className="space-y-6">
          <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
            {workersLoading && (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 mt-2">Loading kandidat...</p>
              </div>
            )}

            {workersError && (
              <div className="p-8 text-center">
                <p className="text-red-500">{workersError}</p>
              </div>
            )}

            {!workersLoading && workers.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">Tidak ada kandidat</p>
              </div>
            )}

            {!workersLoading && workers.length > 0 && (
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-50 text-left text-sm font-medium border-b">
                  <tr>
                    <th className="px-4 py-3 text-gray-700">ID</th>
                    <th className="px-4 py-3 text-gray-700">Tanggal</th>
                    <th className="px-4 py-3 text-gray-700">Nama</th>
                    <th className="px-4 py-3 text-gray-700">Role</th>
                    <th className="px-4 py-3 text-gray-700">Alamat</th>
                    <th className="px-4 py-3 text-gray-700">Jenis Kelamin</th>
                    <th className="px-4 py-3 text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                {/* <tbody className="text-sm bg-white">
                  {workers.map((w) => {
                    const workerName = `${w.user?.firstName || ""} ${w.user?.lastName || ""}`.trim() || "Unknown";
                    
                    return (
                      <tr key={w.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">
                          {w.id}
                        </td>
                        <td className="px-4 py-3">{w.createdAt}</td>
                        <td className="px-4 py-3 font-medium">{workerName}</td>
                        <td className="px-4 py-3">{jobDetail.roleName?.role ?? "-"}</td>
                        <td className="px-4 py-3">
                          {w.user?.personalInfo?.userAddress?.name ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          {w.user?.personalInfo?.gender ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={clsx(
                              "px-2 py-1 rounded text-xs font-medium",
                              {
                                "bg-orange-100 text-orange-600": 
                                  w.status?.toUpperCase() === "WAITING" || w.status === "Waiting List",
                                "bg-blue-100 text-blue-600": 
                                  w.status?.toUpperCase() === "APPROVED",
                                "bg-red-100 text-red-600": 
                                  w.status?.toUpperCase() === "REJECTED",
                                "bg-gray-100 text-gray-600": 
                                  !["WAITING", "Waiting List", "APPROVED", "REJECTED"]
                                    .some(s => s.toUpperCase() === w.status?.toUpperCase()),
                              }
                            )}
                          >
                            {w.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {shouldShowActions(w.status ?? "-") ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => openApproveModal(w.id, workerName)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Terima kandidat"
                                aria-label={`Approve ${workerName}`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openRejectModal(w.id, workerName)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Tolak kandidat"
                                aria-label={`Reject ${workerName}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <span className="text-xs text-gray-400 italic">-</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody> */}
                <tbody className="text-sm bg-white">
                  {workers.map((w) => {
                    const workerName =
                      `${w.user?.firstName || ""} ${
                        w.user?.lastName || ""
                      }`.trim() || "Unknown";

                    // ✅ Determine display status based on conditions
                    const getDisplayStatus = () => {
                      // Kondisi 1: isAccepted = false & status = "WAITING" → Waiting List
                      if (
                        w.isAccepted === false &&
                        w.status?.toUpperCase() === "WAITING"
                      ) {
                        return {
                          label: "Waiting List",
                          className: "bg-orange-100 text-orange-600",
                          showActions: true,
                        };
                      }

                      // Kondisi 2: isAccepted = true & status = "WAITING" → Belum Dikonfirmasi
                      if (
                        w.isAccepted === true &&
                        w.status?.toUpperCase() === "WAITING"
                      ) {
                        return {
                          label: "Belum Dikonfirmasi",
                          className: "bg-blue-100 text-blue-600",
                          showActions: false,
                        };
                      }

                      // Kondisi 3: isAccepted = false OR isRejected = true OR status = "REJECTED" → Ditolak
                      if (
                        w.isAccepted === false ||
                        w.isRejected === true ||
                        w.status?.toUpperCase() === "REJECTED"
                      ) {
                        return {
                          label: "Ditolak",
                          className: "bg-red-100 text-red-600",
                          showActions: false,
                        };
                      }

                      // Default fallback
                      return {
                        label: w.status || "-",
                        className: "bg-gray-100 text-gray-600",
                        showActions: false,
                      };
                    };

                    const displayStatus = getDisplayStatus();

                    return (
                      <tr
                        key={w.id}
                        className="border-t hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          {w.id}
                        </td>
                        <td className="px-4 py-3">{w.createdAt}</td>
                        <td className="px-4 py-3 font-medium">{workerName}</td>
                        <td className="px-4 py-3">
                          {jobDetail.roleName?.role ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          {w.user?.personalInfo?.userAddress?.name ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          {w.user?.personalInfo?.gender ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={clsx(
                              "px-2 py-1 rounded text-xs font-medium",
                              displayStatus.className
                            )}
                          >
                            {displayStatus.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {displayStatus.showActions ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() =>
                                  openApproveModal(w.id, workerName)
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Terima kandidat"
                                aria-label={`Approve ${workerName}`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  openRejectModal(w.id, workerName)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Tolak kandidat"
                                aria-label={`Reject ${workerName}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <span className="text-xs text-gray-400 italic">
                                -
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ✅ Modals */}
      <ApproveWorkerModal
        isOpen={approveModalOpen}
        onClose={() => {
          setApproveModalOpen(false);
          setSelectedWorker(null);
        }}
        onConfirm={handleApproveConfirm}
        workerName={selectedWorker?.name}
      />

      <RejectWorkerModal
        isOpen={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedWorker(null);
        }}
        onConfirm={handleRejectConfirm}
        workerName={selectedWorker?.name}
      />
    </div>
  );
}
