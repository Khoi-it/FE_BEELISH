import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import AchievementsCard from './AchievementsCard'

interface DictationVideoPanelProps {
  videoId: string;
  isCompleted?: boolean;
  onTimeUpdate: (time: number) => void;
  onReplaySegment?: () => void;
  onReady?: () => void;
  onVideoFinished?: () => void;
}

export interface DictationVideoRef {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
}

const YOUTUBE_OPTS = {
  width: '100%',
  height: '100%',
  playerVars: {
    controls: 0 as const,
    disablekb: 1 as const,
    rel: 0 as const,
    modestbranding: 1 as const
  }
};

const DictationVideoPanel = forwardRef<DictationVideoRef, DictationVideoPanelProps>(
  ({ videoId, isCompleted, onTimeUpdate, onReplaySegment, onReady: onReadyCallback, onVideoFinished }, ref) => {
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => playerRef.current?.playVideo(),
      pause: () => playerRef.current?.pauseVideo(),
      seekTo: (time: number) => {
        playerRef.current?.seekTo(time, true);
        setCurrentTime(time);
        onTimeUpdate(time);
      }
    }));

    const onReady: YouTubeProps['onReady'] = (event) => {
      playerRef.current = event.target;
      setDuration(event.target.getDuration());
      if (onReadyCallback) {
        onReadyCallback();
      }
    };

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {
      if (event.data === YouTube.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      if (event.data === YouTube.PlayerState.ENDED) {
        if (onVideoFinished) {
          onVideoFinished();
        }
      }
    };

    useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (isPlaying && playerRef.current) {
        interval = setInterval(async () => {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
          onTimeUpdate(time);
        }, 200);
      }
      return () => clearInterval(interval);
    }, [isPlaying, onTimeUpdate]);

    const togglePlay = () => {
      if (!playerRef.current) return;
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    };

    const rewind = () => {
      if (onReplaySegment) {
        onReplaySegment();
      } else {
        if (!playerRef.current) return;
        const newTime = Math.max(0, currentTime - 5);
        playerRef.current.seekTo(newTime, true);
        setCurrentTime(newTime);
        onTimeUpdate(newTime);
      }
    };

    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow">
          <div className="aspect-video relative bg-black group/video">
            {videoId ? (
              <YouTube
                videoId={videoId}
                opts={YOUTUBE_OPTS}
                onReady={onReady}
                onStateChange={onStateChange}
                className="absolute inset-0 w-full h-full"
                iframeClassName="w-full h-full object-cover pointer-events-none"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold">No Video</div>
            )}

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity cursor-pointer"
              onClick={togglePlay}
            >
              <button
                className="chunky-shadow-active chunky-border chunky-shadow rounded-full bg-primary p-6 pointer-events-auto transition-transform hover:scale-110"
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              >
                <span className="material-symbols-outlined text-4xl font-black">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {!isPlaying && currentTime === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40">
                <button
                  className="chunky-shadow-active chunky-border chunky-shadow rounded-full bg-primary p-6 pointer-events-auto transition-transform hover:scale-110"
                  onClick={togglePlay}
                >
                  <span className="material-symbols-outlined text-4xl font-black">
                    play_arrow
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 bg-white p-6">
            <div className="flex gap-4">
              <button
                onClick={rewind}
                className="group flex flex-col items-center justify-center gap-1 flex-1 rounded-xl bg-primary py-4 chunky-border chunky-shadow chunky-shadow-active hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl font-black">
                  replay_5
                </span>
                <span className="text-xs font-black uppercase tracking-widest">Replay Segment</span>
              </button>
              <button
                onClick={togglePlay}
                className="flex flex-col items-center justify-center gap-1 flex-1 rounded-xl bg-primary py-4 chunky-border chunky-shadow chunky-shadow-active hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl font-black">{isPlaying ? 'pause' : 'play_arrow'}</span>
                <span className="text-xs font-black uppercase tracking-widest">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>

            <div className="flex items-center gap-4 px-2">
              <span className="text-sm font-bold w-10 text-right">{formatTime(currentTime)}</span>
              <div 
                className={`relative flex-1 overflow-hidden rounded-full border-border-thick chunky-border h-4 bg-background-light ${isCompleted ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={(e) => {
                  if (!isCompleted || !playerRef.current || duration === 0) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  playerRef.current.seekTo(newTime, true);
                  setCurrentTime(newTime);
                  onTimeUpdate(newTime);
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full border-r-2 border-border-thick bg-primary transition-all duration-200 pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-bold w-10">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* <AchievementsCard /> */}
      </section>
    )
  }
)

export default DictationVideoPanel;

