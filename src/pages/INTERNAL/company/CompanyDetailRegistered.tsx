// import { useState, type JSX } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   AlertTriangle,
//   FileText,
//   CreditCard,
//   User,
//   ExternalLink,
//   ArrowLeft,
//   Clock,
// } from "lucide-react";
// import { useCompanyIntDetail } from "@/hooks/internal/useCompanyIntDetail";
// import VerifyNPWPModal from "./components/VerifyNpwpModal";

// function formatDate(s?: string) {
//   if (!s) return "-";
//   return new Date(s).toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function CompanyDetailRegistered(): JSX.Element {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { companyDetail, loading, error, refetch } = useCompanyIntDetail(id);

//   const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

//   if (loading) return <p className="text-gray-500">Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!companyDetail)
//     return <p className="text-gray-500">Data tidak ditemukan</p>;

//   const npwpStatus =
//     companyDetail.companyVerificationFile?.npwpStatus ?? "PROCESS";

//   const handleVerifyNpwp = async (isApproved: boolean, reason?: string) => {
//     try {
//       // TODO: Call API endpoint here
//       console.log("Verify NPWP:", {
//         companyId: companyDetail.id,
//         isApproved,
//         reason,
//       });

//       // Show success message
//       alert(
//         isApproved
//           ? "NPWP berhasil diverifikasi!"
//           : `NPWP ditolak. Alasan: ${reason}`
//       );

//       // Refresh data
//       await refetch();
//     } catch (err: any) {
//       alert(err?.message || "Terjadi kesalahan saat memverifikasi NPWP");
//       throw err;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Top bar */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <div className="relative w-full md:w-1/3">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-sm text-gray-600"
//           >
//             <ArrowLeft className="w-4 h-4" /> Kembali
//           </button>
//         </div>

//         {/* <div className="flex items-center gap-2">
//           <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 bg-white">
//             <CirclePause className="w-4 h-4" />
//             <span>Suspend</span>
//           </button>
//           <button className="flex items-center gap-2 px-3 py-2 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-50 bg-white">
//             <Ban className="w-4 h-4" />
//             <span>Blokir</span>
//           </button>
//         </div> */}
//       </div>

//       {/* Header box with Alert Inside */}
//       <div className="bg-white rounded-lg border p-6">
//         {/* Title */}
//         <h2 className="text-lg font-semibold mb-4 text-left">
//           Profil Perusahaan
//         </h2>

//         {/* Content divided into left and right */}
//         <div className="flex items-start justify-between gap-4 mb-4">
//           {/* Left side: Image + Company Info */}
//           <div className="flex items-start gap-4">
//             <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border">
//               <img
//                 src={
//                   companyDetail.companyLogoUrl || "/images/default-company.png"
//                 }
//                 alt={companyDetail.name}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>

//             <div className="text-left">
//               <div className="text-xs text-gray-500 mb-1">
//                 JD{companyDetail.id?.slice(0, 4).toUpperCase()}
//               </div>
//               <div className="text-xl font-semibold leading-tight">
//                 {companyDetail.name}
//               </div>
//               <div className="text-sm text-gray-500 mt-1">
//                 {companyDetail.email}
//               </div>
//             </div>
//           </div>

//           {/* Right side: Last Login + Status */}
//           <div className="flex items-start gap-6">
//             {/* Last Login */}
//             <div className="flex flex-col items-start">
//               <div className="text-xs text-gray-500 mb-1">TERAKHIR LOGIN</div>
//               <div className="text-xs">
//                 {formatDate(companyDetail.lastLoginAt)}
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex flex-col items-start">
//               <div className="text-xs text-gray-500 mb-1">STATUS</div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-green-600"></span>
//                 <span className="text-xs text-black font-medium">
//                   Registered
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Warning Alert - Inside Card */}
//         <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
//           <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//           <div className="flex-1 text-left ms-4">
//             <div className="font-semibold text-amber-800 text-sm">
//               Verifikasi Berkas Diperlukan!
//             </div>
//             <div className="text-sm text-amber-700 mt-1">
//               Segera lakukan verifikasi berkas yang telah diunggah oleh
//               perusahaan.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Data PIC */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <User className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data PIC</h3>
//         </div>

//         {companyDetail.pic ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//             <div>
//               <p className="text-xs text-gray-500">Nama Depan</p>
//               <p className="font-medium">
//                 {companyDetail.pic.firstName ?? "-"}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nama Belakang</p>
//               <p>{companyDetail.pic.lastName ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Jabatan</p>
//               <p>{companyDetail.pic.position ?? "-"}</p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-500">Email</p>
//               <p>{companyDetail.pic.email ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nomor Telepon PIC</p>
//               <p>{companyDetail.pic.phoneNumber ?? "-"}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">PIC belum tersedia</p>
//         )}
//       </section>

