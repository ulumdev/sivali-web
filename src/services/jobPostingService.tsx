import { apiPost, apiRequest } from "./api";
import type { JobPostingModel } from "../models/JobPostingModel";

export interface JobPostingPayload {
  role: string;
  salary: number;
  workingDate: string; // ISO string
  shiftIn: string; // "HH:mm"
  shiftOut: string; // "HH:mm"
  workerNumber: string;
  description: string;
  addressName: string;
  address: string;
  addressDetail: string;
  location: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export async function createJobPosting(payload: JobPostingPayload) {
  return apiPost<ApiResponse<JobPostingPayload>>("/api/v1/jobs", payload);
}

export async function getExpiredJobPostings(): Promise<JobPostingModel[]> {
  const response = await apiRequest<ApiResponse<JobPostingModel[]>>("/api/v1/jobs/status/expired");
  
  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

export async function getDraftJobPostings(): Promise<JobPostingModel[]> {
  const response = await apiRequest<ApiResponse<JobPostingModel[]>>("/api/v1/jobs/status/draft");

  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

export async function getActiveJobPostings(): Promise<JobPostingModel[]> {
  const response = await apiRequest<ApiResponse<JobPostingModel[]>>("/api/v1/jobs/status/active");

  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}
