// models/JobDetailModel.ts
export interface JobDetailModel {
  id: string;
  roleName?: {
    role?: string;
  };
  isActive?: boolean;
  createdAt?: string;
  tanggalKerja?: string;
  jamKerja?: string;
  totalPekerja?: number;
  workerNumber?: number;
  salary?: number;
  description?: string[];
  alamat?: {
    namaAlamat?: string;
    alamat?: string;
    detailAlamat?: string;
    latLng?: {
      lat?: number;
      lng?: number;
    };
  };
  dataPIC?: {
    namaPIC?: string;
    posisi?: string;
    email?: string;
    nomorTelepon?: string;
  };
  companyName?: string;
  companyLogo?: string;
}

export interface JobDetailResponse {
  ok: boolean;
  data: JobDetailModel;
}
