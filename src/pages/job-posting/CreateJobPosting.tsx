// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowUp, FileText, User } from "lucide-react";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";

// import TimePickerModal from "../../widgets/TimePickerModal";
// import LocationPickerModal from "../../widgets/LocationPickerModal";
// import { createJobPosting } from "../../services/jobPostingService";
// import { apiGet } from "@/services/api";

// type Role = {
//   id: number;
//   role: string;
// };

// export default function CreateJobPosting() {
//   const [locationModalOpen, setLocationModalOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [roles, setRoles] = useState<Role[]>([]);

//   // State form
//   const [role, setRole] = useState<number>(0);
//   const [salary, setSalary] = useState<number | undefined>(undefined);
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

//   const navigate = useNavigate();

//   // fetch roles from API
//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const response = await apiGet<{ data: Role[] }>("/api/v1/roles");
//         setRoles(response.data);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };

//     fetchRoles();
//   }, []);

//   // ✅ fungsi reset form
//   const resetForm = () => {
//     setRole(0);
//     setSalary(0);
//     setWorkerNumber("");
//     setWorkingDate("");
//     setShiftIn("08:00");
//     setShiftOut("17:00");
//     setDescription("");
//     setAddressName("");
//     setAddress("");
//     setAddressDetail("");
//     setSelectedLocation(null);
//   };

//   const handleConfirm = async () => {
//     if (role === 0) {
//       alert("Pilih role terlebih dahulu!");
//       return;
//     }

//     if (!selectedLocation) {
//       alert("Pilih lokasi terlebih dahulu!");
//       return;
//     }

//     const payload = {
//       role,
//       salary: salary ?? 0, // Ensure salary is always a number
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
//       console.log("📤 Payload yang dikirim:", JSON.stringify(payload, null, 2));
//       const result = await createJobPosting(payload);
//       console.log("✅ Job posting created:", result);
//       alert("Job Posting berhasil dibuat!");
//       // ✅ reset form setelah sukses
//       resetForm();
//       setConfirmOpen(false);
//       navigate("/job-posting/active"); // redirect ke halaman job active
//     } catch (err) {
//       console.error("❌ Error creating job posting:", err);
//       alert("Gagal membuat Job Posting");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setConfirmOpen(true); // tampilkan modal konfirmasi
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
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         {/* Detail Job Posting */}
//         <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//           <div className="flex items-center gap-2 mb-6 justify-start">
//             <FileText className="text-gray-600" size={20} />
//             <h3 className="text-md font-semibold">Detail Job Posting</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10">
//               {/* <div>
//                 <p className="text-sm text-gray-500 mb-1">Role</p>
//                 <input
//                   placeholder="Role"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={role}
//                   onChange={(e) => setRole(Number(e.target.value))}
//                 />
//               </div> */}
//               {/* ✅ Role pakai dropdown */}
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Role</p>
//                 <select
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={role}
//                   onChange={(e) => setRole(Number(e.target.value))}
//                 >
//                   <option value={0}>-- Pilih Role --</option>
//                   {roles.map((r) => (
//                     <option key={r.id} value={r.id}>
//                       {r.role}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Upah</p>
//                 <input
//                   placeholder="Masukkan Upah"
//                   type="number"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={salary}
//                   onChange={(e) => setSalary(Number(e.target.value))}
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Jumlah Pekerja</p>
//                 <input
//                   placeholder="Jumlah Pekerja"
//                   type="number"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={workerNumber}
//                   onChange={(e) => setWorkerNumber(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
//                 <input
//                   type="date"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={workingDate}
//                   onChange={(e) => setWorkingDate(e.target.value)}
//                 />
//               </div>

//               <TimePickerModal
//                 label="Jam Mulai"
//                 value={shiftIn}
//                 onChange={(time) => setShiftIn(time)}
//               />

//               <TimePickerModal
//                 label="Jam Selesai"
//                 value={shiftOut}
//                 onChange={(time) => setShiftOut(time)}
//               />
//             </div>

//             {/* Deskripsi Pekerjaan */}
//             <div className="pt-2">
//               <p className="text-sm text-gray-500 mb-1">Deskripsi Pekerjaan</p>
//               <textarea
//                 placeholder="Tulis deskripsi pekerjaan"
//                 rows={4}
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             {/* Garis pembatas */}
//             <hr className="my-6" />

//             <h3 className="text-md font-semibold mb-4">Alamat</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
//                 <input
//                   placeholder="Nama Alamat"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={addressName}
//                   onChange={(e) => setAddressName(e.target.value)}
//                 />
//                 <p className="text-sm text-gray-500 mb-1 mt-4">
//                   Nama Jalan, Kecamatan, Kota
//                 </p>
//                 <input
//                   placeholder="Nama Jalan, Kecamatan, Kota"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//                 <p className="text-sm text-gray-500 mb-1 mt-4">Detail Alamat</p>
//                 <input
//                   placeholder="Detail Alamat"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                   value={addressDetail}
//                   onChange={(e) => setAddressDetail(e.target.value)}
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
//                       key={selectedLocation?.lat + "-" + selectedLocation?.lng}
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

