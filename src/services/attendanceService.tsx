import { apiGet } from "./api";
import type { AttendanceResponse } from "@/models/AttendanceModel";

const BASE_URL = "/api/v1/attendance/company";

export async function getAttendanceList(
  page: number = 1,
  limit: number = 10,
  status?: string,
  jobId?: string
): Promise<AttendanceResponse> {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status ? { status } : {}),
    ...(jobId ? { jobId } : {}),
  });

  return apiGet<AttendanceResponse>(`${BASE_URL}?${queryParams}`);
}