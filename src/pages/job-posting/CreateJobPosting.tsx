// import { useState } from "react";
// import { ArrowUp, FileText, User } from "lucide-react";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";

// import TimePickerModal from "../../widgets/TimePickerModal";
// import LocationPickerModal from "../../widgets/LocationPickerModal";
// import { createJobPosting } from "../../services/jobPostingService";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function CreateJobPosting() {
//   const [locationModalOpen, setLocationModalOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);

//   // State form
//   const [role, setRole] = useState<number>(1);
//   const [salary, setSalary] = useState<number>(0);
//   const [workerNumber, setWorkerNumber] = useState<string>("");
//   const [workingDate, setWorkingDate] = useState<string>("");
//   const [shiftIn, setShiftIn] = useState<string>("08:00");
//   const [shiftOut, setShiftOut] = useState<string>("17:00");
//   const [description, setDescription] = useState<string>("");
//   const [addressName, setAddressName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [addressDetail, setAddressDetail] = useState<string>("");

//   const [loading, setLoading] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const handleConfirm = async () => {
//     if (!selectedLocation) {
//       alert("Pilih lokasi terlebih dahulu!");
//       return;
//     }

//     const payload = {
//       role,
//       salary,
//       workingDate: new Date(workingDate).toISOString(),
//       shiftIn,
//       shiftOut,
//       workerNumber,
//       description,
//       addressName,
//       address,
//       addressDetail,
//       location: selectedLocation,
//       isActive: true,
//     };

//     try {
//       setLoading(true);
//       const result = await createJobPosting(payload);
//       console.log("✅ Job posting created:", result);
//       alert("Job Posting berhasil dibuat!");
//       setConfirmOpen(false); // Tutup modal setelah sukses
//     } catch (err) {
//       console.error("❌ Error creating job posting:", err);
//       alert("Gagal membuat Job Posting");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <div className="flex flex-row gap-2 items-center">
//           <p className="text-sm text-gray-500">Job Posting</p>
//           <p className="text-sm text-gray-500 mx-2">&gt;</p>
//           <p className="font-semibold text-blue-600 text-sm">
//             Buat Job Posting
//           </p>
//         </div>
//         <button className="px-4 py-2 border border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-200 text-sm font-semibold text-blue-600">
//           Lihat Preview
//         </button>
//       </div>

//       {/* Form */}
//       <form className="space-y-6">
//         {/* Detail Job Posting */}
//         <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//           <div className="flex items-center gap-2 mb-6 justify-start">
//             <FileText className="text-gray-600" size={20} />
//             <h3 className="text-md font-semibold">Detail Job Posting</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Role</p>
//                 <input
//                   placeholder="Role"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Upah</p>
//                 <input
//                   placeholder="Upah"
//                   type="number"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Jumlah Pekerja</p>
//                 <input
//                   placeholder="Jumlah Pekerja"
//                   type="number"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
//                 <div className="flex items-center border rounded-lg px-3 py-2">
//                   <input
//                     type="date"
//                     className="w-full border-0 focus:ring-0 p-0 text-sm"
//                   />
//                 </div>
//               </div>

//               <TimePickerModal
//                 label="Jam Mulai"
//                 value="08:00"
//                 onChange={(time) => console.log("Jam Mulai:", time)}
//               />

//               <TimePickerModal
//                 label="Jam Selesai"
//                 value="17:00"
//                 onChange={(time) => console.log("Jam Selesai:", time)}
//               />
//             </div>

