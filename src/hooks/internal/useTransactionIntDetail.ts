import { useEffect, useState, useCallback } from "react";
import type { TransactionModel } from "@/models/internal/TransactionModel";
import { getTransactionDetail } from "@/services/internal/transactionInternalService";

// export type TransactionDetailResult = {
//   data: TransactionModel | null;
//   loading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
// };

// export function useTransactionDetail(id: string): TransactionDetailResult {
//   const [data, setData] = useState<TransactionModel | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetcher = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await getTransactionDetail(id);
//       setData(res.data ?? null);
//     } catch (err: any) {
//       setError(err?.message ?? "Gagal mengambil detail transaksi");
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetcher();
//     }
//   }, [id]);

//   return {
//     data,
//     loading,
//     error,
//     refetch: fetcher,
//   };
// }

/**
 * useTransactionDetail
 * - Fetches transaction detail by id
 * - returns { transaction, loading, error, refetch }
 */
export function useTransactionDetail(id?: string | null) {
  const [data, setData] = useState<TransactionModel | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getTransactionDetail(id);
      if (res && (res as any).data) {
        setData((res as any).data ?? null);
      } else {
        setData(null);
        setError("Data transaksi tidak ditemukan");
      }
    } catch (err: any) {
      setError(err?.message ?? "Gagal mengambil detail transaksi");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}