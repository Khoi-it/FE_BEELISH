import { useState, useEffect } from 'react';
import { TranscriptItem } from './TranscriptCard';

interface WorkspaceCardProps {
  activeTranscript?: TranscriptItem | null;
  onSubmit?: (val: string) => void;
  isCompleted?: boolean;
  accuracy?: number;
  isWaitingForInput?: boolean;
}

export default function WorkspaceCard({ activeTranscript, onSubmit, isCompleted, accuracy, isWaitingForInput = false }: WorkspaceCardProps) {
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  
  const words = activeTranscript ? activeTranscript.text.split(' ') : [];
  
  const MAX_HINTS = 3;
  const hintsLeft = Math.max(0, MAX_HINTS - hintsUsed);

  // Reset hints and calculate missing spots when transcript changes
  useEffect(() => {
    setHintsUsed(0);
    setInputValues({});
    if (!activeTranscript) {
      setHiddenIndices([]);
      return;
    }
    
    const currentWords = activeTranscript.text.split(' ');
    // Determine how many words to hide (e.g. ~40%)
    const hideCount = Math.max(1, Math.floor(currentWords.length * 0.4));
    const maxHide = Math.min(hideCount, currentWords.length);
    
    const indices = new Set<number>();
    let attempts = 0;
    while (indices.size < maxHide && attempts < 100) {
      indices.add(Math.floor(Math.random() * currentWords.length));
      attempts++;
    }
    
    setHiddenIndices(Array.from(indices).sort((a, b) => a - b));
  }, [activeTranscript]);

  const handleSubmit = () => {
    if (onSubmit) {
      const finalSentence = words.map((word, idx) => {
        return hiddenIndices.includes(idx) ? (inputValues[idx] || '') : word;
      }).join(' ');
      onSubmit(finalSentence);
      setInputValues({});
      setHintsUsed(0);
    }
  };

  const handleHintClick = () => {
    if (hintsUsed < MAX_HINTS && hiddenIndices.length > 0) {
      setHiddenIndices(prev => {
        const next = [...prev];
        const revealedIdx = next.shift(); // reveal the first hidden word from the left
        
        // Auto-fill the revealed word
        if (revealedIdx !== undefined) {
          setInputValues(current => ({ ...current, [revealedIdx]: words[revealedIdx] }));
        }
        return next;
      });
      setHintsUsed(prev => prev + 1);
    }
  };

  if (isCompleted) {
    return (
      <section className="col-span-5 flex flex-col">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow flex-1 items-center justify-center p-8">
          <div className="w-24 h-24 rounded-full bg-dict-green/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-6xl text-dict-green">done_all</span>
          </div>
          <h2 className="text-3xl font-black mb-2 text-border-thick uppercase tracking-widest">Completed!</h2>
          <div className="text-6xl font-black text-primary my-4 drop-shadow-sm">{accuracy}%</div>
          <p className="mt-2 font-bold opacity-50 text-center uppercase tracking-widest">Accuracy</p>
        </div>
      </section>
    );
  }

  return (
    <section className="col-span-5 flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow flex-1">
        <div className="flex items-center justify-between border-b-2 border-border-thick bg-background-light p-4">
          <span className="text-sm font-black uppercase tracking-widest">Workspace</span>
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full border border-border-thick bg-dict-green" />
            <span className="h-3 w-3 rounded-full border border-border-thick bg-primary" />
            <span className="h-3 w-3 rounded-full border border-border-thick bg-dict-red" />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8">
          <div className="flex flex-wrap gap-x-3 gap-y-4 text-xl font-bold leading-relaxed min-h-[160px] content-start">
            {!isWaitingForInput ? (
              <span className="opacity-30 italic">Video is playing...</span>
            ) : words.length > 0 ? (
              words.map((word, idx) => {
                const isHidden = hiddenIndices.includes(idx);
                if (isHidden) {
                  return (
                    <input
                      key={idx}
                      type="text"
                      className="border-b-4 border-border-dark bg-transparent text-center focus:outline-none focus:border-primary placeholder:opacity-30 disabled:opacity-50 min-w-[60px]"
                      style={{ width: `${Math.max(60, word.length * 15)}px` }}
                      value={inputValues[idx] || ''}
                      onChange={(e) => setInputValues({ ...inputValues, [idx]: e.target.value })}
                      disabled={!isWaitingForInput}
                    />
                  );
                }
                return (
                  <span key={idx} className="opacity-80 inline-block">
                    {word}
                  </span>
                )
              })
            ) : (
              <span className="opacity-30 italic">No active transcript...</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t-2 border-border-thick bg-background-light p-6">
          <button 
            className={`font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg px-6 py-2 transition-colors ${hintsLeft > 0 && isWaitingForInput ? 'bg-white hover:bg-gray-50' : 'bg-gray-200 opacity-50 cursor-not-allowed'}`}
            onClick={handleHintClick}
            disabled={hintsLeft === 0 || !isWaitingForInput}
          >
            Hint ({hintsLeft} left)
          </button>
          <button 
            className={`font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg px-8 py-2 transition-colors ${isWaitingForInput ? 'bg-dict-green text-white hover:bg-dict-green/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled={!isWaitingForInput}
          >
            Submit Segment
          </button>
        </div>
      </div>
    </section>
  )
}