//             {/* Deskripsi Pekerjaan */}
//             <div className="justify-start text-left pt-2">
//               <p className="text-sm text-gray-500 mb-1">Deskripsi Pekerjaan</p>
//               <textarea
//                 placeholder="Tulis deskripsi pekerjaan"
//                 rows={4}
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
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
//                 <input
//                   placeholder="Nama Alamat"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//                 <p className="text-sm text-gray-500 mb-1 mt-4">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <input
//                   placeholder="Nama Jalan, Kecamatan, Kota"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//                 <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
//                 <input
//                   placeholder="Detail Alamat"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Pin Lokasi</p>
//                 <div
//                   className="rounded-lg border cursor-pointer h-[200px] flex items-center justify-center bg-gray-100 overflow-hidden"
//                   onClick={() => setLocationModalOpen(true)}
//                 >
//                   {selectedLocation ? (
//                     <MapContainer
//                       key={selectedLocation?.lat + "-" + selectedLocation?.lng} // 🔑 bikin remount
//                       center={selectedLocation}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                       scrollWheelZoom={false}
//                       dragging={false}
//                       doubleClickZoom={false}
//                       zoomControl={false}
//                     >
//                       <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       />
//                       <Marker position={selectedLocation} />
//                     </MapContainer>
//                   ) : (
//                     <p className="text-gray-400 text-sm">
//                       Klik untuk pilih lokasi
//                     </p>
//                   )}
//                 </div>
//               </div>
//               {/* Modal */}
//               <LocationPickerModal
//                 open={locationModalOpen}
//                 onClose={() => setLocationModalOpen(false)}
//                 onConfirm={(loc) => setSelectedLocation(loc)}
//                 initialPosition={
//                   selectedLocation || { lat: -6.2, lng: 106.816666 }
//                 } // 🔑
//               />
//             </div>
//           </div>
//         </div>

//         {/* Data PIC */}
//         <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//           {/* Header */}
//           <div className="flex items-center gap-2 mb-6 justify-start">
//             <User className="text-gray-600" size={20} />
//             <h2 className="text-md font-semibold">Data PIC</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
//             <div>
//               <p className="text-sm text-gray-500 mb-1">Nama Depan</p>
//               <input
//                 placeholder="Nama Depan"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 mb-1">Nama Belakang</p>
//               <input
//                 placeholder="Nama Belakang"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 mb-1">Jabatan</p>
//               <input
//                 placeholder="Jabatan"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 mb-1">Email</p>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 mb-1">Nomor Telepon PIC</p>
//               <input
//                 type="tel"
//                 placeholder="Nomor Telepon PIC"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-between gap-4">
//           <button
//             type="button"
//             className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm w-[50%]"
//           >
//             Batal
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm w-[50%] flex items-center justify-center gap-2"
//           >
//             <ArrowUp size={16} />
//             Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, FileText, User } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import TimePickerModal from "../../widgets/TimePickerModal";
import LocationPickerModal from "../../widgets/LocationPickerModal";
import { createJobPosting } from "../../services/jobPostingService";
import { apiGet } from "@/services/api";

type Role = {
  id: number;
  role: string;
};

