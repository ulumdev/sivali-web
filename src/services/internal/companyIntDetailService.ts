import { apiRequest } from "../api";
import type { CompanyDetailModel } from "@/models/internal/CompanyDetailModel";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export async function getCompanyIntDetail(
  companyId: string
): Promise<CompanyDetailModel | null> {
  if (!companyId) {
    return null;
  }

  try {
    const response = await apiRequest<ApiResponse<CompanyDetailModel>>(
      `/api/v1/internals/companies/${companyId}`
    );

    if (response?.ok && response.data) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error("Error fetching company internal details:", error);
    return null;
  }
}

// NEW: Verify NPWP Request/Response Types
export interface VerifyNPWPRequest {
  status: "SUCCESS" | "FAIL" | "PROCESS";
  rejectionReason?: string;
}

export interface VerifyNPWPResponse {
  ok: boolean;
  message?: string;
  data?: any;
}

// NEW: Verify NPWP function
export async function verifyCompanyNPWP(
  companyId: string,
  payload: VerifyNPWPRequest
): Promise<VerifyNPWPResponse> {
  return apiRequest<VerifyNPWPResponse>(
    `/api/v1/internals/companies/${companyId}/verif`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}
