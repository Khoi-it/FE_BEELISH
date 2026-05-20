import { API_BASE_URL } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getGoalProgress = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/home/goal`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch goal progress');
    return response.json();
};

export const getContinueLearning = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/home/continue-learning`, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch continue learning data');
    return response.json();
};
