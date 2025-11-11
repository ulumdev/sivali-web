import { useEffect, useState, useCallback } from "react";
import type { TransactionModel } from "@/models/internal/TransactionModel";
import {
  getTopupTransactions,
  getPayrollTransactions,
  getAllTransactions,
} from "@/services/internal/transactionInternalService";

export type TransactionFetchResult = {
  data: TransactionModel[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  refetch: (opts?: {
    page?: number;
    limit?: number;
    q?: string;
  }) => Promise<void>;
};

type Source = "topup" | "payroll" | "all";

/**
 * useTransactionFetcher
 * - fetcher no longer depends on a non-stable `initial` object to avoid infinite loops
 * - caller should call refetch(...) when page/q changes
 */
export function useTransactionFetcher(
  source: Source,
  initial?: { page?: number; limit?: number; q?: string }
): TransactionFetchResult {
  const [data, setData] = useState<TransactionModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] =
    useState<TransactionFetchResult["pagination"]>(null);

  // fetcher depends only on source (stable) to avoid being recreated each render
  const fetcher = useCallback(
    async (opts?: { page?: number; limit?: number; q?: string }) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page: opts?.page ?? initial?.page ?? 1,
          limit: opts?.limit ?? initial?.limit ?? 10,
          q: opts?.q ?? initial?.q ?? undefined,
        };

        let res;
        if (source === "topup") res = await getTopupTransactions(params);
        else if (source === "payroll")
          res = await getPayrollTransactions(params);
        else res = await getAllTransactions(params);

        setData(res.data ?? []);
        setPagination(
          res.pagination
            ? {
                total: res.pagination.total,
                page: res.pagination.page,
                limit: res.pagination.limit,
                totalPages: res.pagination.totalPages,
              }
            : null
        );
      } catch (err: any) {
        setError(err?.message ?? "Gagal mengambil data transaksi");
        setData([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    // hanya bergantung pada source agar identity stabil; jangan sertakan `initial` object yang dibuat inline
    [source]
  );

  // call once on mount or when source changes
  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetcher,
  };
}
