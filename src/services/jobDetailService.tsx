import { apiRequest } from "./api";
import type { JobDetailModel } from "../models/JobDetailModel";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export async function getJobDetail(
  jobId: string
): Promise<JobDetailModel | null> {
  try {
    const response = await apiRequest<ApiResponse<JobDetailModel>>(
      `/api/v1/jobs/${jobId}/detail`
    );

    if (response?.ok && response.data) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error("Error fetching job detail:", error.message ?? error);
    return null;
  }
}
