import { apiRequest } from "@/services/api";
import type { BannerModel, BannerListResponse } from "@/models/internal/BannerModel";

/**
 * GET list of banners
 */
export async function getBanners(): Promise<BannerModel[]> {
  const res = await apiRequest<BannerListResponse>("/api/v1/banners");
  if (res && Array.isArray((res as any).data)) return (res as any).data;
  return [];
}

/**
 * GET banner by id
 */
export async function getBannerById(id: string): Promise<BannerModel | null> {
  try {
    const res = await apiRequest<{ ok: boolean; data: BannerModel }>(`/api/v1/banners/${id}`);
    if (res && (res as any).data) return (res as any).data;
    return null;
  } catch (err) {
    console.error("getBannerById error", err);
    return null;
  }
}

/**
 * Create banner (multipart/form-data)
 * backend expects field 'image' (file), 'title' (string), 'description' (string, optional), 'isActive' (boolean)
 */
export async function createBanner(payload: {
  image: File;
  title: string;
  description?: string;
  isActive?: boolean;
}): Promise<BannerModel> {
  const token = localStorage.getItem("token") ?? "";
  const fd = new FormData();
  fd.append("image", payload.image);
  fd.append("title", payload.title);
  if (payload.description !== undefined) fd.append("description", payload.description);
  if (payload.isActive !== undefined) fd.append("isActive", String(payload.isActive));

  const res = await fetch("/api/v1/banners", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // DO NOT set Content-Type; browser will set boundary for multipart
    },
    body: fd,
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Update banner (multipart/form-data). image optional.
 */
export async function updateBanner(id: string, payload: {
  image?: File | null;
  title?: string;
  description?: string;
  isActive?: boolean;
}): Promise<BannerModel> {
  const token = localStorage.getItem("token") ?? "";
  const fd = new FormData();
  if (payload.image) fd.append("image", payload.image);
  if (payload.title !== undefined) fd.append("title", payload.title);
  if (payload.description !== undefined) fd.append("description", payload.description);
  if (payload.isActive !== undefined) fd.append("isActive", String(payload.isActive));

  const res = await fetch(`/api/v1/banners/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Delete banner
 */
export async function deleteBanner(id: string): Promise<void> {
  await apiRequest(`/api/v1/banners/${id}`, { method: "DELETE" });
}