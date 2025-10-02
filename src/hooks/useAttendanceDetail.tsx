import { useEffect, useState, useCallback } from "react";
import { getAttendanceDetail } from "@/services/attendanceDetailService";
import type { AttendanceDetailModel } from "@/models/AttendanceDetailModel";

export function useAttendanceDetail(attId: string | undefined) {
  const [attendanceDetail, setAttendanceDetail] =
    useState<AttendanceDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   let isMounted = true;
  //   if (!attId) {
  //     setError("Attendance ID tidak ditemukan");
  //     setLoading(false);
  //     return;
  //   }

  //   setLoading(true);

  //   getAttendanceDetail(attId)
  //     .then((res) => {
  //       if (isMounted) setAttendanceDetail(res);
  //     })
  //     .catch((error) => {
  //       if (isMounted) {
  //         setError("Error fetching attendance detail");
  //         console.error(error);
  //       }
  //     })
  //     .finally(() => {
  //       if (isMounted) setLoading(false);
  //     });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [attId]);
  // return { attendanceDetail, loading, error };

  const fetchData = useCallback(async () => {
    if (!attId) {
      setError("Attendance ID tidak ditemukan");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await getAttendanceDetail(attId);
      setAttendanceDetail(res);
    } catch (err) {
      console.error(err);
      setError("Error fetching attendance detail");
    } finally {
      setLoading(false);
    }
  }, [attId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { attendanceDetail, loading, error};
}
