export interface JobLocation {
  id?: string | null;
  name?: string | null;
  address?: string | null;
  detail?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface Role {
  role?: string | null;
}

export interface Worker {
  id?: string | null;
  userId?: string | null;
  isAccepted?: boolean | null;
  isCadangan?: boolean | null;
  isFavorite?: boolean | null;
  isRejected?: boolean | null;
  status?: "WAITING" | "CONFIRMED" | "REJECTED" | null;
}

export interface JobAttendance {
  id?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  status?: string | null;
  isPaid?: boolean | null;
}

export interface JobPostingModel {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  salary?: number | null;
  shiftIn?: string | null;
  shiftOut?: string | null;
  isActive?: boolean | null;
  description?: string[] | null;
  workerNumber?: number | null;
  paymentStatus?: string | null;
  totalPaid?: string | null;
  role?: Role | null;
  jobLocation?: JobLocation | null;
  worker?: Worker[] | null;
  jobAttendanceList?: JobAttendance[] | null;
}

export interface JobPostingResponse {
  ok: boolean;
  data: JobPostingModel;
}