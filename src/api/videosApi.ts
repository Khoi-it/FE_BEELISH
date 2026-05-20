import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getVideos = async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VIDEOS}${query}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch videos');
    return response.json();
};

export const getVideoById = async (id: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VIDEOS}/${id}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch video');
    return response.json();
};
