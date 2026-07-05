import { useState, useEffect } from 'react';
import { getVideos } from '../../api/videosApi';
import { useNavigate } from 'react-router-dom';

const getYoutubeThumbnail = (url: string) => {
  if (!url) return '';
  const match = url.match(/[?&]v=([^&]+)/);
  const videoId = match ? match[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
};

const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function ContinueLearningCard() {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState<any>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const videos = await getVideos();
        if (videos && videos.length > 0) {
          const topVideo = videos.reduce((prev: any, current: any) => (prev.viewCount > current.viewCount) ? prev : current);
          setLessonData({
            id: topVideo.id,
            level: "Phổ biến nhất",
            imageAlt: topVideo.title,
            dataAlt: topVideo.title,
            imageSrc: getYoutubeThumbnail(topVideo.url) || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1470',
            duration: formatDuration(topVideo.duration || 0),
            title: topVideo.title,
            description: "Video được xem nhiều nhất hiện tại. Khám phá ngay!",
            views: topVideo.viewCount || 0
          });
        }
      } catch (error) {
        console.warn("Lỗi khi tải video gợi ý:", error);
      }
    };
    fetchLesson();
  }, []);

  if (!lessonData) {
      return (
          <div className="col-span-12 md:col-span-12 flex flex-col overflow-hidden rounded-none p-0 lg:col-span-8 chunky-card bg-white animate-pulse">
              <div className="h-full w-full min-h-[300px] bg-slate-200"></div>
          </div>
      );
  }

  return (
    <div className="col-span-12 md:col-span-12 flex flex-col overflow-hidden rounded-none p-0 lg:col-span-8 chunky-card bg-white">
      <div className="flex items-center justify-between border-b-3 border-black bg-primary/10 p-6">
        <h3 className="text-xl font-black uppercase tracking-tight">Video xem nhiều nhất</h3>
        <span className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
          {lessonData.level}
        </span>
      </div>

      <div className="flex-1 flex-col md:flex-row flex">
        <div className="md:w-1/2 p-4">
          <div className="relative aspect-video overflow-hidden rounded-xl border-3 border-black group">
            <img
              alt={lessonData.imageAlt}
              className="h-full w-full object-cover"
              data-alt={lessonData.dataAlt}
              src={lessonData.imageSrc}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex h-16 w-16 scale-90 items-center justify-center rounded-full border-3 border-black bg-primary shadow-lg transform group-hover:scale-100 transition-transform">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 rounded-md bg-black px-2 py-1 text-xs font-bold text-white">
              {lessonData.duration}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h4 className="mb-2 leading-tight text-2xl font-black">{lessonData.title}</h4>
          <p className="mb-6 font-bold text-slate-500">
            {lessonData.description}
          </p>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-black text-slate-600">
              <span className="material-symbols-outlined">visibility</span>
              <span>{lessonData.views.toLocaleString()} lượt xem</span>
            </div>
          </div>

          <button 
            onClick={() => navigate(`/video/${lessonData.id}`)}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 chunky-btn font-black hover:bg-primary/80 transition-colors"
          >
            <span className="material-symbols-outlined">play_circle</span>
            XEM VIDEO NGAY
          </button>
        </div>
      </div>
    </div>
  )
}
