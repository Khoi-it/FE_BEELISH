import { useState, useEffect } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import VideoLibraryHeader from '../components/video/VideoLibraryHeader'
import VideoGrid from '../components/video/VideoGrid'
import { getVideos } from '../api/videosApi'

export default function VideoPage() {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const data = await getVideos();
        if (data) {
          setVideoList(data);
        }
      } catch (err) {
        console.error('API error (Videos):', err);
      }
    };
    fetchVideoList();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#E5D1D0] font-display text-border-dark">
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] shrink-0 px-4 pt-6">
          <AppHeader />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
          <div className="mx-auto max-w-[1440px]">
            <VideoLibraryHeader />
            <VideoGrid videos={videoList} />
          </div>
        </div>
      </main>
    </div>
  )
}
