export default function AchievementsCard() {
  return (
    <div className="rounded-xl bg-white p-6 chunky-border chunky-shadow">
      <h3 className="mb-4 flex items-center gap-2 uppercase font-black">
        <span className="material-symbols-outlined text-primary">emoji_events</span> Achievements
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center squircle chunky-border bg-dict-green/20">
            <span className="material-symbols-outlined font-black text-dict-green">bolt</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Fastest Fingertips</p>
            <p className="text-xs opacity-70">Typed 40 correct words in 1 min</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center squircle chunky-border bg-primary/20">
            <span className="material-symbols-outlined font-black text-primary">local_fire_department</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Listening Streak</p>
            <p className="text-xs opacity-70">5 days in a row</p>
          </div>
        </div>
      </div>
    </div>
  )
}

