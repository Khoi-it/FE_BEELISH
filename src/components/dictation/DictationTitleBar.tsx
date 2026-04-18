export default function DictationTitleBar() {
  return (
    <div className="mb-6 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Youtube Dictation</h2>
        <p className="font-semibold text-border-thick">Mastering British Accents — Lesson 04</p>
      </div>
      <div className="flex gap-3">
        <div className="rounded-lg bg-white px-4 py-2 font-bold chunky-border">Level: B2</div>
        <div className="rounded-lg bg-white px-4 py-2 font-bold chunky-border">Accuracy: 88%</div>
      </div>
    </div>
  )
}

