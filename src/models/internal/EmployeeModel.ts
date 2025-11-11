export interface UserAddress {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  address?: string;
  detail?: string;
  lat?: number;
  lng?: number;
}

export interface PersonalInfo {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  height?: number;
  weight?: number;
  gender?: string;
  dateOfBirth?: string;
  userAddress?: UserAddress | null;
}

export interface UserVerificationFile {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  cvUrl?: string | null;
  cvStatus?: string | null;
  ktpUrl?: string | null;
  ktpStatus?: string | null;
  nik?: string | null;
}

export interface EmployeeModel {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  profilePictureUrl?: string | null;
  profilePictureStatus?: string | null;
  isActive?: boolean;
  isVerified?: boolean;
  isSuspend?: boolean;
  balance?: number | string;
  isUseThirdParty?: boolean;
  userVerificationFile?: UserVerificationFile | null;
  personalInfo?: PersonalInfo | null;
  _statusGroup?: string | null;
}

export interface EmployeeResponse {
  ok: boolean;
  data: EmployeeModel[];
}