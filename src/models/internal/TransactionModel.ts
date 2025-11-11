export interface CompanyRef {
  id: string;
  name?: string;
  email?: string;
  companyLogoUrl?: string;
  pic?: {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    phoneNumber?: string;
    email?: string;
  };
  companyBankInformation?: any; // adjust based on your needs
}

export interface UserRef {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePictureUrl?: string;
  userBank?: any; // adjust based on your needs
}

export interface JobRef {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  salary?: number;
  shiftIn?: string;
  shiftOut?: string;
  isActive?: boolean;
  description?: string;
  workerNumber?: number;
  companyId?: string;
  roleId?: string;
  initialLockedAmount?: string;
  paymentStatus?: string;
  totalPaid?: string;
  jobLocation?: {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    address?: string;
    detail?: string;
    lat?: number;
    lng?: number;
    jobId?: string;
  };
  role?: {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    role?: string;
  };
}

export interface JobAttendanceRef {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  checkIn?: string | null;
  checkOut?: string | null;
  photoIn?: string | null;
  photoOut?: string | null;
  jobId?: string;
  userId?: string;
  isLate?: boolean;
  isPaid?: boolean;
  lat?: number | null;
  lateReason?: string | null;
  lng?: number | null;
  status?: string;
  job?: JobRef | null;
}

export interface InternalRef {
  id?: string;
  name?: string;
  email?: string;
}

export interface TransactionModel {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  amount?: string; // API returns string
  type?: string; // PAYROLL | TOPUP | ...
  status?: string; // COMPLETED | CANCELLED | PROCESS ...
  reference?: string;
  description?: string;
  managementFee?: string;
  ppn?: string;
  netAmount?: string;
  processedAt?: string | null;
  internalId?: string;
  proofUrl?: string | null;
  companyId?: string;
  userId?: string;
  jobId?: string | null;
  jobAttendanceListId?: string | null;
  company?: CompanyRef | null;
  user?: UserRef | null;
  job?: JobRef | null;
  internal?: InternalRef | null;
  jobAttendanceList?: JobAttendanceRef | null;
}

export interface TransactionsResponse {
  ok: boolean;
  message?: string;
  data: TransactionModel[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}