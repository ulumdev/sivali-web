export interface AttendanceDetailModel {
  id: string;
  userId: string;
  jobId: string;
  checkIn?: string | null;
  checkOut?: string | null;
  photoIn?: string | null;
  photoOut?: string | null;
  status?: string | null;
  isPaid?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
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
  job?: {
    salary?: number | null;
    shiftIn?: string | null;
    shiftOut?: string | null;
    description?: string[];
    company?: {
      name?: string | null;
      companyLogoUrl?: string | null;
    } | null;
    jobLocation?: {
      id?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      name?: string | null;
      address?: string | null;
      detail?: string | null;
      lat?: number;
      lng?: number;
      jobId?: string | null;
    } | null;
    role?: {
      id?: number | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      role?: string | null;
    } | null;
  } | null;
  location?: {
      id?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      name?: string | null;
      address?: string | null;
      detail?: string | null;
      lat?: number;
      lng?: number;
      jobId?: string | null;
    } | null;
}

export interface AttendanceDetailResponse {
    status: string;
    data: AttendanceDetailModel;
}
