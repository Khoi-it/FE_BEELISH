import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getVocabulary = async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VOCABULARY}${query}`, {
        method: 'GET'
    });
    return response.json();
};

export const getVocabularyById = async (id: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VOCABULARY}/${id}`, {
        method: 'GET'
    });
    return response.json();
};
