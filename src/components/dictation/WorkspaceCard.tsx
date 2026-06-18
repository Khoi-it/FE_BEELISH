import { TranscriptItem } from './TranscriptCard';

interface WorkspaceCardProps {
  activeTranscript?: TranscriptItem | null;
}

export default function WorkspaceCard({ activeTranscript }: WorkspaceCardProps) {
  const words = activeTranscript ? activeTranscript.text.split(' ') : [];

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
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xl font-bold leading-relaxed min-h-[60px]">
            {words.length > 0 ? (
              words.map((word, idx) => (
                <span key={idx} className="underline decoration-4 underline-offset-4 text-border-dark opacity-80">
                  {word}
                </span>
              ))
            ) : (
              <span className="opacity-30 italic">Video is playing...</span>
            )}
          </div>

          <textarea
            className="h-full w-full flex-1 rounded-xl border-none p-6 text-lg font-bold chunky-border focus:outline-none focus:ring-4 focus:ring-primary placeholder:opacity-30"
            placeholder="Type what you hear..."
          />
        </div>

        <div className="flex items-center justify-between border-t-2 border-border-thick bg-background-light p-6">
          <button className="font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg bg-white px-6 py-2">
            Hint (3 left)
          </button>
          <button className="font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg bg-dict-green text-white px-8 py-2">
            Submit Segment
          </button>
        </div>
      </div>
    </section>
  )
}

