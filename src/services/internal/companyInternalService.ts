import { apiRequest } from "../api";
import type { CompanyModel } from "@/models/internal/CompanyModel";

interface ApiResponse<T> {
    ok: boolean;
    message: string;
    data: T;
}

// Get Company List - Registered Companies
export async function getRegisteredCompanies(): Promise<CompanyModel[]> {
    const response = await apiRequest<ApiResponse<CompanyModel[]>>(
        "api/v1/internals/companies/status/registered",);

    if (response && Array.isArray(response.data)) {
        return response.data;
    }

    return [];
}

// Get Company List - Verified / Active Companies
export async function getVerifiedCompanies(): Promise<CompanyModel[]> {
    const response = await apiRequest<ApiResponse<CompanyModel[]>>(
        "api/v1/internals/companies/status/active",);

    if (response && Array.isArray(response.data)) {
        return response.data;
    }

    return [];
}

// Get Company List - Suspended Companies
export async function getSuspendedCompanies(): Promise<CompanyModel[]> {
    const response = await apiRequest<ApiResponse<CompanyModel[]>>(
        "api/v1/internals/companies/status/suspended",);
        
    if (response && Array.isArray(response.data)) {
        return response.data;
    }
    
    return [];
}

// Get Company List - Blocked Companies
export async function getBlockedCompanies(): Promise<CompanyModel[]> {
    const response = await apiRequest<ApiResponse<CompanyModel[]>>(
        "api/v1/internals/companies/status/blocked",);

    if (response && Array.isArray(response.data)) {
        return response.data;
    }

    return [];
}

/**
 * Block a company by ID
 * PUT /api/v1/internals/companies/{id}/block
 * body: { reason: string }
 */
export async function blockCompany(companyId: string, reason: string): Promise<void> {
  if (!companyId) throw new Error("Company ID is required");
  const payload = { reason };
  await apiRequest(`/api/v1/internals/companies/${companyId}/block`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Suspend a company by ID
 * NOTE: confirm endpoint with backend. This implementation assumes:
 * PUT /api/v1/internals/companies/{id}/suspend
 * body: { reason?: string, suspendUntil?: string } where suspendUntil is ISO datetime string
 */
export async function suspendCompany(companyId: string, payload: { reason?: string; suspendUntil?: string }): Promise<void> {
  if (!companyId) throw new Error("Company ID is required");
  await apiRequest(`/api/v1/internals/companies/${companyId}/suspend`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Activate or Unblock a company by ID
 * PUT /api/v1/internals/companies/{id}/activate
 * Backend might not require a body; we send an empty object to be explicit.
 */
export async function activateCompany(companyId: string): Promise<void> {
  if (!companyId) throw new Error("Company ID is required");
  await apiRequest(`/api/v1/internals/companies/${companyId}/activate`, {
    method: "PUT",
    body: JSON.stringify({}),
  });
}