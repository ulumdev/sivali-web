import { useEffect, useState, useCallback } from "react";
import { getRegisteredCompanies, getVerifiedCompanies, getSuspendedCompanies, getBlockedCompanies } from "@/services/internal/companyInternalService";
import type { CompanyModel } from "@/models/internal/CompanyModel";

/**
 * Hook patterns updated to:
 * - initialize companies to [] (avoid null checks in UI)
 * - expose refetch so pages can refresh after actions (block/unblock/verify)
 */

export function useRegisteredCompanies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRegisteredCompanies();
      setCompanies(data ?? []);
    } catch (err: any) {
      setError((err && err.message) || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { companies, loading, error, refetch: fetch };
}

export function useVerifiedCompanies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVerifiedCompanies();
      setCompanies(data ?? []);
    } catch (err: any) {
      setError((err && err.message) || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { companies, loading, error, refetch: fetch };
}

export function useSuspendedCompanies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSuspendedCompanies();
      setCompanies(data ?? []);
    } catch (err: any) {
      setError((err && err.message) || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { companies, loading, error, refetch: fetch };
}

export function useBlockedCompanies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlockedCompanies();
      setCompanies(data ?? []);
    } catch (err: any) {
      setError((err && err.message) || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { companies, loading, error, refetch: fetch };
}
