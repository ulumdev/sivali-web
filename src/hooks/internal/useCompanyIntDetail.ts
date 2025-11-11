import { useEffect, useState } from "react";
import type { CompanyDetailModel } from "@/models/internal/CompanyDetailModel";
import { getCompanyIntDetail } from "@/services/internal/companyIntDetailService";

export function useCompanyIntDetail(companyId?: string) {
    const [companyDetail, setCompanyDetail] = useState<CompanyDetailModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    let isMounted = true;
    if (!companyId) {
      setError("Company ID tidak ditemukan");
      setLoading(false);
      return;
    }

    setLoading(true);
    getCompanyIntDetail(companyId)
      .then((data) => {
        if (isMounted) {
          setCompanyDetail(data);
        }
      })
      .catch((err: any) => {
        if (isMounted) {
          setError(err?.message ?? "Gagal mengambil data company");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [companyId]);

  return { companyDetail, loading, error };
}