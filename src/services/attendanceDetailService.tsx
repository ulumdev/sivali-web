import { apiRequest } from "./api";
import type { AttendanceDetailModel } from "@/models/AttendanceDetailModel";

interface ApiResponse<T>{
    status: string;
    data: T;
}

export async function getAttendanceDetail(attId: string): Promise<AttendanceDetailModel | null> {
    try {
        const response = await apiRequest<ApiResponse<AttendanceDetailModel>>(
            `/api/v1/attendance/${attId}`
        );

        if (response?.status === "success" && response.data) {
            return response.data;
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching attendance detail:", error.message ?? error);
        return null;
    }
}