import { apiRequest } from "../api";
import type { EmployeeModel } from "@/models/internal/EmployeeModel";

interface ApiResponse<T> {
    ok: boolean;
    data:T;
}

export async function getRegisteredEmployee(): Promise<EmployeeModel[]> {
    const res = await apiRequest<ApiResponse<EmployeeModel[]>>(
        "/api/v1/internals/companies/workers/registered"
    );
    return Array.isArray(res.data) ? res.data : [];
}

export async function getVerifiedEmployee(): Promise<EmployeeModel[]> {
    const res = await apiRequest<ApiResponse<EmployeeModel[]>>(
        "/api/v1/internals/companies/workers/verified"
    );
    return Array.isArray(res.data) ? res.data : [];
}

export async function getSuspendedEmployee(): Promise<EmployeeModel[]> {
    const res = await apiRequest<ApiResponse<EmployeeModel[]>>(
        "/api/v1/internals/companies/workers/suspended"
    );
    return Array.isArray(res.data) ? res.data : [];
}

export async function getBlockedEmployee(): Promise<EmployeeModel[]> {
    const res = await apiRequest<ApiResponse<EmployeeModel[]>>(
        "/api/v1/internals/companies/workers/blocked"
    );
    return Array.isArray(res.data) ? res.data : [];
}