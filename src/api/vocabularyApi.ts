import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getUserVocabSets = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch user vocab sets');
    return response.json();
};

export const getSystemVocabSets = async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOCAB_SETS}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch system vocab sets');
    return response.json();
};

export const getWordsByDeckId = async (setId: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.WORDS}?setId=${setId}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch words');
    return response.json();
};

export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const recordStudySession = async (vocabId: string, newWords: number, xpGained: number, progress: number, memoryWords: string[], clozeWords: string[]) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/study-session`, {
        method: 'POST',
        body: JSON.stringify({ vocabId, newWords, xpGained, progress, memoryWords, clozeWords })
    });
    if (!response.ok) throw new Error('Failed to record study session');
    return response.json();
};
