import { apiRequest } from "./api";
import type { TransactionModel } from "../models/TransactionModel";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export async function getTransactions(): Promise<TransactionModel[]> {
  const response = await apiRequest<ApiResponse<TransactionModel[]>>("/api/v1/transaction-company/my");

  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}