import { useEffect, useState, useCallback } from "react";
import type { RoleModel } from "@/models/internal/RoleModel";
import { getAllRoles } from "@/services/internal/roleServiceInt";

export function useRoleInt() {
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRoles();
      setRoles(data ?? []);
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil data roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { roles, loading, error, refetch: fetch };
}