import { useEffect, useState } from "react";
import { getJobDetail } from "../services/jobDetailService";
import type { JobDetailModel } from "../models/JobDetailModel";

export function useJobDetail(jobId: string | undefined) {
    const [jobDetail, setJobDetail] = useState<JobDetailModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        let isMounted = true;
        if (!jobId) {
            setError("Job ID tidak ditemukan");
            setLoading(false);
            return;
        }

        setLoading(true);

        getJobDetail(jobId)
        .then((res) => {
            if (isMounted) setJobDetail(res);
        })
        .catch((error) => {
            if (isMounted) {
                setError("Error fetching job detail");
                console.error(error);
            }
        })
        .finally(() => {
            if (isMounted) setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, [jobId]);

    return { jobDetail, loading, error };
}
