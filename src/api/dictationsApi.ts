import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getDictations = async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.DICTATIONS}${query}`, {
        method: 'GET'
    });
    return response.json();
};

export const getDictationById = async (id: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.DICTATIONS}/${id}`, {
        method: 'GET'
    });
    return response.json();
};

export const submitDictation = async (data: any) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.DICTATIONS}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
};
