import { useEffect, useState, useCallback } from "react";
import type { CompanyDetailModel } from "@/models/internal/CompanyDetailModel";
import { getCompanyIntDetail } from "@/services/internal/companyIntDetailService";

export function useCompanyIntDetail(companyId?: string) {
    const [companyDetail, setCompanyDetail] = useState<CompanyDetailModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

     // Extract fetcher logic into separate function
  const fetchCompanyDetail = useCallback(async () => {
    if (!companyId) {
      setError("Company ID tidak ditemukan");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCompanyIntDetail(companyId);
      setCompanyDetail(data);
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil data company");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  // Initial fetch on mount
  useEffect(() => {
    fetchCompanyDetail();
  }, [fetchCompanyDetail]);

  // Refetch function to be called manually
  const refetch = useCallback(() => {
    return fetchCompanyDetail();
  }, [fetchCompanyDetail]);

  return { companyDetail, loading, error, refetch };
}