export default function UpcomingWorkshopCard() {
  return (
    <div className="col-span-12 chunky-card bg-white p-6 lg:col-span-6">
      <h3 className="mb-6 text-xl font-black uppercase tracking-tight">Sắp diễn ra</h3>
      <div className="flex items-center gap-4 rounded-xl border-3 border-black bg-slate-100 p-4">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border-3 border-black bg-red-500 text-white">
          <span className="text-xs font-black uppercase">JUL</span>
          <span className="leading-none text-xl font-black">15</span>
        </div>

        <div>
          <h4 className="text-lg font-black">Workshop: Slang Tiếng Anh</h4>
          <p className="text-sm font-bold text-slate-500">
            Cùng giáo viên bản ngữ thảo luận về các từ lóng phổ biến năm 2024.
          </p>
        </div>

        <button className="ml-auto rounded-xl bg-white p-2 chunky-btn">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

