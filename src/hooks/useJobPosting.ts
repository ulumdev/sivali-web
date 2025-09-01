// useJobPosting.tsx
import { useEffect, useState } from "react";
import { getExpiredJobPostings, getDraftJobPostings, getActiveJobPostings } from "../services/jobPostingService";
import type { JobPostingModel } from "../models/JobPostingModel";

export function useExpiredJobPostings() {
  const [jobsExpired, setJobsExpired] = useState<JobPostingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getExpiredJobPostings()
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

export function useDraftJobPostings() {
  const [jobsDraft, setJobsDraft] = useState<JobPostingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getDraftJobPostings()
      .then((res) => {
        if (isMounted) setJobsDraft(res ?? []);
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

  return { jobsDraft, loading, error };
}

export function useActiveJobPostings() {
  const [jobsActive, setJobsActive] = useState<JobPostingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getActiveJobPostings()
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