//               {/* Modal Lokasi */}
//               <LocationPickerModal
//                 open={locationModalOpen}
//                 onClose={() => setLocationModalOpen(false)}
//                 onConfirm={(loc) => setSelectedLocation(loc)}
//                 initialPosition={
//                   selectedLocation || { lat: -6.2, lng: 106.816666 }
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* Data PIC (belum dihubungkan ke payload) */}
//         <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//           <div className="flex items-center gap-2 mb-6 justify-start">
//             <User className="text-gray-600" size={20} />
//             <h2 className="text-md font-semibold">Data PIC</h2>
//           </div>
//           {/* isi data PIC */}
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

//       {/* ✅ Modal Konfirmasi Custom */}
//       {confirmOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
//                 <span className="text-3xl">😊</span>
//               </div>
//               <h2 className="text-lg font-semibold mb-2">Buat job posting</h2>
//               <p className="text-sm text-gray-500 mb-6">
//                 Sebelum melanjutkan, pastikan semua informasi yang anda masukkan
//                 sudah benar
//               </p>
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => setConfirmOpen(false)}
//                   className="w-1/2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   disabled={loading}
//                   className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//                 >
//                   {loading ? "Menyimpan..." : "Konfirmasi"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
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
  id: string;
  role: string;
};

export default function CreateJobPosting() {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  // State form - ✅ FIX: salary initial state jadi 0
  const [role, setRole] = useState<string>("");
  const [salary, setSalary] = useState<number>(0); // ✅ FIXED
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
    setRole("");
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
    if (role === "" || role === "0") {
      alert("Pilih role terlebih dahulu!");
      return;
    }

    if (!selectedLocation) {
      alert("Pilih lokasi terlebih dahulu!");
      return;
    }

    const payload = {
      role,
      salary: salary || 0, // ✅ Ensure salary is always a number
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
      resetForm();
      setConfirmOpen(false);
      navigate("/job-posting/active");
    } catch (err) {
      console.error("❌ Error creating job posting:", err);
      alert("Gagal membuat Job Posting");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
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
        <button
          type="button"
          className="px-4 py-2 border border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-200 text-sm font-semibold text-blue-600"
        >
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
              {/* ✅ Role Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm text-gray-500 mb-1 block"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role.toString()} // Convert to string
                  onChange={(e) => {
                    console.log("Selected role:", e.target.value);
                    setRole(e.target.value);
                  }}
                  required
                >
                  <option value="">
                    -- Pilih Role --
                  </option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Upah Input - FIXED */}
              <div>
                <label
                  htmlFor="salary"
                  className="text-sm text-gray-500 mb-1 block"
                >
                  Upah
                </label>
                <input
                  id="salary"
                  placeholder="Masukkan Upah"
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={salary || ""}
                  onChange={(e) =>
                    setSalary(e.target.value ? Number(e.target.value) : 0)
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="workerNumber"
                  className="text-sm text-gray-500 mb-1 block"
                >
                  Jumlah Pekerja
                </label>
                <input
                  id="workerNumber"
                  placeholder="Jumlah Pekerja"
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={workerNumber}
                  onChange={(e) => setWorkerNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="workingDate"
                  className="text-sm text-gray-500 mb-1 block"
                >
                  Tanggal Kerja
                </label>
                <input
                  id="workingDate"
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={workingDate}
                  onChange={(e) => setWorkingDate(e.target.value)}
                  required
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
              <label
                htmlFor="description"
                className="text-sm text-gray-500 mb-1 block"
              >
                Deskripsi Pekerjaan
              </label>
              <textarea
                id="description"
                placeholder="Tulis deskripsi pekerjaan"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Garis pembatas */}
            <hr className="my-6" />

            <h3 className="text-md font-semibold mb-4">Alamat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div>
                <label
                  htmlFor="addressName"
                  className="text-sm text-gray-500 mb-1 block"
                >
                  Nama Alamat
                </label>
                <input
                  id="addressName"
                  placeholder="Nama Alamat"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                  required
                />
                <label
                  htmlFor="address"
                  className="text-sm text-gray-500 mb-1 mt-4 block"
                >
                  Nama Jalan, Kecamatan, Kota
                </label>
                <input
                  id="address"
                  placeholder="Nama Jalan, Kecamatan, Kota"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label
                  htmlFor="addressDetail"
                  className="text-sm text-gray-500 mb-1 mt-4 block"
                >
                  Detail Alamat
                </label>
                <input
                  id="addressDetail"
                  placeholder="Detail Alamat"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Pin Lokasi</p>
                <div
                  className="rounded-lg border cursor-pointer h-[200px] flex items-center justify-center bg-gray-100 overflow-hidden hover:border-blue-500 transition-colors"
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

        {/* Data PIC */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6 justify-start">
            <User className="text-gray-600" size={20} />
            <h2 className="text-md font-semibold">Data PIC</h2>
          </div>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
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
                  disabled={loading}
                  className="w-1/2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
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
