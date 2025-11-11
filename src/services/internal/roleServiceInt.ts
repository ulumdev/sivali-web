import { apiRequest } from "../api";
import type { RoleModel, RoleResponse } from "@/models/internal/RoleModel";

export async function getAllRoles(): Promise<RoleModel[]> {
    const res = await apiRequest<RoleResponse>("/api/v1/roles");
    if (res && Array.isArray(res.data)) {
        return res.data;
    }
    return [];
}

export async function createRole(payload: {role: string}): Promise<RoleModel> {
    const res = await apiRequest<RoleResponse>("/api/v1/roles", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    if (res && res.data) {
        return (res as any).data;
    }
    throw new Error("Failed to create role");
}

export async function updateRole(id: string, payload: {role: string}): Promise<RoleModel> {
    const res = await apiRequest<RoleResponse>(`/api/v1/roles/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    if (res && res.data) {
        return (res as any).data;
    }
    throw new Error("Failed to update role");
}

export async function deleteRole(id: string): Promise<void> {
    await apiRequest<void>(`/api/v1/roles/${id}`, {
        method: "DELETE",
    });
}