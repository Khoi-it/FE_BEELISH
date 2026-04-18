export default function GoalCard() {
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
            className="text-primary"
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="currentColor"
            strokeDasharray="440"
            strokeDashoffset="132"
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mb-1 font-black text-4xl text-primary material-symbols-outlined">
            emoji_events
          </span>
          <span className="text-2xl font-black">70%</span>
        </div>
      </div>

      <p className="mb-6 font-bold text-slate-500">Bạn chỉ còn 300 XP nữa là hoàn thành mục tiêu ngày!</p>

      <button className="w-full rounded-xl bg-primary py-3 text-lg font-black chunky-btn">
        TIẾP TỤC HÀNH TRÌNH
      </button>
    </div>
  )
}

