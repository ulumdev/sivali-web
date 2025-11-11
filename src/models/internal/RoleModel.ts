export interface RoleModel {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    role?: string;
}

export interface RoleResponse {
    ok: boolean;
    data: RoleModel[];
}
