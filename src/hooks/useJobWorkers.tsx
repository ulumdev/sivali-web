// src/hooks/useJobWorkers.ts
import { useEffect, useState } from "react";
import { getJobWorkers, type JobWorker } from "../services/jobWorkersService";

export function useJobWorkers(jobId: string | undefined) {
  const [workers, setWorkers] = useState<JobWorker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    let isMounted = true;

    getJobWorkers(jobId)
      .then((data) => {
        if (isMounted) {
          setWorkers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load workers");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  return { workers, loading, error };
}
