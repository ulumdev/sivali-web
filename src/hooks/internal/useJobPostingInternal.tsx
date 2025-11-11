import { useEffect, useState } from "react";
import { getInternalActiveJobPostings, getInternalExpiredJobPostings } from "@/services/internal/jobPostingInternalService";
import type { JobPostingModel } from "@/models/JobPostingModel";

export function useInternalActiveJobPostings() {
  const [jobsActive, setJobsActive] = useState<JobPostingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getInternalActiveJobPostings()
      .then((res) => {
        if (isMounted) setJobsActive(res ?? []);
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

  return { jobsActive, loading, error };
}

export function useInternalExpiredJobPostings() {
  const [jobsExpired, setJobsExpired] = useState<JobPostingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getInternalExpiredJobPostings()
      .then((res) => {
        if (isMounted) setJobsExpired(res ?? []);
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

  return { jobsExpired, loading, error };
}