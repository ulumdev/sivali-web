import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { clsx } from "clsx";
import { useTransactionDetail } from "@/hooks/useTransactionDetail";

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactionDetail, loading, error } = useTransactionDetail(id ?? "");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!transactionDetail) return <p>Data tidak ditemukan</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 justify-start text-left">
        <div>
          <div className="text-2xl font-semibold mb-3">
            {transactionDetail.type ?? "-"}{" "}
            {/* {transactionDetail.status ?? ""} */}
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className={`px-2 py-2 text-sm font-medium rounded-md border ${
              transactionDetail.status === "PENDING"
                ? "bg-orange-50 text-orange-600 border-orange-600"
                : transactionDetail.status === "COMPLETED"
                ? "bg-green-50 text-green-600 border-green-600"
                : "bg-red-50 text-red-600 border-red-600"
            }`}>
              {transactionDetail.status === "PENDING" && "Menunggu Tindakan"}
              {transactionDetail.status === "COMPLETED" && "Berhasil"}
              {transactionDetail.status === "FAILED" && "Gagal"}
            </span>
          </div>
        </div>
      </div>

      {/* Detail attendanceDetail Posting */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-start">
          <FileText className="text-gray-600" size={20} />
          <h3 className="text-md font-semibold">Detail Transaksi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
          <div>
            <p className="text-sm text-gray-500 mb-1">ID</p>
            <p className="text-sm">
              {transactionDetail.id ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Tanggal</p>
            <p className="text-sm">{transactionDetail.createdAt ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Jumlah</p>
            <p className="text-sm">{transactionDetail.amount ?? "-"}</p>
          </div>
        </div>

        {/* Garis pembatas */}
        {/* <hr className="my-6" />
        <div className="flex items-center gap-2 mb-6 justify-start">
          <h3 className="text-md font-semibold">Alamat</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-10 justify-start text-left">
          <div>
            <p className="text-sm text-gray-500 mb-1">Nama Alamat</p>
            <p className="text-sm">{transactionDetail.company?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Nama Jalan, Kecamatan, Kota
            </p>
            <p className="text-sm">
              {transactionDetail.company?.name ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Detail Alamat</p>
            <p className="text-sm">
              {transactionDetail.company?.name ?? "-"}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
