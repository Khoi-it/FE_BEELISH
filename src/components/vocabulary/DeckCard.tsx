interface DeckCardProps {
  icon: string;
  title: string;
  wordCount: number;
  progress: number;
  barClass: string;
  iconWrapClass: string;
  onSelect: (title: string) => void;
}

export default function DeckCard({ icon, title, wordCount, progress, barClass, iconWrapClass, onSelect }: DeckCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(title)
        }
      }}
      className="group cursor-pointer rounded-xl border-4 border-secondary bg-surface-variant p-6 transition-all brutalist-shadow-lg brutalist-shadow-hover"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center border-4 border-secondary brutalist-shadow ${iconWrapClass}`}
      >
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="mb-2 text-2xl font-black uppercase leading-tight">{title}</h3>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-black uppercase tracking-widest text-surface">
          {wordCount} Words
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-black uppercase">
          <span>Tiến độ</span>
          <span>{progress}%</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full border-2 border-secondary bg-surface">
          <div
            className={`h-full border-r-2 border-secondary ${barClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
