import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getVideos = async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VIDEOS}/get-all${query}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch videos');
    const res = await response.json();
    return res.data || res;
};

export const getVideoById = async (id: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VIDEOS}/get/${id}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch video');
    const res = await response.json();
    return res.data || res;
};

export const getVideoTranscript = async (videoId: string) => {
    // Lưu ý: Đảm bảo endpoint này trùng khớp với cấu hình phía Backend của bạn
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.VIDEOS}/get-transcript/${videoId}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch transcript');
    const res = await response.json();
    let data = res.data || res;
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse transcript JSON', e);
        }
    }
    return data;
};

export const createVideo = async (data: any) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/video/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create video');
    return response.json();
};

export const updateVideo = async (id: string, data: any) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/video/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update video');
    return response.json();
};

export const deleteVideo = async (id: string) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/video/delete/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete video');
    return response.json();
};
