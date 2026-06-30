import { API_BASE_URL } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export interface IconItem {
    id: string;
    name: string;
    code: string;
    createdAt: string;
}

export const getIcons = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/admin/icons`, {
        method: 'GET'
    });
    return response.json();
};

export const createIcon = async (name: string, code: string) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/admin/icons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code })
    });
    return response.json();
};

export const deleteIcon = async (id: string) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/admin/icons/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
