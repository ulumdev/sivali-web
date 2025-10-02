import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { FileText, SquareArrowOutUpRight } from "lucide-react";
// import { clsx } from "clsx";
import { useAttendanceDetail } from "@/hooks/useAttendanceDetail";
import { apiPatch } from "@/services/api";
import { useState } from "react";

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

function ConfirmModal({
  open,
  status,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  status: "SUCCESS" | "FAIL" | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open || !status) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi</h2>
        <p className="text-gray-700 mb-6">
          Apakah kamu yakin ingin{" "}
          <span
            className={
              status === "SUCCESS"
                ? "text-blue-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {status === "SUCCESS" ? "mengkonfirmasi" : "menolak"} absen
          </span>{" "}
          ini?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white ${
              status === "SUCCESS"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Ya, {status === "SUCCESS" ? "Konfirmasi" : "Tolak"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AttendanceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { attendanceDetail, loading, error } = useAttendanceDetail(
    id ?? ""
  );
  // refetch data after action
  const [updating, setUpdating] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<"SUCCESS" | "FAIL" | null>(
    null
  );

  // Handler untuk buka modal
  const confirmUpdate = (status: "SUCCESS" | "FAIL") => {
    setPendingStatus(status);
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!attendanceDetail) return <p>Data tidak ditemukan</p>;

  // Handler Update Status
  const handleUpdateStatus = async (status: "SUCCESS" | "FAIL") => {
    if (!id) {
      return;
    }
    try {
      setUpdating(true);
      await apiPatch(`/api/v1/attendance/${id}`, { status });
      alert(`Status absen berhasil diupdate menjadi ${status}`);
      //   refetch(); // refresh detail setelah update
      navigate(-1);
    } catch (err: any) {
      alert("Gagal update absen: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 justify-start text-left">
        <div>
          <div className="text-2xl font-semibold mb-3">
            {attendanceDetail.user?.firstName ?? "-"}{" "}
            {attendanceDetail.user?.lastName ?? ""}
          </div>
          <div className="flex items-center justify-between gap-3">
            {/* <span className="px-2 py-2 text-sm font-medium bg-green-50 text-green-600 rounded-md border border-green-600">
                Absensi Disetujui
              </span> */}
            {attendanceDetail.status === "PROCESS" ? (
              <>
                <span className="px-2 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-md border border-orange-600">
                  Menunggu Tindakan
                </span>
                <div className="flex gap-2 ml-auto">
                  <button
                    disabled={updating}
                    onClick={() => confirmUpdate("FAIL")}
                    className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-red-600 text-sm bg-gray-50 text-red-600 text-sm hover:bg-red-100 w-full md:w-auto"
                  >
                    Tolak absen
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => confirmUpdate("SUCCESS")}
                    className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm bg-blue-600 text-white text-sm hover:bg-blue-700 w-full md:w-auto"
                  >
                    Konfirmasi absen
                  </button>
                </div>
              </>
            ) : (
              <span className="px-2 py-2 text-sm font-medium bg-green-50 text-green-600 rounded-md border border-green-600">
                Absensi Disetujui
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detail attendanceDetail Posting */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <FileText className="text-gray-600" size={20} />
          <h3 className="text-md font-semibold">Detail Job Posting</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
          <div>
            <p className="text-sm text-gray-500 mb-1">Nama Perusahaan</p>
            <p className="text-sm">
              {attendanceDetail.job?.company?.name ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-sm">{attendanceDetail.job?.role?.role ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Upah</p>
            <p className="text-sm">{attendanceDetail.job?.salary ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Tanggal Kerja</p>
            <p className="text-sm">
              {attendanceDetail.job?.shiftIn
                ? new Date(attendanceDetail.job.shiftIn).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Absen Datang</p>
            <p className="text-sm">
              {attendanceDetail.job?.shiftIn
                ? new Date(attendanceDetail.job.shiftIn).toLocaleTimeString(
                    "id-ID",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Absen Pulang</p>
            <p className="text-sm">
              {attendanceDetail.job?.shiftOut
                ? new Date(attendanceDetail.job.shiftOut).toLocaleTimeString(
                    "id-ID",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "-"}
            </p>
          </div>
        </div>

        {/* Garis pembatas */}
        <hr className="my-6" />
        <div className="flex items-center gap-2 mb-6 justify-start">
          {/* <FileText className="text-gray-600" size={20} /> */}
          <h3 className="text-md font-semibold">Alamat</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
          <div>
            <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
            <p className="text-sm">{attendanceDetail.location?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Nama Jalan, Kecamatan, Kota
            </p>
            <p className="text-sm">
              {attendanceDetail.location?.address ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Detail Alamat</p>
            <p className="text-sm">
              {attendanceDetail.location?.detail ?? "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <FileText className="text-gray-600" size={20} />
          <h3 className="text-md font-semibold">Laporan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left">
          {/* Absen Datang */}
          <div>
            <div className="w-full bg-indigo-50 p-2 text-md font-semibold text-indigo-700 rounded-lg mb-6">
              <p>Absen Datang</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Laporan Terkirim</p>
                <p className="text-sm">{attendanceDetail.checkIn ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Batas Waktu</p>
                <p className="text-sm">
                  {attendanceDetail.job?.shiftIn
                    ? new Date(attendanceDetail.job.shiftIn).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "-"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Alasan</p>
                <p className="text-sm">
                  {/* {attendanceDetail.job?.company?.name ?? "-"} */}
                  Alasan ? -&gt; belum ada di API response
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Keterangan</p>
                <p className="text-sm">
                  {/* {attendanceDetail.job?.company?.name ?? "-"} */}
                  Keterangan ? -&gt; belum ada di API response
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Card File */}
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white flex-1">
                <div className="rounded-sm bg-indigo-100 px-2 py-2">
                  <FileText className="h-5 w-5 text-indigo-700 " />
                </div>

                <div className="flex items-center justify-between w-full">
                  {attendanceDetail.photoIn ? (
                    <>
                      <div className="flex-1 min-w-0">
                        <a
                          href={attendanceDetail.photoIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline break-all"
                        >
                          {attendanceDetail.photoIn}
                        </a>
                        <p className="text-xs text-gray-500 text-start px-3 me-4 break-all">
                          {attendanceDetail.photoIn}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 justify-end self-center h-auto w-auto ${
                          attendanceDetail.status?.toLocaleLowerCase() ===
                          "success"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : attendanceDetail.status?.toLocaleLowerCase() ===
                              "process"
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
                        {attendanceDetail.status?.toLocaleLowerCase() ===
                          "success" && "Absen diterima"}
                        {attendanceDetail.status?.toLocaleLowerCase() ===
                          "process" && "Menunggu tindakan"}
                        {attendanceDetail.status?.toLocaleLowerCase() ===
                          "fail" && "Absen ditolak"}
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-400 italic text-start px-3 me-4">
                        Belum ada bukti
                        <br /> 0.0 MB
                      </p>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400 ml-2 justify-end self-center h-auto w-auto"
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

              {/* Icon Edit / Upload */}
              <Tooltip
                text={
                  attendanceDetail.photoIn ? "Lihat bukti" : "Belum ada bukti"
                }
              >
                <SquareArrowOutUpRight
                  //   onClick={handleEditNPWP}
                  className="h-5 w-5 text-indigo-600 cursor-pointer hover:text-indigo-800"
                />
              </Tooltip>
            </div>
          </div>
          {/* Absen Pulang */}
          <div>
            <div className="w-full bg-indigo-50 p-2 text-md font-semibold text-indigo-700 rounded-lg mb-6">
              <p>Absen Pulang</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Laporan Terkirim</p>
                <p className="text-sm">{attendanceDetail.checkOut ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Batas Waktu</p>
                <p className="text-sm">
                  {attendanceDetail.job?.shiftOut
                    ? new Date(
                        attendanceDetail.job.shiftOut
                      ).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-10 justify-start text-left mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Alasan</p>
                <p className="text-sm">
                  {/* {attendanceDetail.job?.company?.name ?? "-"} */}
                  Alasan ? -&gt; belum ada di API response
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Keterangan</p>
                <p className="text-sm">
                  {/* {attendanceDetail.job?.company?.name ?? "-"} */}
                  Keterangan ? -&gt; belum ada di API response
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Card File */}
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white flex-1">
                <div className="rounded-sm bg-indigo-100 px-2 py-2">
                  <FileText className="h-5 w-5 text-indigo-700 " />
                </div>

                <div className="flex items-center justify-between w-full">
                  {attendanceDetail.photoOut ? (
                    <>
                      <div className="flex-1 min-w-0">
                        <a
                          href={attendanceDetail.photoOut}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline break-all"
                        >
                          {attendanceDetail.photoOut}
                        </a>
                        <p className="text-xs text-gray-500 text-start px-3 me-4 break-all">
                          {attendanceDetail.photoOut}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ml-2 justify-end self-center h-auto w-auto ${
                          attendanceDetail.photoOut.toLocaleLowerCase() ===
                          "success"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : attendanceDetail.photoOut.toLocaleLowerCase() ===
                              "process"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                        style={{
                          marginLeft: "auto",
                          height: "auto",
                          width: "auto",
                          alignSelf: "center",
                        }}
                      >
                        {attendanceDetail.photoOut.toLocaleLowerCase() ===
                          "success" && "Absen diterima"}
                        {attendanceDetail.photoOut.toLocaleLowerCase() ===
                          "process" && "Menunggu tindakan"}
                        {attendanceDetail.photoOut.toLocaleLowerCase() ===
                          "fail" && "Absen ditolak"}
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-400 italic text-start px-3 me-4">
                        Belum ada bukti
                        <br /> 0.0 MB
                      </p>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400 ml-2 justify-end self-center h-auto w-auto"
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

              {/* Icon Edit / Upload */}
              <Tooltip
                text={
                  attendanceDetail.photoOut ? "Lihat bukti" : "Belum ada bukti"
                }
              >
                <SquareArrowOutUpRight
                  //   onClick={handleEditNPWP}
                  className="h-5 w-5 text-indigo-600 cursor-pointer hover:text-indigo-800"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={showModal}
        status={pendingStatus}
        onCancel={() => setShowModal(false)}
        onConfirm={async () => {
          if (pendingStatus) {
            await handleUpdateStatus(pendingStatus);
          }
          setShowModal(false);
          setPendingStatus(null);
        }}
      />
    </div>
  );
}