export default function CreateJobPosting() {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  // State form
  const [role, setRole] = useState<number>(0);
  const [salary, setSalary] = useState<number | undefined>(undefined);
  const [workerNumber, setWorkerNumber] = useState<string>("");
  const [workingDate, setWorkingDate] = useState<string>("");
  const [shiftIn, setShiftIn] = useState<string>("08:00");
  const [shiftOut, setShiftOut] = useState<string>("17:00");
  const [description, setDescription] = useState<string>("");
  const [addressName, setAddressName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();

  // fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiGet<{ data: Role[] }>("/api/v1/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // ✅ fungsi reset form
  const resetForm = () => {
    setRole(0);
    setSalary(0);
    setWorkerNumber("");
    setWorkingDate("");
    setShiftIn("08:00");
    setShiftOut("17:00");
    setDescription("");
    setAddressName("");
    setAddress("");
    setAddressDetail("");
    setSelectedLocation(null);
  };

  const handleConfirm = async () => {
    if (role === 0) {
      alert("Pilih role terlebih dahulu!");
      return;
    }

    if (!selectedLocation) {
      alert("Pilih lokasi terlebih dahulu!");
      return;
    }

    const payload = {
      role,
      salary: salary ?? 0, // Ensure salary is always a number
      workingDate: new Date(workingDate).toISOString(),
      shiftIn,
      shiftOut,
      workerNumber,
      description,
      addressName,
      address,
      addressDetail,
      location: selectedLocation,
      isActive: true,
    };

    try {
      setLoading(true);
      console.log("📤 Payload yang dikirim:", JSON.stringify(payload, null, 2));
      const result = await createJobPosting(payload);
      console.log("✅ Job posting created:", result);
      alert("Job Posting berhasil dibuat!");
      // ✅ reset form setelah sukses
      resetForm();
      setConfirmOpen(false);
      navigate("/job-posting/active"); // redirect ke halaman job active
    } catch (err) {
      console.error("❌ Error creating job posting:", err);
      alert("Gagal membuat Job Posting");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true); // tampilkan modal konfirmasi
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm text-gray-500">Job Posting</p>
          <p className="text-sm text-gray-500 mx-2">&gt;</p>
          <p className="font-semibold text-blue-600 text-sm">
            Buat Job Posting
          </p>
        </div>
        <button className="px-4 py-2 border border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-200 text-sm font-semibold text-blue-600">
          Lihat Preview
        </button>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Detail Job Posting */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 justify-start">
            <FileText className="text-gray-600" size={20} />
            <h3 className="text-md font-semibold">Detail Job Posting</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10">
              {/* <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <input
                  placeholder="Role"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={role}
                  onChange={(e) => setRole(Number(e.target.value))}
                />
              </div> */}
              {/* ✅ Role pakai dropdown */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={role}
                  onChange={(e) => setRole(Number(e.target.value))}
                >
                  <option value={0}>-- Pilih Role --</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Upah</p>
                <input
                  placeholder="Masukkan Upah"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jumlah Pekerja</p>
                <input
                  placeholder="Jumlah Pekerja"
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={workerNumber}
                  onChange={(e) => setWorkerNumber(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={workingDate}
                  onChange={(e) => setWorkingDate(e.target.value)}
                />
              </div>

              <TimePickerModal
                label="Jam Mulai"
                value={shiftIn}
                onChange={(time) => setShiftIn(time)}
              />

              <TimePickerModal
                label="Jam Selesai"
                value={shiftOut}
                onChange={(time) => setShiftOut(time)}
              />
            </div>

            {/* Deskripsi Pekerjaan */}
            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-1">Deskripsi Pekerjaan</p>
              <textarea
                placeholder="Tulis deskripsi pekerjaan"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Garis pembatas */}
            <hr className="my-6" />

            <h3 className="text-md font-semibold mb-4">Alamat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
                <input
                  placeholder="Nama Alamat"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
                <p className="text-sm text-gray-500 mb-1 mt-4">
                  Nama Jalan, Kecamatan, Kota
                </p>
                <input
                  placeholder="Nama Jalan, Kecamatan, Kota"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
                <input
                  placeholder="Detail Alamat"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Pin Lokasi</p>
                <div
                  className="rounded-lg border cursor-pointer h-[200px] flex items-center justify-center bg-gray-100 overflow-hidden"
                  onClick={() => setLocationModalOpen(true)}
                >
                  {selectedLocation ? (
                    <MapContainer
                      key={selectedLocation?.lat + "-" + selectedLocation?.lng}
                      center={selectedLocation}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom={false}
                      dragging={false}
                      doubleClickZoom={false}
                      zoomControl={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={selectedLocation} />
                    </MapContainer>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Klik untuk pilih lokasi
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Lokasi */}
              <LocationPickerModal
                open={locationModalOpen}
                onClose={() => setLocationModalOpen(false)}
                onConfirm={(loc) => setSelectedLocation(loc)}
                initialPosition={
                  selectedLocation || { lat: -6.2, lng: 106.816666 }
                }
              />
            </div>
          </div>
        </div>

        {/* Data PIC (belum dihubungkan ke payload) */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 justify-start">
            <User className="text-gray-600" size={20} />
            <h2 className="text-md font-semibold">Data PIC</h2>
          </div>
          {/* isi data PIC */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm w-[50%]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm w-[50%] flex items-center justify-center gap-2"
          >
            <ArrowUp size={16} />
            Post
          </button>
        </div>
      </form>

      {/* ✅ Modal Konfirmasi Custom */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-3xl">😊</span>
              </div>
              <h2 className="text-lg font-semibold mb-2">Buat job posting</h2>
              <p className="text-sm text-gray-500 mb-6">
                Sebelum melanjutkan, pastikan semua informasi yang anda masukkan
                sudah benar
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="w-1/2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  {loading ? "Menyimpan..." : "Konfirmasi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
