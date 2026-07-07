import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/fetchClient';
import { API_BASE_URL } from '../constants/api';

interface VideoProgress {
  videoId: string;
  resumeAt: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  rankPosition: number;
  rankName: string;
  isCurrentUser: boolean;
}

interface DashboardData {
  dailyGoal: string;
  todayXP: number;
  progressPercent: number;
  checkinHistory: string[];
  currentVideo: VideoProgress | null;
  leaderboard: LeaderboardUser[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/home/dashboard`, {
          method: 'GET'
        });
        
        if (response.status === 401 || response.status === 403) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsAuthenticated(true);
      } catch (error: any) {
        console.error("Lỗi lấy dữ liệu dashboard:", error);
        // Nếu fetchWithAuth fail hoàn toàn (ví dụ refresh token cũng hết hạn), hiển thị modal
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, isAuthenticated, loading };
};


