import { useEffect, useState } from "react";
import { getAttendanceList } from "@/services/attendanceService";
import type { AttendanceRecord } from "@/models/AttendanceModel";

export function useAttendance(
  page: number = 1,
  limit: number = 10,
  status?: string,
  jobId?: string
) {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getAttendanceList(page, limit, status, jobId)
      .then((res) => {
        if (isMounted) {
          setAttendance(res.data.attendanceRecords ?? []);
          setTotal(res.data.total ?? 0);
        }
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
  }, [page, limit, status, jobId]);

  return { attendance, total, loading, error };
}