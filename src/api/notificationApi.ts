import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export interface NotificationItem {
    id: string;
    userId: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export const getNotifications = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.NOTIFICATION}/get-all`, {
        method: 'GET'
    });
    const res = await response.json();
    return res;
};

export const markAllAsRead = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.NOTIFICATION}/read`, {
        method: 'PUT'
    });
    return response.json();
};
