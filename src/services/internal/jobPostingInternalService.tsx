import { apiRequest } from "../api";
import type { JobPostingModel } from "@/models/JobPostingModel";

interface ApiResponse<T> {
    ok: boolean;
    data:T;
}

// Get All active Job Posting (internal use)
export async function getInternalActiveJobPostings(): Promise<JobPostingModel[]> {
  const response = await apiRequest<ApiResponse<JobPostingModel[]>>(
    "/api/v1/internals/jobs/status/active"
  );

  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

// Get all expired job postings (for internal admin)
export async function getInternalExpiredJobPostings(): Promise<JobPostingModel[]> {
  const response = await apiRequest<ApiResponse<JobPostingModel[]>>(
    "/api/v1/internals/jobs/status/expired"
  );

  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}