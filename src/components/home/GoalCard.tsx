interface GoalCardProps {
  dailyGoal?: string;
  todayXP?: number;
  progressPercent?: number;
}

export default function GoalCard({ dailyGoal, todayXP = 0, progressPercent = 0 }: GoalCardProps) {
  // Tính toán vòng cung dựa trên %
  const dashoffset = 440 - (440 * progressPercent) / 100;

  return (
    <div className="col-span-12 flex flex-col items-center justify-center gap-0 p-6 text-center lg:col-span-4 chunky-card bg-white">
      <h3 className="mb-6 text-xl font-black uppercase tracking-tight">Mục tiêu hôm nay</h3>

      <div className="relative mb-6 flex h-40 w-40 items-center justify-center">
        <svg className="h-full w-full -rotate-90">
          <circle
            className="text-slate-100"
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
          />
          <circle
            className="text-primary transition-all duration-1000 ease-out"
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="currentColor"
            strokeDasharray="440"
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mb-1 font-black text-4xl text-primary material-symbols-outlined">
            emoji_events
          </span>
          <span className="text-2xl font-black">{progressPercent}%</span>
        </div>
      </div>

      <p className="mb-6 font-bold text-slate-500">
        Hôm nay bạn đã đạt <span className="text-primary text-xl">{todayXP}</span> / {dailyGoal || '50 XP'}
      </p>

      <button className="w-full rounded-xl bg-primary py-3 text-lg font-black chunky-btn">
        TIẾP TỤC HÀNH TRÌNH
      </button>
    </div>
  )
}
