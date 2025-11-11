import { apiRequest } from "./api";
import type { TransactionDetailModel } from "@/models/TransactionDetailModel";

interface ApiResponse<T> {
    ok: boolean;
    data: T;
    }

export async function getTransactionDetail(transactionId: string): Promise<TransactionDetailModel | null> {
    try {
        const response = await apiRequest<ApiResponse<TransactionDetailModel>>(
            `/api/v1/transaction-company/${transactionId}`
        );

        if (response?.ok && response.data) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching transaction detail:", error.message ?? error);
        return null;
    }
}