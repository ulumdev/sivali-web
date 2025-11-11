export interface JobLocation {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  name?: string | null;
  address?: string | null;
  detail?: string | null;
  lat?: number | null;
  lng?: number | null;
  jobId?: string | null;
}

export interface Company {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  lastLoginAt?: string | null;
  name?: string | null;
  email?: string | null;
  companyLogoUrl?: string | null;
  isActive: boolean;
  isVerified: boolean;
  balance: string;
  lockedBalance: string;
  blockReason?: string | null;
  isRevised?: boolean;
  isRevision?: boolean;
  isSuspended?: boolean;
  npwpRejectionReason?: string | null;
  suspendReason?: string | null;
  suspendUntil?: string | null;
}

export interface Role {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  role?: string | null;
}

export interface Count {
  worker?: number | null;
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
  companyId?: string | null;
  roleId?: string | null;
  initialLockedAmount?: string | null;
  paymentStatus?: string | null;
  totalPaid?: string | null;
  jobLocation?: JobLocation | null;
  company?: Company | null;
  role?: Role | null;
  _count?: Count | null;
  worker?: Worker[] | null;
  jobAttendanceList?: JobAttendance[] | null;
}

export interface JobPostingResponse {
  ok: boolean;
  data: JobPostingModel;
}