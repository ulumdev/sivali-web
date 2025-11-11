import { useEffect, useState } from "react";
import type { EmployeeModel } from "@/models/internal/EmployeeModel";
import {
  getRegisteredEmployee,
  getVerifiedEmployee,
  getSuspendedEmployee,
  getBlockedEmployee,
} from "@/services/internal/employeeInternalService";


export function useRegisteredEmployee() {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        getRegisteredEmployee()
            .then((res) => {
                if (isMounted) setEmployees(res ?? []);
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

    return { employees, loading, error };
}

export function useVerifiedEmployee() {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        getVerifiedEmployee()
            .then((res) => {
                if (isMounted) setEmployees(res ?? []);
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

    return { employees, loading, error };
}

export function useSuspendedEmployee() {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        getSuspendedEmployee()
            .then((res) => {
                if (isMounted) setEmployees(res ?? []);
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

    return { employees, loading, error };
}

export function useBlockedEmployee() {
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        getBlockedEmployee()
            .then((res) => {
                if (isMounted) setEmployees(res ?? []);
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

    return { employees, loading, error };
}
