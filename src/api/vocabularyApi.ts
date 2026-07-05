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
    return response.json(); 
};

export const createCustomVocabSet = async (vocabSet: any, words: any[]) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/custom`, {
        method: 'POST',
        body: JSON.stringify({ vocabSet, words })
    });
    if (!response.ok) {
        const text = await response.text();
        console.error('Raw backend error response:', text);
        try {
            const err = JSON.parse(text);
            throw new Error(err.error || err.message || 'Failed to create custom vocab set');
        } catch(e: any) {
            throw new Error(e.message || 'Failed to create custom vocab set');
        }
    }
    return response.json();
};

export const updateCustomVocabSet = async (vocabId: string, vocabSet: any, words: any[]) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/custom/${vocabId}`, {
        method: 'PUT',
        body: JSON.stringify({ vocabSet, words })
    });
    if (!response.ok) throw new Error('Failed to update custom vocab set');
    return response.json();
};

export const deleteCustomVocabSet = async (vocabId: string) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/custom/${vocabId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete custom vocab set');
    return true;
};

export const addSystemVocabSet = async (vocabId: string) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/add-system/${vocabId}`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to add system vocab set');
    return response.json();
};

export const downloadUserExcelTemplate = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/excel-template`);
    if (!response.ok) throw new Error('Failed to download template');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vocabulary_Template.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};

export const parseUserExcel = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.USER_VOCAB_SETS}/parse-excel`, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        throw new Error('Failed to parse excel file');
    }
    return response.json();
};
