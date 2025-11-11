export interface BannerModel {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    bannerUrl?: string;
    description?: string;
    isActive?: boolean;
    title?: string;
}

export interface BannerListResponse {
    ok: boolean;
    data: BannerModel[];
}