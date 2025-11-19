// // src/hooks/useJobWorkers.ts
// import { useEffect, useState } from "react";
// import { getJobWorkers, type JobWorker } from "../services/jobWorkersService";

// export function useJobWorkers(jobId: string | undefined) {
//   const [workers, setWorkers] = useState<JobWorker[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!jobId) return;

//     let isMounted = true;

//     getJobWorkers(jobId)
//       .then((data) => {
//         if (isMounted) {
//           setWorkers(data);
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         if (isMounted) {
//           setError(err.message || "Failed to load workers");
//           setLoading(false);
//         }
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [jobId]);

//   return { workers, loading, error };
// }


import { useEffect, useState, useCallback } from "react";
import { getJobWorkers, type JobWorker } from "../services/jobWorkersService";

export function useJobWorkers(jobId: string | undefined) {
  const [workers, setWorkers] = useState<JobWorker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Main fetch function - memoized dengan useCallback
  const fetchWorkers = useCallback(async () => {
    if (!jobId) {
      setLoading(false);
      setWorkers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getJobWorkers(jobId);
      setWorkers(data);
    } catch (err: any) {
      console.error("Error fetching workers:", err);
      setError(err.message || "Failed to load workers");
      setWorkers([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  // ✅ Initial fetch on mount or when jobId changes
  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // ✅ Refetch function - wrapper around fetchWorkers
  const refetch = useCallback(async () => {
    await fetchWorkers();
  }, [fetchWorkers]);

  return { 
    workers, 
    loading, 
    error, 
    refetch 
  };
}