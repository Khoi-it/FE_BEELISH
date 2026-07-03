export interface TranscriptItem {
  text: string;
  start: number;
  dur: number;
}

interface TranscriptCardProps {
  transcripts?: TranscriptItem[];
  isLoading?: boolean;
  activeIndex?: number;
  onTranscriptClick?: (index: number) => void;
}

function formatTime(secondsIn: number) {
  const totalSeconds = Math.floor(secondsIn);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function TranscriptCard({ transcripts = [], isLoading = false, activeIndex = -1, onTranscriptClick }: TranscriptCardProps) {
  return (
    <section className="col-span-3 flex flex-col h-full max-h-[800px]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow">
        <div className="border-border-thick bg-primary p-4 text-center font-black uppercase tracking-widest border-b-2 flex justify-between items-center">
          <span>Transcript</span>
          {isLoading && <span className="text-xs animate-pulse">Loading...</span>}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {!isLoading && transcripts.length === 0 && (
            <div className="text-center text-sm font-bold opacity-50 p-4">
              No transcript available.
            </div>
          )}
          {transcripts.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isFuture = idx > activeIndex;
            const isPast = idx < activeIndex;
            
            let containerClass = "group flex items-start gap-3 rounded-xl p-3 transition-all chunky-border " +
              (isFuture ? "cursor-not-allowed opacity-50 border-transparent " : "cursor-pointer ") +
              (isActive ? "border-primary bg-primary/10 " : "") +
              (!isActive && !isFuture ? "border-transparent hover:border-border-thick hover:bg-background-light " : "");
              
            let textClass = "text-sm font-bold leading-tight " + (isActive ? "text-primary" : "");
            
            return (
              <div 
                key={idx} 
                className={containerClass}
                onClick={() => {
                  if (!isFuture && onTranscriptClick) {
                    onTranscriptClick(idx);
                  }
                }}
              >
                <button className={`shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active ${isActive ? 'bg-primary text-white' : 'bg-white'}`}>
                  <span className="material-symbols-outlined text-sm font-black">{isActive ? 'play_arrow' : (idx < activeIndex ? 'check' : 'lock')}</span>
                </button>
                <div>
                  <span className="mb-1 block text-[10px] font-black opacity-50">{formatTime(item.start)}</span>
                  <p className={textClass}>
                    {idx < activeIndex ? item.text : (isActive ? "Đang nghe..." : "...")}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
