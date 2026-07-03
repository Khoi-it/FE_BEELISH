import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from './fetchClient';

export const getUserVocabSets = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/get-all`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch user vocab sets');
    const res = await response.json();
    return res;
};

export const getSystemVocabSets = async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOCAB_SETS}/get-all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch system vocab sets');
    const res = await response.json();
    return res;
};

export const getWordsByDeckId = async (setId: string | number) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.WORDS}/get-all?setId=${setId}`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch words');
    const res = await response.json();
    return res;
};

export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}/get-all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    const res = await response.json();
    return res;
};

export const recordStudySession = async (vocabId: string, newWords: number, xpGained: number, progress: number, memoryWords: string[], clozeWords: string[]) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/study-session`, {
        method: 'POST',
        body: JSON.stringify({ vocabId, newWords, xpGained, progress, memoryWords, clozeWords })
    });
    if (!response.ok) throw new Error('Failed to record study session');
    return response.json(); // components using this may expect full response or not, keep as is or unpack?
};
