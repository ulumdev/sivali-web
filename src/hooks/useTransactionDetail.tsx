import { useEffect, useState } from "react";
import { getTransactionDetail } from "@/services/transactionDetailService";
import type { TransactionDetailModel } from "@/models/TransactionDetailModel";

export function useTransactionDetail(transactionId: string | undefined) {
    const [transactionDetail, setTransactionDetail] = useState<TransactionDetailModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() =>{
        let isMounted = true;
        if (!transactionId) {
            setError("Transaction ID tidak ditemukan");
            setLoading(false);
            return;
        }
        
        setLoading(true);
        getTransactionDetail(transactionId)
        .then((res) => {
            if (isMounted) setTransactionDetail(res);
        })
        .catch((error) => {
            if (isMounted) {
                setError("Error fetching transaction detail");
                console.error(error);
            }
        })
        .finally(() => {
            if (isMounted) setLoading(false);
        });
        
        return () => {
            isMounted = false;
        };
    }, [transactionId]);
    
    return { transactionDetail, loading, error };
}