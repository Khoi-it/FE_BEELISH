import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getUserProfile = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/get-stats`, {
        method: 'GET'
    });
    return response.json();
};
export const updateUser= async (data: { name?: string; email?: string ;level? : string}) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update user profile');
    return response.json();
}
export const updateImageUser = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/update-image`, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) throw new Error('Failed to update user image');
    return response.json();
}
export const getStudyHistory= async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/get-history`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch study history');
    return response.json();
}   
export const getStats= async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/get-stats`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch profile stats');
    return response.json();
}
export const getLastWeekStats= async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/get-weekly-stats`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch last week stats');
    return response.json();
}

export const getLastMonthStats = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/get-monthly-stats`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch last month stats');
    return response.json();
}

export const recordStudyDay = async (newWordsMemorized: number = 0) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER}/record-study-day?newWordsMemorized=${newWordsMemorized}`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to record study day');
    return response.json();
}
