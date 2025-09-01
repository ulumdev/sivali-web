import { apiRequest } from "./api";
import type { JobPostingModel } from "../models/JobPostingModel";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
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
