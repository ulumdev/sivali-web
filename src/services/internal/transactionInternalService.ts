import { apiRequest } from "@/services/api";
import type {
  TransactionModel,
  TransactionsResponse,
} from "@/models/internal/TransactionModel";

type FetchParams = {
  page?: number;
  limit?: number;
  q?: string; // search query
};

function buildQuery(params?: FetchParams) {
  if (!params) return "";
  const q = new URLSearchParams();
  if (params.page) q.set("page", String(params.page));
  if (params.limit) q.set("limit", String(params.limit));
  if (params.q) q.set("q", params.q);
  const qs = q.toString();
  return qs ? `?${qs}` : "";
}

export async function getTopupTransactions(
  params?: FetchParams
): Promise<TransactionsResponse> {
  const qs = buildQuery(params);
  return apiRequest<TransactionsResponse>(
    `/api/v1/internal-transactions/topup${qs}`
  );
}

export async function getPayrollTransactions(
  params?: FetchParams
): Promise<TransactionsResponse> {
  const qs = buildQuery(params);
  return apiRequest<TransactionsResponse>(
    `/api/v1/internal-transactions/payroll${qs}`
  );
}

export async function getAllTransactions(
  params?: FetchParams
): Promise<TransactionsResponse> {
  const qs = buildQuery(params);
  return apiRequest<TransactionsResponse>(
    `/api/v1/internal-transactions/all${qs}`
  );
}

export async function getTransactionDetail(id: string): Promise<{
  ok: boolean;
  message?: string;
  data: TransactionModel;
}> {
  return apiRequest<{
    ok: boolean;
    message?: string;
    data: TransactionModel;
  }>(`/api/v1/internal-transactions/${id}`);
}

// ================================
// UPDATE: Topup Transactions
// ================================
export interface UpdateTopupRequest {
  status: "COMPLETED" | "FAILED" | "CANCELLED" | "PENDING";
  internalId: string;
}

export interface UpdateTopupResponse {
  ok: boolean;
  message?: string;
  data?: any;
}
// UPDATE: Process Topup Transactions
export async function updateTopupTransaction(
  transactionId: string,
  payload: UpdateTopupRequest
): Promise<UpdateTopupResponse> {
  return apiRequest<UpdateTopupResponse>(
    `/api/v1/internal-transactions/topup/${transactionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}

// ================================
// UPDATE: Payroll Transactions
// ================================
export interface UpdatePayrollRequest {
  internalId: string;
}

export interface UpdatePayrollResponse {
  ok: boolean;
  message?: string;
  data?: any;
}

// UPDATE: Process payroll transaction
export async function updatePayrollTransaction(
  attendanceId: string,
  payload: UpdatePayrollRequest
): Promise<UpdatePayrollResponse> {
  return apiRequest<UpdatePayrollResponse>(
    `/api/v1/internal-transactions/payroll/${attendanceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}