import { apiRequest } from "../api";
import type { EmployeeModel} from "@/models/internal/EmployeeModel";

interface ApiResponse<T> {
   ok: boolean;
   message?: string;
   data: T;
}

/**
 * Get employee detail
 * GET /api/v1/internals/companies/workers/{id}/details
 */
export async function getEmployeeDetail(id: string) {
  if (!id) throw new Error("ID is required");
  return apiRequest<ApiResponse<{ user: EmployeeModel }>>(`/api/v1/internals/companies/workers/${id}/details`);
}

/**
 * Suspend employee (assumed endpoint)
 * PUT /api/v1/internals/companies/workers/{id}/suspend
 * body: { reason?: string, suspendUntil?: string (ISO) }
 */
export async function suspendEmployee(id: string, payload: { reason?: string; suspendUntil?: string }) {
  if (!id) throw new Error("ID is required");
  return apiRequest(`/api/v1/internals/workers/${id}/suspend`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload ?? {}),
  });
}

/**
 * Block employee (assumed endpoint)
 * PUT /api/v1/internals/workers/{id}/block
 * body: { reason?: string }
 */
export async function blockEmployee(id: string, payload: { reason?: string }) {
  if (!id) throw new Error("ID is required");
  return apiRequest(`/api/v1/internals/workers/${id}/block`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload ?? {}),
  });
}

/**
 * Activate / Unblock employee (assumed endpoint)
 * PUT /api/v1/internals/workers/{id}/activate
 */
export async function activateEmployee(id: string) {
  if (!id) throw new Error("ID is required");
  return apiRequest(`/api/v1/internals/workers/${id}/activate`, {
    method: "PUT",
  });
}