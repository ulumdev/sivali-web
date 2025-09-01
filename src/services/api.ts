export async function apiRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json() as Promise<T>;
}