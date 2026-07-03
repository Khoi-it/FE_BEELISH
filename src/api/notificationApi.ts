import { API_BASE_URL } from '../constants/api';
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
    const response = await fetchWithAuth(`${API_BASE_URL}/api/notification/get-all`, {
        method: 'GET'
    });
    const res = await response.json();
    return res;
};

export const markAllAsRead = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/notification/read`, {
        method: 'PUT'
    });
    return response.json();
};
