// src/models/AttendanceModel.ts
export interface AttendanceRecord {
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
        id?: string | null;
        name?: string | null;
        email?: string | null;
        phoneNumber?: string | null;
        profilePictureUrl?: string | null;
    } | null;
    job?: {
        id?: string | null;
        role?: {
            id?: number | null;
            role?: string | null;
            createdAt?: string | null;
            updatedAt?: string | null;
        } | null;
        shiftIn?: string | null;
        shiftOut?: string | null;
        location?: {
            name?: string | null;
            address?: string | null;
        } | null;
    } | null;
}

export interface AttendanceResponse {
  status: string;
  data: {
    total: number;
    pages: number;
    currentPage: number;
    attendanceRecords?: AttendanceRecord[] | null;
  };
}
