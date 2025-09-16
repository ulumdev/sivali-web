// src/services/jobWorkersService.ts
import { apiRequest } from "./api";

export interface JobWorker {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  jobId?: string;
  userId?: string;
  isAccepted?: boolean;
  isCadangan?: boolean;
  isFavorite?: boolean;
  isRejected?: boolean;
  status?: string;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    profilePictureUrl?: string;
    personalInfo?: {
      gender?: string;
      dateOfBirth?: string;
      height?: number;
      weight?: number;
      userAddress?: {
        name?: string;
        address?: string;
        detail?: string;
        lat?: number;
        lng?: number;
      };
    };
    userExperience?: {
      companyName?: string;
      position?: string;
      periodStart?: string;
      periodEnd?: string | null;
      isCurrentJob?: boolean;
    }[];
    userEducation?: {
      lastEducation?: string;
      nameOfSchool?: string;
      major?: string;
      periodStart?: string;
      periodEnd?: string;
    };
  };
}

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export async function getJobWorkers(jobId: string): Promise<JobWorker[]> {
  const res = await apiRequest<ApiResponse<JobWorker[]>>(`/api/v1/jobs/${jobId}/workers`);
  return res.data;
}
