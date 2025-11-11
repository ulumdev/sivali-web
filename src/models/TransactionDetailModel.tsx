export interface TransactionDetailModel {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  amount?: string | null;
  type?: string | null;
  status?: string | null;
  reference?: string | null;
  description?: string | null;
  managementFee?: string | null;
  ppn?: string | null;
  netAmount?: string | null;
  processedAt?: string | null;
  internalId?: string | null;
  proofUrl?: string | null;
  companyId?: string | null;
  userId?: string | null;
  jobId?: string | null;
  jobAttendanceListId?: string | null;
  job?: {
    id?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    salary?: number | null;
    shiftIn?: string | null;
    shiftOut?: string | null;
    isActive?: boolean | null;
    description?: string[];
    workerNumber?: number | null;
    companyId?: string | null;
    roleId?: number | null;
    initialLockedAmount?: string | null;
    paymentStatus?: string | null;
    totalPaid?: string | null;
  } | null;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    profilePictureUrl?: string | null;
    phoneNumber?: string | null;
    personalinfo?: {
      id?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      height?: number | null;
      weight?: number | null;
      dateOfBirth?: string | null;
    } | null;
  } | null;
  company?: {
    id?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    lastLoginAt?: string | null;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    companyLogoUrl?: string | null;
    isActive?: boolean | null;
    isVerified?: boolean | null;
    balance?: string | null;
    blockReason?: string | null;
    isRevised?: boolean | null;
    isRevision?: boolean | null;
    isSuspended?: boolean | null;
    lockedBalance?: string | null;
    npwpRejectionReason?: string | null;
    suspendReason?: string | null;
    suspendUntil?: string | null;
  } | null;
}

export interface TransactionDetailResponse {
  ok: boolean;
  data: TransactionDetailModel;
}
