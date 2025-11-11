import { useEffect, useState, useCallback } from "react";
import type { BannerModel } from "@/models/internal/BannerModel";
import { getBanners } from "@/services/internal/bannerInternalService";

export function useBannerInternal() {
  const [banners, setBanners] = useState<BannerModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBanners();
      setBanners(data ?? []);
    } catch (err: any) {
      console.error("useBanners fetch error", err);
      setError(err?.message ?? "Gagal mengambil banner");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { banners, loading, error, refetch: fetch };
}