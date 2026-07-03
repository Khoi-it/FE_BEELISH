import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export interface NotificationLog {
    id: string;
    title: string;
    message: string;
    targetType: string;
    targetUserId?: string;
    createdAt: string;
}

export const getNotificationHistory = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/notification/get-history`, {
        method: 'GET'
    });
    const res = await response.json();
    return res.data || res;
};

export const sendNotification = async (payload: { targetType: string, targetUserId?: string, title: string, message: string }) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/notification/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return response.json();
};
