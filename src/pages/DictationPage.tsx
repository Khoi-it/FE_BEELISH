import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader.jsx'
import DictationTitleBar from '../components/dictation/DictationTitleBar'
import DictationVideoPanel from '../components/dictation/DictationVideoPanel'
import WorkspaceCard from '../components/dictation/WorkspaceCard'
import TranscriptCard, { TranscriptItem } from '../components/dictation/TranscriptCard'
import Footer from '../components/layout/Footer.js'
import { getVideoTranscript } from '../api/videosApi'

export default function DictationPage() {
  const location = useLocation();
  const state = location.state as { videoId?: string } | null;
  const passedVideoId = state?.videoId;

  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  // Using passed videoId or fallback to sample
  const videoIdToFetch = passedVideoId || "jNQXAC9IVRw"; 

  useEffect(() => {
    async function fetchVideoTranscript() {
      if (!videoIdToFetch) return;
      
      setIsLoading(true);
      
      try {
        const data = await getVideoTranscript(videoIdToFetch);
        const transcriptList = data?.content || data || [];
        setTranscripts(transcriptList);
      } catch (error) {
        console.error("Failed to fetch transcript:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideoTranscript();
  }, [videoIdToFetch]);

  const activeTranscript = transcripts.find(
    (t) => currentTime >= t.start && currentTime < t.start + t.dur
  ) || null;

  return (
    <div className="min-h-screen bg-beige-custom text-border-thick">
      <div className="mx-auto max-w-[1440px] p-6">
        <AppHeader />
        <DictationTitleBar />
        <main className="grid grid-cols-12 gap-6">
          <DictationVideoPanel videoId={videoIdToFetch} onTimeUpdate={setCurrentTime} />
          <WorkspaceCard activeTranscript={activeTranscript} />
          <TranscriptCard transcripts={transcripts} isLoading={isLoading} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
