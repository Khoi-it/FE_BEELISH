interface HoneycombProps {
  checkinHistory?: string[];
}

export default function HoneycombActivityCard({ checkinHistory = [] }: HoneycombProps) {
  // Sinh ra mảng 30 ngày gần nhất
  const today = new Date();
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  // Chuyển đổi lịch sử điểm danh thành Set ngày cho dễ tìm kiếm
  const activeDays = new Set(
    checkinHistory.map((dateStr) => {
      const d = new Date(dateStr);
      return d.toISOString().split('T')[0];
    })
  );

  // Map 30 ngày thành mảng boolean (đã học hay chưa)
  const cells = last30Days.map(day => activeDays.has(day));

  // Tách thành 2 hàng (mỗi hàng 15 ô)
  const row1 = cells.slice(0, 15);
  const row2 = cells.slice(15, 30);

  const activeCount = cells.filter(c => c).length;
  const percentage = Math.round((activeCount / 30) * 100);

  return (
    <div className="col-span-12 chunky-card bg-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Tần suất học</h3>
          <p className="font-bold text-slate-500">Duy trì thói quen để nhận thêm Mật Ong (Honey Points)!</p>
        </div>
        <div className="flex gap-2">
          <button className="chunky-btn rounded-xl bg-white px-4 py-2 font-bold">Tháng này</button>
          <button className="chunky-btn rounded-xl bg-slate-100 px-4 py-2 font-bold opacity-50">
            Năm nay
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2 max-w-4xl">
                {row1.map((isFilled, idx) => (
                  <div key={`r1-${idx}`} className={`hexagon ${isFilled ? 'filled' : ''}`} title={last30Days[idx]} />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 max-w-4xl ml-4">
                {row2.map((isFilled, idx) => (
                  <div key={`r2-${idx}`} className={`hexagon ${isFilled ? 'filled' : ''}`} title={last30Days[idx + 15]} />
                ))}
              </div>
            </div>

            <div className="max-w-[200px] rounded-2xl border-3 border-dashed border-black bg-primary/20 p-6 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined mb-2 fill-1 text-4xl text-primary">hive</span>
              <h4 className="text-lg font-black">{activeCount >= 15 ? 'TUYỆT VỜI!' : 'CỐ GẮNG LÊN!'}</h4>
              <p className="leading-tight text-xs font-bold">
                Bạn đã duy trì học được {activeCount}/30 ngày qua ({percentage}%).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm font-bold opacity-60">
        <div className="flex items-center gap-2">
          <div className="hexagon h-5 w-4" />
          <span>Nghỉ ngơi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hexagon filled h-5 w-4" />
          <span>Đã học</span>
        </div>
        <div className="ml-auto">Cập nhật: Mới nhất</div>
      </div>
    </div>
  )
}
