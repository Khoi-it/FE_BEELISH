import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export interface TopUserDTO {
    fullName: string;
    totalXP: number;
    rankPosition: number;
    rankName: string;
}

export interface AdminDashboardData {
    totalUsers: number;
    activeLearners: number;
    totalVocabulary: number;
    videoLessons: number;
    userActivityTrend: number[];
    userDemographics: Record<string, number>;
    topUsers: TopUserDTO[];
}

export const getAdminDashboardData = async (): Promise<AdminDashboardData> => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/dashboard`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch admin dashboard data');
    return response.json();
};
