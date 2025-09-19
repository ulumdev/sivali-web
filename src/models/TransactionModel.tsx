export interface TransactionModel {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  amount?: string | null;
  type?: string | null;
  status?: string | null;
  reference?: string | null;
  description?: string | null;
  managementFee?: string | null;
  ppn?: string | null;
  netAmount?: string | null;
  processedAt?: string | null;
  internalId?: string | null;
  proofUrl?: string | null;
  companyId?: string | null;
  userId?: string | null;
  jobId?: string | null;
  jobAttendanceListId?: string | null;
  job?: string | null;
  user?: string | null;
}

export interface TransactionResponse {
  ok: boolean;
  data: TransactionModel;
}
