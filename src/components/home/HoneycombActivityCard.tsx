export default function HoneycombActivityCard() {
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
                {/* Row 1 */}
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
              </div>

              <div className="flex flex-wrap gap-2 max-w-4xl ml-4">
                {/* Row 2 (offset) */}
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
                <div className="hexagon" />
                <div className="hexagon filled" />
                <div className="hexagon filled" />
              </div>
            </div>

            <div className="max-w-[200px] rounded-2xl border-3 border-dashed border-black bg-primary/20 p-6 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined mb-2 fill-1 text-4xl text-primary">hive</span>
              <h4 className="text-lg font-black">TUYỆT VỜI!</h4>
              <p className="leading-tight text-xs font-bold">
                Bạn đã chăm chỉ hơn 85% học viên khác.
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
        <div className="ml-auto">Cập nhật: 10 phút trước</div>
      </div>
    </div>
  )
}

