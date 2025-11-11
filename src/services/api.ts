export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  // Pastikan tidak double base URL
  const finalUrl = url.startsWith("http")
    ? url
    : `${url.startsWith("/") ? "" : "/"}${url}`;

  const res = await fetch(finalUrl, {
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

export async function apiGet<T>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: "GET" });
}

export async function apiPost<T>(url: string, body: any): Promise<T> {
  return apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPut<T>(url: string, body: any): Promise<T> {
  return apiRequest<T>(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T>(url: string, body: any): Promise<T> {
  return apiRequest<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDelete<T>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: "DELETE" });
}