//       {/* Data Perusahaan */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <FileText className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data Perusahaan</h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//           <div>
//             <p className="text-xs text-gray-500">Nomor Telepon Perusahaan</p>
//             <p>{companyDetail.companyProfile?.phoneNumber ?? "-"}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Jenis Industri</p>
//             <p>{companyDetail.companyProfile?.industry ?? "-"}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Website Perusahaan</p>
//             <p>
//               {companyDetail.companyProfile?.webUrl ? (
//                 <a
//                   href={companyDetail.companyProfile.webUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-black inline-flex items-center gap-2"
//                 >
//                   {companyDetail.companyProfile.webUrl}
//                   <ExternalLink size={16} className="text-blue-600" />
//                 </a>
//               ) : (
//                 "-"
//               )}
//             </p>
//           </div>

//           <div className="md:col-span-3">
//             <div className="w-full bg-indigo-50 p-2 text-md font-semibold text-indigo-700 rounded-lg mb-6">
//               <p>Alamat</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
//               <div>
//                 <p className="text-xs text-gray-500">Nama Alamat</p>
//                 <p>{companyDetail.companyProfile?.about ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <p>{companyDetail.companyProfile?.webUrl ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Detail Alamat</p>
//                 <p>-</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Bank Info */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <CreditCard className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data Rekening Bank</h3>
//         </div>

//         {companyDetail.companyBankInformation ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//             <div>
//               <p className="text-xs text-gray-500">Nama Bank</p>
//               <p>{companyDetail.companyBankInformation.bankId ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nomor Rekening</p>
//               <p>{companyDetail.companyBankInformation.accountNumber ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nama Pemilik Rekening</p>
//               <p>{companyDetail.companyBankInformation.accountOwner ?? "-"}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">Informasi bank belum tersedia</p>
//         )}
//       </section>

//       {/* Verification */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <FileText className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Verifikasi</h3>
//         </div>

//         {/* Alert - Waiting for Verification */}
//         <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6 flex items-center gap-3">
//           <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
//           <span className="text-sm text-amber-800">
//             Menunggu verifikasi dokumen — segera verifikasi berkas yang telah
//             diunggah.
//           </span>
//         </div>

//         {/* NPWP Section */}
//         <div className="space-y-3">
//           <p className="text-xs text-gray-500 uppercase tracking-wider text-left">
//             NPWP
//           </p>

//           <div className="flex items-center gap-3 w-1/2">
//             {/* Card File */}
//             <div className="flex items-center gap-2 p-2 border rounded-lg bg-white flex-1">
//               <div className="rounded-sm bg-blue-100 px-2 py-2">
//                 <FileText className="h-5 w-5 text-blue-700" />
//               </div>

//               <div className="flex items-center justify-between w-full">
//                 {companyDetail.companyVerificationFile?.npwpUrl ? (
//                   <>
//                     <div className="flex-1 min-w-0 text-left">
//                       <p className="text-sm font-medium text-gray-900 truncate">
//                         NPWP_{companyDetail.name?.slice(0, 6)}.jpg
//                       </p>
//                       <p className="text-xs text-gray-500">1.8 MB</p>
//                     </div>
//                     <span
//                       className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 ${
//                         npwpStatus === "PROCESS"
//                           ? "bg-amber-50 text-amber-700 border-amber-200"
//                           : npwpStatus === "SUCCESS"
//                           ? "bg-green-50 text-green-700 border-green-200"
//                           : "bg-red-50 text-red-700 border-red-200"
//                       }`}
//                       style={{
//                         marginLeft: "auto",
//                         height: "auto",
//                         width: "auto",
//                         alignSelf: "center",
//                       }}
//                     >
//                       {npwpStatus === "PROCESS"
//                         ? "Menunggu Tindakan"
//                         : npwpStatus === "SUCCESS"
//                         ? "Sesuai"
//                         : "Ditolak"}
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-sm text-gray-400 italic text-start px-3 me-4">
//                       Belum ada bukti
//                       <br /> 0.0 MB
//                     </p>
//                     <span
//                       className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400 ml-2"
//                       style={{
//                         marginLeft: "auto",
//                         height: "auto",
//                         width: "auto",
//                         alignSelf: "center",
//                       }}
//                     >
//                       Kosong
//                     </span>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Icon - Open Modal if PROCESS, else External Link */}
//             {companyDetail.companyVerificationFile?.npwpUrl ? (
//               npwpStatus === "PROCESS" ? (
//                 <button
//                   onClick={() => setIsVerifyModalOpen(true)}
//                   title="Verifikasi NPWP"
//                   className="flex-shrink-0"
//                 >
//                   <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
//                 </button>
//               ) : (
//                 <a
//                   href={companyDetail.companyVerificationFile.npwpUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   title="Lihat NPWP"
//                 >
//                   <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
//                 </a>
//               )
//             ) : (
//               <ExternalLink className="h-5 w-5 text-gray-400 cursor-not-allowed" />
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Add Modal */}
//       <VerifyNPWPModal
//         isOpen={isVerifyModalOpen}
//         onClose={() => setIsVerifyModalOpen(false)}
//         companyName={companyDetail.name ?? "-"}
//         npwpNumber={companyDetail.companyVerificationFile?.npwp ?? "-"}
//         npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl ?? "-"}
//         onVerify={handleVerifyNpwp}
//       />
//     </div>
//   );
// }

