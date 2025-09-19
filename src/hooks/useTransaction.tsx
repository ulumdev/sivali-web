import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactionService";
import type { TransactionModel } from "@/models/TransactionModel";

export function useTransaction() {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    getTransactions()
        .then((res) => {
            if (isMounted) setTransactions(res ?? []);
        })
        .catch((err) => {
            if (isMounted) setError(err.message ?? "Terjadi kesalahan");
        })
        .finally(() => {
            if (isMounted) setLoading(false);
        });
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  return { transactions, loading, error };
}