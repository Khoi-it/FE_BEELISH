import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader.jsx'
import DictationTitleBar from '../components/dictation/DictationTitleBar'
import DictationVideoPanel, { DictationVideoRef } from '../components/dictation/DictationVideoPanel'
import WorkspaceCard from '../components/dictation/WorkspaceCard'
import TranscriptCard, { TranscriptItem } from '../components/dictation/TranscriptCard'
import Footer from '../components/layout/Footer.js'
import { getVideoTranscript } from '../api/videosApi'
import { recordStudyDay } from '../api/userApi'
import { useAuth } from '../contexts/AuthContext'

export default function DictationPage() {
  const location = useLocation();
  const state = location.state as { videoId?: string, dbId?: string | number, title?: string } | null;
  const passedVideoId = state?.videoId;
  const passedDbId = state?.dbId;
  const videoTitle = state?.title || "Listening Practice";

  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  
  const { user, setUser } = useAuth();
  const [hasAddedVideoXP, setHasAddedVideoXP] = useState(false);

  const videoPanelRef = useRef<DictationVideoRef>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasInitialSeeked, setHasInitialSeeked] = useState(false);

  // Using passed videoId or fallback to sample
  const videoIdToFetch = passedVideoId || "jNQXAC9IVRw";
  const dbIdToFetch = passedDbId || videoIdToFetch;

  useEffect(() => {
    async function fetchVideoTranscript() {
      if (!dbIdToFetch) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getVideoTranscript(dbIdToFetch.toString());
        const transcriptList = data?.content || data || [];

        // Filter out music segments
        const filteredTranscripts = transcriptList.filter((t: TranscriptItem) => {
          const text = t.text.trim().toLowerCase();
          if (text.includes('[music]') || text.includes('[âm nhạc]') || text.includes('[ âm nhạc ]') || text.includes('(music)')) return false;
          return true;
        }).map((t: TranscriptItem) => ({ ...t, text: t.text.trim() }));

        setTranscripts(filteredTranscripts);
      } catch (err) {
        console.error("Failed to fetch transcript:", err);
        setError("Không thể tải phụ đề. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideoTranscript();
  }, [dbIdToFetch]);

  // Initial seek when transcripts are loaded and video is ready
  useEffect(() => {
    if (isVideoReady && transcripts.length > 0 && !hasInitialSeeked) {
      const start = transcripts[0]?.start;
      if (typeof start === 'number') {
        // Add a small delay to avoid YouTube API crash on immediate seek
        setTimeout(() => {
          if (videoPanelRef.current) {
            videoPanelRef.current.seekTo(start);
            videoPanelRef.current.pause();
          }
        }, 300);
      }
      setHasInitialSeeked(true);
    }
  }, [isVideoReady, transcripts, hasInitialSeeked]);

  const activeTranscript = transcripts[currentSegmentIndex] || null;
  const isCompleted = transcripts.length > 0 && currentSegmentIndex >= transcripts.length;

  const [streakRecorded, setStreakRecorded] = useState(false);

  useEffect(() => {
    if (isCompleted && !streakRecorded) {
      setStreakRecorded(true);
      recordStudyDay(0).then(() => {
        window.dispatchEvent(new Event('userStatsUpdated'));
      }).catch(console.error);
    }
  }, [isCompleted, streakRecorded]);

  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  useEffect(() => {
    if (activeTranscript && currentTime >= activeTranscript.start + activeTranscript.dur) {
      if (!isWaitingForInput) {
        videoPanelRef.current?.pause();
        setIsWaitingForInput(true);
      }
    }
  }, [currentTime, activeTranscript, isWaitingForInput]);

  const handleSubmitSegment = (inputValue: string) => {
    setUserInputs(prev => [...prev, inputValue]);
    setIsWaitingForInput(false);
    if (currentSegmentIndex < transcripts.length - 1) {
      const nextIndex = currentSegmentIndex + 1;
      setCurrentSegmentIndex(nextIndex);
      const nextTranscript = transcripts[nextIndex];
      if (nextTranscript) {
        videoPanelRef.current?.play();
      }
    } else {
      // Completed all segments
      setCurrentSegmentIndex(transcripts.length);
    }
  };

  const handleReplaySegment = () => {
    if (activeTranscript) {
      setIsWaitingForInput(false);
      videoPanelRef.current?.seekTo(activeTranscript.start);
      videoPanelRef.current?.play();
    }
  };

  const handleTranscriptClick = (index: number) => {
    const transcript = transcripts[index];
    if (transcript) {
      setCurrentSegmentIndex(index);
      setIsWaitingForInput(false);
      videoPanelRef.current?.seekTo(transcript.start);
      videoPanelRef.current?.play();
    }
  };

  const accuracy = useMemo(() => {
    if (!isCompleted) return 0;
    let correct = 0;
    let total = 0;
    transcripts.forEach((t, i) => {
      const tWords = t.text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(Boolean);
      const uWords = (userInputs[i] || '').toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(Boolean);

      total += tWords.length;
      tWords.forEach((tw, idx) => {
        if (tw === uWords[idx]) correct++;
      });
    });
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }, [isCompleted, transcripts, userInputs]);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleVideoFinished = useCallback(() => {
    if (!hasAddedVideoXP && user) {
      setHasAddedVideoXP(true);
      const updatedUser = { ...user, totalXP: (user.totalXP || 0) + 50 };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert("Chúc mừng! Bạn nhận được 50 XP vì đã hoàn thành xem video!");
      window.dispatchEvent(new Event('userStatsUpdated'));
    }
  }, [hasAddedVideoXP, user, setUser]);

  return (
    <div className="flex flex-col min-h-screen bg-beige-custom text-border-thick">
      <div className="flex flex-col flex-1 mx-auto w-full max-w-[1440px] px-4 py-6 md:p-6">
        <AppHeader />
        <DictationTitleBar title={videoTitle} accuracy={accuracy} />
        <main className="flex-1 grid grid-cols-12 gap-6 mb-6">
          <DictationVideoPanel
            ref={videoPanelRef}
            videoId={videoIdToFetch}
            onTimeUpdate={setCurrentTime}
            onReplaySegment={handleReplaySegment}
            onReady={handleVideoReady}
            onVideoFinished={handleVideoFinished}
          />
          <WorkspaceCard
            activeTranscript={activeTranscript}
            onSubmit={handleSubmitSegment}
            isCompleted={isCompleted}
            accuracy={accuracy}
            isWaitingForInput={isWaitingForInput}
          />
          <TranscriptCard 
            transcripts={transcripts} 
            isLoading={isLoading} 
            error={error}
            activeIndex={currentSegmentIndex}
            onTranscriptClick={handleTranscriptClick}
          />
        </main>
      </div>
      <Footer />
    </div>
  )
}
