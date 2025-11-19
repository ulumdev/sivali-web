import { useCallback, useEffect, useState } from "react";
import type { EmployeeModel } from "@/models/internal/EmployeeModel";
import { getEmployeeDetail } from "@/services/internal/employeeInteDetailService";

/**
 * useEmployeeDetail
 * - fetch employee detail by id
 * - returns { employee, loading, error, refetch }
 */
export function useEmployeeDetail(id?: string | null) {
  const [employee, setEmployee] = useState<EmployeeModel | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) {
      setEmployee(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getEmployeeDetail(id);
      if (res && (res as any).data && (res as any).data.user) {
        setEmployee((res as any).data.user ?? null);
      } else {
        setEmployee(null);
        setError("Data tidak ditemukan");
      }
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil data");
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { employee, loading, error, refetch: fetch };
}