// import React, { type JSX } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   AlertTriangle,
//   FileText,
//   CreditCard,
//   User,
//   ExternalLink,
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";
// import { useCompanyIntDetail } from "@/hooks/internal/useCompanyIntDetail";
// import VerifyNPWPModal from "./components/VerifyNpwpModal";
// import RevisionConfirmModal from "./components/RevisionConfirmModal";
// import NPWPDetailModal from "./components/NpwpDetailModal";
// import VerifyAccountModal from "./components/VerifyAccountModal";
// import { verifyCompanyNPWP } from "@/services/internal/companyIntDetailService";
// import { activateCompany } from "@/services/internal/companyInternalService";

// function formatDate(s?: string) {
//   if (!s) return "-";
//   return new Date(s).toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function formatFullDate(s?: string) {
//   if (!s) return "-";
//   return new Date(s).toLocaleDateString("id-ID", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// export default function CompanyDetailRegistered(): JSX.Element {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { companyDetail, loading, error, refetch } = useCompanyIntDetail(id);

//   const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false);
//   const [isRevisionModalOpen, setIsRevisionModalOpen] = React.useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false); // NEW
//   const [isVerifyAccountModalOpen, setIsVerifyAccountModalOpen] =
//     React.useState(false); // NEW
//   const [revisionLoading, setRevisionLoading] = React.useState(false);
//   const [accountVerifyLoading, setAccountVerifyLoading] = React.useState(false); // NEW
//   const [notification, setNotification] = React.useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   // Auto-hide notification after 5 seconds
//   React.useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   if (loading) return <p className="text-gray-500">Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!companyDetail)
//     return <p className="text-gray-500">Data tidak ditemukan</p>;

//   const npwpStatus =
//     companyDetail.companyVerificationFile?.npwpStatus ?? "PROCESS";

//   const rejectionReason = companyDetail.npwpRejectionReason;

//   // Check if in revision state
//   const isRevisionState = npwpStatus === "FAIL" && !!rejectionReason;

//   // Check if already verified (SUCCESS or FAIL with reason)
//   const isVerified = npwpStatus === "SUCCESS" || isRevisionState;

//   // Check if NPWP is approved (SUCCESS)
//   const isNPWPApproved = npwpStatus === "SUCCESS";

//   // Check if account is already verified/activated
//   const isAccountVerified =
//     companyDetail.isActive === true && companyDetail.isVerified === true; // Adjust based on your actual field

//   // Count days since rejection (for display)
//   const daysSinceRejection = rejectionReason ? 1 : 0; // You can calculate from actual date

//   // Handler for verify NPWP
//   const handleVerifyNPWP = async (isApproved: boolean, reason?: string) => {
//     try {
//       if (!companyDetail?.id) {
//         throw new Error("Company ID tidak ditemukan");
//       }

//       const payload = isApproved
//         ? { status: "SUCCESS" as const }
//         : {
//             status: "FAIL" as const,
//             rejectionReason: reason || "Dokumen tidak sesuai",
//           };

//       const response = await verifyCompanyNPWP(companyDetail.id, payload);

//       if (response.ok) {
//         setNotification({
//           type: "success",
//           message: isApproved
//             ? `NPWP ${companyDetail.name} berhasil diverifikasi!`
//             : `NPWP ${companyDetail.name} ditolak`,
//         });

//         // Refresh data
//         refetch();
//       } else {
//         throw new Error(response.message || "Gagal memverifikasi NPWP");
//       }
//     } catch (err: any) {
//       setNotification({
//         type: "error",
//         message: err?.message || "Terjadi kesalahan saat memverifikasi NPWP",
//       });
//       throw err;
//     }
//   };

//   // Handler for approve revision
//   const handleApproveRevision = async () => {
//     try {
//       if (!companyDetail?.id) {
//         throw new Error("Company ID tidak ditemukan");
//       }

//       setRevisionLoading(true);

//       const payload = { status: "SUCCESS" as const };
//       const response = await verifyCompanyNPWP(companyDetail.id, payload);

//       if (response.ok) {
//         setNotification({
//           type: "success",
//           message: `Revisi NPWP ${companyDetail.name} berhasil diverifikasi!`,
//         });

//         setIsRevisionModalOpen(false);
//         refetch();
//       } else {
//         throw new Error(response.message || "Gagal memverifikasi revisi NPWP");
//       }
//     } catch (err: any) {
//       setNotification({
//         type: "error",
//         message:
//           err?.message || "Terjadi kesalahan saat memverifikasi revisi NPWP",
//       });
//     } finally {
//       setRevisionLoading(false);
//     }
//   };

//   // Handler for approve revision
//   const handleNpwpRevision = async () => {
//     try {
//       if (!companyDetail?.id) {
//         throw new Error("Company ID tidak ditemukan");
//       }

//       setRevisionLoading(true);

