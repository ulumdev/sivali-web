import { apiRequest } from "../api";
import type { CompanyDetailModel } from "@/models/internal/CompanyDetailModel";

interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

export async function getCompanyIntDetail(companyId: string): Promise<CompanyDetailModel | null> {
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