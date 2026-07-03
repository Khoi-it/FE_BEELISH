import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getGoalProgress = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.HOME}/dashboard`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch goal progress');
    const res = await response.json();
    return res.data?.progressPercent || res;
};

export const getContinueLearning = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.HOME}/dashboard`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch continue learning data');
    const res = await response.json();
    return res.data?.currentVideo || res;
};
