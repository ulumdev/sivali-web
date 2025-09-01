export interface Address {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  address: string;
  detail: string | null;
}

export interface CompanyProfile {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber: string;
  industry: string;
  about: string | null;
  webUrl: string | null;
  address: Address;
}

export interface Bank {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  bankCode: string;
  bankName: string;
}

export interface CompanyBankInformation {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  accountNumber: string;
  accountOwner: string;
  bankId: number;
  bank: Bank;
}

export interface Pic {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  companyId?: string;
  firstName: string;
  lastName?: string | null; // di contoh ada "lasttName" typo, di contoh lain "lastName"
  position: string;
  phoneNumber: string;
  email: string;
}

export type NpwpStatus = "PROCESS" | "APPROVED" | "REJECTED";

export interface CompanyVerificationFile {
  id: string;
  npwpUrl: string;
  npwpStatus: NpwpStatus;
  npwp: string;
}

export interface ProfileModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  name: string;
  email: string;
  companyLogoUrl: string;
  balance?: string;
  lockedBalance?: string;
  isActive: boolean;
  isVerified: boolean;
  isRevised?: boolean;
  isRevision?: boolean;
  isSuspended?: boolean;
  blockReason?: string | null;
  suspendReason?: string | null;
  suspendUntil?: string | null;
  npwpRejectionReason?: string | null;

  companyProfile: CompanyProfile | null;
  companyBankInformation: CompanyBankInformation | null;
  pic: Pic | null;
  companyVerificationFile: CompanyVerificationFile | null;
}

export interface ProfileResponse {
  ok: boolean;
  data: ProfileModel;
}
