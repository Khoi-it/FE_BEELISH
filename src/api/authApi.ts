import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const login = async (data: any) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
};

export const register = async (data: any) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
};