//       const payload = { status: "PROCESS" as const };
//       const response = await verifyCompanyNPWP(companyDetail.id, payload);

//       if (response.ok) {
//         setNotification({
//           type: "success",
//           message: `Revisi NPWP ${companyDetail.name} berhasil diverifikasi!`,
//         });

//         setIsRevisionModalOpen(false);
//         refetch();
//       } else {
//         throw new Error(response.message || "Gagal memverifikasi revisi NPWP");
//       }
//     } catch (err: any) {
//       setNotification({
//         type: "error",
//         message:
//           err?.message || "Terjadi kesalahan saat memverifikasi revisi NPWP",
//       });
//     } finally {
//       setRevisionLoading(false);
//     }
//   };

//   // Handler for verify/activate account - NEW
//   const handleVerifyAccount = async () => {
//     try {
//       if (!companyDetail?.id) {
//         throw new Error("Company ID tidak ditemukan");
//       }

//       setAccountVerifyLoading(true);

//       await activateCompany(companyDetail.id);

//       setNotification({
//         type: "success",
//         message: `${companyDetail.name} berhasil diverifikasi!`,
//       });

//       setIsVerifyAccountModalOpen(false);
//       refetch();
//     } catch (err: any) {
//       setNotification({
//         type: "error",
//         message: err?.message || "Terjadi kesalahan saat memverifikasi akun",
//       });
//     } finally {
//       setAccountVerifyLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Notification Banner */}
//       {notification && (
//         <div
//           className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${
//             notification.type === "success"
//               ? "bg-green-50 border-green-500"
//               : "bg-red-50 border-red-500"
//           }`}
//         >
//           {notification.type === "success" ? (
//             <CheckCircle className="w-5 h-5 text-green-600" />
//           ) : (
//             <XCircle className="w-5 h-5 text-red-600" />
//           )}
//           <span
//             className={`text-sm font-medium ${
//               notification.type === "success"
//                 ? "text-green-800"
//                 : "text-red-800"
//             }`}
//           >
//             {notification.message}
//           </span>
//         </div>
//       )}

//       {/* Top bar */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <div className="relative w-full md:w-1/3">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-sm text-gray-600"
//           >
//             <ArrowLeft className="w-4 h-4" /> Kembali
//           </button>
//         </div>
//       </div>

//       {/* Account Verified Alert - Show if account is verified - NEW */}
//       {isAccountVerified && (
//         <div className="bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 flex items-center gap-3">
//           <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
//           <span className="text-sm text-blue-800 font-medium">
//             {companyDetail.name} berhasil diverifikasi!
//           </span>
//         </div>
//       )}

//       {/* Header box with Alert Inside */}
//       <div className="bg-white rounded-lg border p-6">
//         {/* Title */}
//         <h2 className="text-lg font-semibold mb-4 text-left">
//           Profil Perusahaan
//         </h2>

//         {/* Content divided into left and right */}
//         <div className="flex items-start justify-between gap-4 mb-4">
//           {/* Left side: Image + Company Info */}
//           <div className="flex items-start gap-4">
//             <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border">
//               <img
//                 src={
//                   companyDetail.companyLogoUrl || "/images/default-company.png"
//                 }
//                 alt={companyDetail.name}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>

//             <div className="text-left">
//               <div className="text-xs text-gray-500 mb-1">
//                 JD{companyDetail.id?.slice(0, 4).toUpperCase()}
//               </div>
//               <div className="text-xl font-semibold leading-tight">
//                 {companyDetail.name}
//               </div>
//               <div className="text-sm text-gray-500 mt-1">
//                 {companyDetail.email}
//               </div>
//             </div>
//           </div>

//           {/* Right side: Last Login + Status */}
//           <div className="flex items-start gap-6">
//             {/* Last Login */}
//             <div className="flex flex-col items-start">
//               <div className="text-xs text-gray-500 mb-1">TERAKHIR LOGIN</div>
//               <div className="text-xs">
//                 {formatDate(companyDetail.lastLoginAt)}
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex flex-col items-start">
//               <div className="text-xs text-gray-500 mb-1">STATUS</div>
//               <div className="flex items-center gap-2">
//                 <span className={`w-2 h-2 rounded-full ${isAccountVerified ? 'bg-green-600' : 'bg-amber-600'}`}></span>
//                 <span className="text-xs text-black font-medium">
//                   {isAccountVerified ? 'Verified' : 'Registered'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Warning Alert - Inside Card */}
//         {/* <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
//           <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//           <div className="flex-1 text-left ms-4">
//             <div className="font-semibold text-amber-800 text-sm">
//               Verifikasi Berkas Diperlukan!
//             </div>
//             <div className="text-sm text-amber-700 mt-1">
//               Segera lakukan verifikasi berkas yang telah diunggah oleh
//               perusahaan.
//             </div>
//           </div>
//         </div> */}

