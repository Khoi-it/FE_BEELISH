interface DeckCardProps {
  icon: string;
  title: string;
  wordCount: number;
  progress: number;
  onSelect: () => void;
}

const ICON_STYLES: Record<string, { wrap: string, bar: string }> = {
  folder: { wrap: "bg-primary", bar: "bg-primary" },
  inventory_2: { wrap: "bg-tertiary", bar: "bg-tertiary" },
  auto_stories: { wrap: "bg-secondary-container", bar: "bg-secondary-container" },
  school: { wrap: "bg-primary", bar: "bg-primary" },
  travel_explore: { wrap: "bg-tertiary-container", bar: "bg-tertiary-container" },
};
const DEFAULT_STYLE = { wrap: "bg-secondary-container", bar: "bg-secondary-container" };

export default function DeckCard({ icon, title, wordCount, progress, onSelect }: DeckCardProps) {
  const styles = ICON_STYLES[icon] || DEFAULT_STYLE;
  const iconWrapClass = styles.wrap;
  const barClass = styles.bar;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.()
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
