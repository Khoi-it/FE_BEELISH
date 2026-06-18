import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react';

const getYoutubeVideoId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  return '';
};

// Hàm lấy thumbnail YouTube
const getYoutubeThumbnail = (url) => {
  const videoId = getYoutubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return '';
};

// Thêm hàm chuyển đổi duration
const formatDuration = (duration) => {
  if (!duration) return '00:00';

  let hours = 0, minutes = 0, seconds = 0;

  // Trường hợp 1: Dạng chuỗi ISO 8601 từ YouTube API (VD: PT1H2M10S, PT15M33S)
  if (typeof duration === 'string' && duration.startsWith('PT')) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (match) {
      hours = parseInt(match[1]) || 0;
      minutes = parseInt(match[2]) || 0;
      seconds = parseInt(match[3]) || 0;
    }
  } 
  // Trường hợp 2: Dạng tổng số giây (VD: 3665)
  else if (!isNaN(duration)) {
    const totalSeconds = parseInt(duration, 10);
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;
  } else {
    // Nếu truyền vào đã là dạng format sẵn hoặc lỗi, trả về nguyên bản
    return duration;
  }

  // Format hiển thị
  const hoursStr = hours > 0 ? `${hours}:` : '';
  const minutesStr = hours > 0 ? minutes.toString().padStart(2, '0') + ':' : `${minutes}:`;
  const secondsStr = seconds.toString().padStart(2, '0');

  return `${hoursStr}${minutesStr}${secondsStr}`;
};

export default function VideoCard({
  url,
  duration,
  title,
  viewCount,
  upload_date,
}) {
  const imageSrc = getYoutubeThumbnail(url);
  
  // Format lại duration
  const formattedDuration = formatDuration(duration);

  // Tính toán thời gian
  const timeAgo = new Date().getTime() - new Date(upload_date).getTime() < 24 * 60 * 60 * 1000
    ? `${Math.floor((new Date().getTime() - new Date(upload_date).getTime()) / (60 * 60 * 1000))} giờ trước`
    : `${Math.floor((new Date().getTime() - new Date(upload_date).getTime()) / (24 * 60 * 60 * 1000))} ngày trước`;

  const videoId = getYoutubeVideoId(url);

  return (
    <Link
      to={ROUTES.DICTATION}
      state={{ videoId }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border-none bg-white chunky-border shadow-chunky transition-all group hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      aria-label={`Mở bài học: ${title}`}
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          className="h-full w-full object-cover" 
          src={imageSrc} 
          alt={title} 
          onError={(e) => {
            e.target.src = imageSrc.replace('maxresdefault.jpg', 'hqdefault.jpg');
          }}
        />
        {/* Render duration đã format ở đây */}
        <span className="absolute bottom-3 right-3 rounded bg-border-dark px-2 py-1 text-xs font-black text-white chunky-border border-white">
          {formattedDuration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-extrabold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between opacity-60 text-xs font-bold">
          <span>{viewCount} <Eye className="inline-block h-4 w-4" /></span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  )
}