//         {/* Conditional Alert */}
//         {npwpStatus === "PROCESS" && (
//           <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
//             <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1 text-left ms-4">
//               <div className="font-semibold text-amber-800 text-sm">
//                 Verifikasi Berkas Diperlukan!
//               </div>
//               <div className="text-sm text-amber-700 mt-1">
//                 Segera lakukan verifikasi berkas yang telah diunggah oleh
//                 perusahaan.
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Data PIC */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <User className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data PIC</h3>
//         </div>

//         {companyDetail.pic ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//             <div>
//               <p className="text-xs text-gray-500">Nama Depan</p>
//               <p className="font-medium">
//                 {companyDetail.pic.firstName ?? "-"}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nama Belakang</p>
//               <p>{companyDetail.pic.lastName ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Jabatan</p>
//               <p>{companyDetail.pic.position ?? "-"}</p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-500">Email</p>
//               <p>{companyDetail.pic.email ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nomor Telepon PIC</p>
//               <p>{companyDetail.pic.phoneNumber ?? "-"}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">PIC belum tersedia</p>
//         )}
//       </section>

//       {/* Data Perusahaan */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <FileText className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data Perusahaan</h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//           <div>
//             <p className="text-xs text-gray-500">Nomor Telepon Perusahaan</p>
//             <p>{companyDetail.companyProfile?.phoneNumber ?? "-"}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Jenis Industri</p>
//             <p>{companyDetail.companyProfile?.industry ?? "-"}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500">Website Perusahaan</p>
//             <p>
//               {companyDetail.companyProfile?.webUrl ? (
//                 <a
//                   href={companyDetail.companyProfile.webUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-black inline-flex items-center gap-2"
//                 >
//                   {companyDetail.companyProfile.webUrl}
//                   <ExternalLink size={16} className="text-blue-600" />
//                 </a>
//               ) : (
//                 "-"
//               )}
//             </p>
//           </div>

//           <div className="md:col-span-3">
//             <div className="w-full bg-indigo-50 p-2 text-md font-semibold text-indigo-700 rounded-lg mb-6">
//               <p>Alamat</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
//               <div>
//                 <p className="text-xs text-gray-500">Nama Alamat</p>
//                 <p>{companyDetail.companyProfile?.about ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <p>{companyDetail.companyProfile?.webUrl ?? "-"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Detail Alamat</p>
//                 <p>-</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Bank Info */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <CreditCard className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Data Rekening Bank</h3>
//         </div>

//         {companyDetail.companyBankInformation ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
//             <div>
//               <p className="text-xs text-gray-500">Nama Bank</p>
//               <p>{companyDetail.companyBankInformation.bankId ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nomor Rekening</p>
//               <p>{companyDetail.companyBankInformation.accountNumber ?? "-"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Nama Pemilik Rekening</p>
//               <p>{companyDetail.companyBankInformation.accountOwner ?? "-"}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">Informasi bank belum tersedia</p>
//         )}
//       </section>

//       {/* Verification Section */}
//       <section className="bg-white rounded-lg border p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <FileText className="text-gray-600" size={18} />
//           <h3 className="font-semibold">Verifikasi</h3>
//         </div>

//         {/* Conditional Alert Based on Status */}
//         {npwpStatus === "SUCCESS" ? (
//           <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
//               <span className="text-sm text-blue-800">
//                 Dokumen sesuai ({isVerified ? 1 : 0} dari 1)
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 // TODO: Trigger company account verification
//                 console.log("Trigger company account verification");
//               }}
//               className="px-4 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
//             >
//               Verifikasi
//             </button>
//           </div>
//         ) : isRevisionState ? (
//           <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
//               <span className="text-sm text-blue-800">
//                 Dokumen sesuai (0 dari {daysSinceRejection})
//               </span>
//             </div>
//             <button
//               onClick={() => setIsRevisionModalOpen(true)}
//               className="px-4 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
//             >
//               Revisi
//             </button>
//           </div>
//         ) : npwpStatus === "PROCESS" ? (
//           <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6 flex items-center gap-3">
//             <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
//             <span className="text-sm text-amber-800">
//               Menunggu verifikasi dokumen — segera verifikasi berkas yang telah
//               diunggah.
//             </span>
//           </div>
//         ) : null}

//         {/* NPWP Section */}
//         <div className="space-y-3">
//           <p className="text-xs text-gray-500 uppercase tracking-wider text-left">
//             NPWP
//           </p>

//           {/* <div className="flex items-center gap-3 w-1/2">
//             <div className="flex items-center gap-2 p-2 border rounded-lg bg-white flex-1"> */}

//           <div className="flex items-center gap-3 w-1/2">
//             <div className="flex flex-col gap-2 p-2 border rounded-lg bg-white flex-1">
//               <div className="flex items-center gap-2">
//                 <div className="rounded-sm bg-blue-100 px-2 py-2">
//                   <FileText className="h-5 w-5 text-blue-700" />
//                 </div>

