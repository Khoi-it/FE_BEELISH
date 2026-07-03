interface DictationTitleBarProps {
  title?: string;
  accuracy?: number;
}

export default function DictationTitleBar({ title = "Video Lesson", accuracy }: DictationTitleBarProps) {
  return (
    <div className="mb-6 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Youtube Dictation</h2>
        <p className="font-semibold text-border-thick">{title}</p>
      </div>
      <div className="flex gap-3">
        <div className="rounded-lg bg-white px-4 py-2 font-bold chunky-border">Level: B2</div>
        {accuracy !== undefined && (
          <div className="rounded-lg bg-white px-4 py-2 font-bold chunky-border">Accuracy: {accuracy}%</div>
        )}
      </div>
    </div>
  )
}

