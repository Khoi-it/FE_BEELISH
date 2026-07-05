import { useState, useEffect, useMemo } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import VideoLibraryHeader from '../components/video/VideoLibraryHeader'
import VideoGrid from '../components/video/VideoGrid'
import { getVideos } from '../api/videosApi'
import LoadingState from '../components/common/LoadingState'
import ErrorState from '../components/common/ErrorState'

export default function VideoPage() {
  const [videoList, setVideoList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getVideos();
        if (data) {
          setVideoList(data);
        }
      } catch (err) {
        console.error('API error (Videos):', err);
        setError('Không thể tải danh sách video. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoList();
  }, []);

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videoList;
    const lowerQuery = searchQuery.toLowerCase();
    return videoList.filter(v => v.title?.toLowerCase().includes(lowerQuery));
  }, [videoList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#E5D1D0] font-display text-border-dark">
      {/* Bọc AppHeader trong div sticky trực tiếp dưới vùng chứa toàn trang để nó bám dính suốt trang */}
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 pb-6 relative">
        <VideoLibraryHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {isLoading ? (
          <LoadingState text="Đang tải video..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : (
          <VideoGrid videos={filteredVideos} />
        )}
      </main>
    </div>
  )
}