//                 <div className="flex items-center justify-between w-full">
//                   {companyDetail.companyVerificationFile?.npwpUrl ? (
//                     <>
//                       <div className="flex-1 min-w-0 text-left">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           NPWP_{companyDetail.name?.slice(0, 6)}.jpg
//                         </p>
//                         <p className="text-xs text-gray-500">1.4 MB</p>
//                       </div>
//                       <span
//                         className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 ${
//                           npwpStatus === "PROCESS"
//                             ? "bg-amber-50 text-amber-700 border-amber-200"
//                             : npwpStatus === "SUCCESS"
//                             ? "bg-green-50 text-green-700 border-green-200"
//                             : isRevisionState
//                             ? "bg-orange-50 text-orange-700 border-orange-200"
//                             : "bg-red-50 text-red-700 border-red-200"
//                         }`}
//                         style={{
//                           marginLeft: "auto",
//                           height: "auto",
//                           width: "auto",
//                           alignSelf: "center",
//                         }}
//                       >
//                         {npwpStatus === "PROCESS"
//                           ? "Menunggu Tindakan"
//                           : npwpStatus === "SUCCESS"
//                           ? "Sesuai"
//                           : isRevisionState
//                           ? "Revisi"
//                           : "Ditolak"}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-sm text-gray-400 italic text-start px-3 me-4">
//                         Belum ada bukti
//                         <br /> 0.0 MB
//                       </p>
//                       <span
//                         className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400 ml-2"
//                         style={{
//                           marginLeft: "auto",
//                           height: "auto",
//                           width: "auto",
//                           alignSelf: "center",
//                         }}
//                       >
//                         Kosong
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Show Rejection Reason if Revision State */}
//               {isRevisionState && rejectionReason && (
//                 <div className="p-3 border-t border-gray-200">
//                   <p className="text-xs text-left text-gray-400 mb-1">Alasan</p>
//                   <p className="text-sm text-left">{rejectionReason}</p>
//                 </div>
//               )}
//             </div>

//             {/* Icon Logic */}
//             {companyDetail.companyVerificationFile?.npwpUrl ? (
//               npwpStatus === "PROCESS" ? (
//                 // PROCESS: Open Verify Modal
//                 <button
//                   onClick={() => setIsVerifyModalOpen(true)}
//                   title="Verifikasi NPWP"
//                   className="flex-shrink-0"
//                 >
//                   <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
//                 </button>
//               ) : isVerified ? (
//                 // SUCCESS or FAIL with reason: Open Detail Modal
//                 <button
//                   onClick={() => setIsDetailModalOpen(true)}
//                   title="Lihat Detail NPWP"
//                   className="flex-shrink-0"
//                 >
//                   <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
//                 </button>
//               ) : (
//                 // Other cases: Open in new tab
//                 <a
//                   href={companyDetail.companyVerificationFile.npwpUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   title="Lihat NPWP"
//                 >
//                   <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
//                 </a>
//               )
//             ) : (
//               <ExternalLink className="h-5 w-5 text-gray-400 cursor-not-allowed" />
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Revision Confirm Modal */}
//       <RevisionConfirmModal
//         isOpen={isRevisionModalOpen}
//         onClose={() => setIsRevisionModalOpen(false)}
//         onConfirm={handleNpwpRevision}
//         loading={revisionLoading}
//       />
//       {/* Verify NPWP Modal */}
//       <VerifyNPWPModal
//         isOpen={isVerifyModalOpen}
//         onClose={() => setIsVerifyModalOpen(false)}
//         companyName={companyDetail.name ?? "-"}
//         npwpNumber={companyDetail.companyVerificationFile?.npwp ?? "-"}
//         npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl}
//         onVerify={handleVerifyNPWP}
//       />
//       {/* NPWP Detail Modal - NEW */}
//       <NPWPDetailModal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         companyName={companyDetail.name ?? "-"}
//         npwpNumber={companyDetail.companyVerificationFile?.npwp}
//         npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl}
//         status={npwpStatus as "SUCCESS" | "FAIL"}
//         rejectionReason={rejectionReason ?? "-"}
//       />
//     </div>
//   );
// }


import React, { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  FileText,
  CreditCard,
  User,
  ExternalLink,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useCompanyIntDetail } from "@/hooks/internal/useCompanyIntDetail";
import VerifyNPWPModal from "./components/VerifyNpwpModal";
import RevisionConfirmModal from "./components/RevisionConfirmModal";
import NPWPDetailModal from "./components/NpwpDetailModal";
import VerifyAccountModal from "./components/VerifyAccountModal";
import { verifyCompanyNPWP } from "@/services/internal/companyIntDetailService";
import { activateCompany } from "@/services/internal/companyInternalService";

function formatDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatFullDate(s?: string) {
  if (!s) return "-";
  return new Date(s).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CompanyDetailRegistered(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companyDetail, loading, error, refetch } = useCompanyIntDetail(id);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = React.useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [isVerifyAccountModalOpen, setIsVerifyAccountModalOpen] = React.useState(false);
  const [revisionLoading, setRevisionLoading] = React.useState(false);
  const [accountVerifyLoading, setAccountVerifyLoading] = React.useState(false);
  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-hide notification after 5 seconds
  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!companyDetail)
    return <p className="text-gray-500">Data tidak ditemukan</p>;

  const npwpStatus =
    companyDetail.companyVerificationFile?.npwpStatus ?? "PROCESS";

  const rejectionReason = companyDetail.npwpRejectionReason;

  // Check if in revision state
  const isRevisionState = npwpStatus === "FAIL" && !!rejectionReason;

  // Check if already verified (SUCCESS or FAIL with reason)
  const isVerified = npwpStatus === "SUCCESS" || isRevisionState;

  // Check if NPWP is approved (SUCCESS)
  const isNPWPApproved = npwpStatus === "SUCCESS";

  // Check if account is already verified/activated
  const isAccountVerified =
    companyDetail.isActive === true && companyDetail.isVerified === true;

  // Count days since rejection (for display)
  const daysSinceRejection = rejectionReason ? 1 : 0;

  // Handler for verify NPWP
  const handleVerifyNPWP = async (isApproved: boolean, reason?: string) => {
    try {
      if (!companyDetail?.id) {
        throw new Error("Company ID tidak ditemukan");
      }

      const payload = isApproved
        ? { status: "SUCCESS" as const }
        : {
            status: "FAIL" as const,
            rejectionReason: reason || "Dokumen tidak sesuai",
          };

      const response = await verifyCompanyNPWP(companyDetail.id, payload);

      if (response.ok) {
        setNotification({
          type: "success",
          message: isApproved
            ? `NPWP ${companyDetail.name} berhasil diverifikasi!`
            : `NPWP ${companyDetail.name} ditolak`,
        });

        refetch();
      } else {
        throw new Error(response.message || "Gagal memverifikasi NPWP");
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err?.message || "Terjadi kesalahan saat memverifikasi NPWP",
      });
      throw err;
    }
  };

  // Handler for approve revision (set status back to SUCCESS)
  const handleNPWPRevision = async () => {
    try {
      if (!companyDetail?.id) {
        throw new Error("Company ID tidak ditemukan");
      }

      setRevisionLoading(true);

      const payload = { status: "PROCESS" as const,
            rejectionReason: "", };
      const response = await verifyCompanyNPWP(companyDetail.id, payload);

      if (response.ok) {
        setNotification({
          type: "success",
          message: `Revisi NPWP ${companyDetail.name} berhasil diverifikasi!`,
        });

        setIsRevisionModalOpen(false);
        refetch();
      } else {
        throw new Error(response.message || "Gagal memverifikasi revisi NPWP");
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message:
          err?.message || "Terjadi kesalahan saat memverifikasi revisi NPWP",
      });
    } finally {
      setRevisionLoading(false);
    }
  };

  // Handler for verify/activate account
  const handleVerifyAccount = async () => {
    try {
      if (!companyDetail?.id) {
        throw new Error("Company ID tidak ditemukan");
      }

      setAccountVerifyLoading(true);

      await activateCompany(companyDetail.id);

      setNotification({
        type: "success",
        message: `${companyDetail.name} berhasil diverifikasi!`,
      });

      setIsVerifyAccountModalOpen(false);
      refetch();
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err?.message || "Terjadi kesalahan saat memverifikasi akun",
      });
    } finally {
      setAccountVerifyLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Banner */}
      {notification && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${
            notification.type === "success"
              ? "bg-green-50 border-green-500"
              : "bg-red-50 border-red-500"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
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
      </div>

      {/* Account Verified Alert - Show if account is verified */}
      {isAccountVerified && (
        <div className="bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="text-sm text-blue-800 font-medium">
            {companyDetail.name} berhasil diverifikasi!
          </span>
        </div>
      )}

      {/* Header box with Alert Inside */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4 text-left">
          Profil Perusahaan
        </h2>

        <div className="flex items-start justify-between gap-4 mb-4">
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

          <div className="flex items-start gap-6">
            <div className="flex flex-col items-start">
              <div className="text-xs text-gray-500 mb-1">TERAKHIR LOGIN</div>
              <div className="text-xs">
                {formatDate(companyDetail.lastLoginAt)}
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="text-xs text-gray-500 mb-1">STATUS</div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isAccountVerified ? "bg-green-600" : "bg-green-600"
                  }`}
                ></span>
                <span className="text-xs text-black font-medium">
                  {isAccountVerified ? "Verified" : "Registered"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Alert - Only show if PROCESS */}
        {npwpStatus === "PROCESS" && !isAccountVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-left ms-4">
              <div className="font-semibold text-amber-800 text-sm">
                Verifikasi Berkas Diperlukan!
              </div>
              <div className="text-sm text-amber-700 mt-1">
                Segera lakukan verifikasi berkas yang telah diunggah oleh
                perusahaan.
              </div>
            </div>
          </div>
        )}
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
                  <ExternalLink size={16} className="text-blue-600" />
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
              <p>
                {companyDetail.companyBankInformation.accountNumber ?? "-"}
              </p>
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

      {/* Verification Section - FIXED */}
      <section className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-gray-600" size={18} />
          <h3 className="font-semibold">Verifikasi</h3>
        </div>

        {/* Conditional Alert Based on Status */}
        {isRevisionState ? (
          // Revision State: Blue alert with "Revisi" button
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800">
                Dokumen sesuai (0 dari {daysSinceRejection})
              </span>
            </div>
            <button
              onClick={() => setIsRevisionModalOpen(true)}
              className="px-4 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
            >
              Revisi
            </button>
          </div>
        ) : isNPWPApproved && !isAccountVerified ? (
          // NPWP Approved but Account Not Verified: Green alert with "Verifikasi" button
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800">
                Dokumen sesuai ({isVerified ? 1 : 0} dari 1)
                {/* Akun anda berhasil di verifikasi pada{" "}
                {formatFullDate(companyDetail.updatedAt)} */}
              </span>
            </div>
            <button
              onClick={() => setIsVerifyAccountModalOpen(true)}
              className="px-4 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
            >
              Verifikasi
            </button>
          </div>
        ) : isAccountVerified ? (
          // Account Already Verified: Green alert (no button)
          <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-green-800">
              Akun anda berhasil di verifikasi pada{" "}
              {formatFullDate(
                companyDetail.updatedAt
              )}
            </span>
          </div>
        ) : npwpStatus === "PROCESS" ? (
          // PROCESS: Amber alert (waiting for verification)
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm text-amber-800">
              Menunggu verifikasi dokumen — segera verifikasi berkas yang telah
              diunggah.
            </span>
          </div>
        ) : null}

        {/* NPWP Section */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider text-left">
            NPWP
          </p>

          <div className="flex items-center gap-3 w-1/2">
            <div className="flex flex-col gap-2 p-2 border rounded-lg bg-white flex-1">
              <div className="flex items-center gap-2">
                <div className="rounded-sm bg-blue-100 px-2 py-2">
                  <FileText className="h-5 w-5 text-blue-700" />
                </div>

                <div className="flex items-center justify-between w-full">
                  {companyDetail.companyVerificationFile?.npwpUrl ? (
                    <>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          NPWP_{companyDetail.name?.slice(0, 6)}.jpg
                        </p>
                        <p className="text-xs text-gray-500">1.4 MB</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 ${
                          npwpStatus === "PROCESS"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : npwpStatus === "SUCCESS"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : isRevisionState
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                        style={{
                          marginLeft: "auto",
                          height: "auto",
                          width: "auto",
                          alignSelf: "center",
                        }}
                      >
                        {npwpStatus === "PROCESS"
                          ? "Menunggu Tindakan"
                          : npwpStatus === "SUCCESS"
                          ? "Sesuai"
                          : isRevisionState
                          ? "Revisi"
                          : "Ditolak"}
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

              {/* Show Rejection Reason if Revision State */}
              {isRevisionState && rejectionReason && (
                <div className="p-3 border-t border-gray-200">
                  <p className="text-xs text-left text-gray-400 mb-1">
                    Alasan
                  </p>
                  <p className="text-sm text-left">{rejectionReason}</p>
                </div>
              )}
            </div>

            {/* Icon Logic */}
            {companyDetail.companyVerificationFile?.npwpUrl ? (
              npwpStatus === "PROCESS" ? (
                <button
                  onClick={() => setIsVerifyModalOpen(true)}
                  title="Verifikasi NPWP"
                  className="flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
                </button>
              ) : isVerified ? (
                <button
                  onClick={() => setIsDetailModalOpen(true)}
                  title="Lihat Detail NPWP"
                  className="flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
                </button>
              ) : (
                <a
                  href={companyDetail.companyVerificationFile.npwpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Lihat NPWP"
                >
                  <ExternalLink className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
                </a>
              )
            ) : (
              <ExternalLink className="h-5 w-5 text-gray-400 cursor-not-allowed" />
            )}
          </div>
        </div>
      </section>

      {/* Verify NPWP Modal */}
      <VerifyNPWPModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        companyName={companyDetail.name ?? "-"}
        npwpNumber={companyDetail.companyVerificationFile?.npwp ?? "-"}
        npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl}
        onVerify={handleVerifyNPWP}
      />

      {/* Revision Confirm Modal */}
      <RevisionConfirmModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        onConfirm={handleNPWPRevision}
        loading={revisionLoading}
      />

      {/* NPWP Detail Modal */}
      <NPWPDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        companyName={companyDetail.name ?? "-"}
        npwpNumber={companyDetail.companyVerificationFile?.npwp}
        npwpImageUrl={companyDetail.companyVerificationFile?.npwpUrl}
        status={npwpStatus as "SUCCESS" | "FAIL"}
        rejectionReason={rejectionReason ?? "-"}
      />

      {/* Verify Account Modal */}
      <VerifyAccountModal
        isOpen={isVerifyAccountModalOpen}
        onClose={() => setIsVerifyAccountModalOpen(false)}
        onConfirm={handleVerifyAccount}
        loading={accountVerifyLoading}
      />
    </div>
  );
}