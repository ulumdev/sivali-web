export interface CompanyProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber?: string;
  industry?: string;
  about?: string | null;
  webUrl?: string | null;
}

export interface CompanyBankInformation {
  id: string;
  createdAt: string;
  updatedAt: string;
  bankId?: number;
  accountNumber?: string;
  accountOwner?: string;
}

export interface CompanyJob {
  id: string;
  createdAt: string;
  updatedAt: string;
  salary: number;
  shiftIn: string;
  shiftOut: string;
  isActive: boolean;
  description: string[];
  workerNumber: number;
  companyId: string;
  roleId: number;
  initialLockedAmount: string;
  paymentStatus: string;
  totalPaid: string;
}

export interface CompanyVerificationFile {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  npwpUrl?: string;
  npwp?: string;
  npwpStatus?: string;
}

export interface CompanyModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  name: string;
  email: string;
  companyLogoUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  balance: string;
  blockReason?: string | null;
  isRevised?: boolean;
  isRevision?: boolean;
  isSuspended?: boolean;
  lockedBalance: string;
  npwpRejectionReason?: string | null;
  suspendReason?: string | null;
  suspendUntil?: string | null;
  companyProfile?: CompanyProfile | null;
  companyBankInformation?: CompanyBankInformation | null;
  job?: CompanyJob[];
  companyVerificationFile?: CompanyVerificationFile | null;
}

export interface CompanyResponse {
  ok: boolean;
  message: string;
  data: CompanyModel[];
}