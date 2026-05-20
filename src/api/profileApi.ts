import { API_BASE_URL } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getProfileStats = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/profile/stats`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch profile stats');
    return response.json();
};

export const getStudyHistory = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/profile/history`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch study history');
    return response.json();
};
