export default function ContinueLearningCard() {
  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-none p-0 lg:col-span-8 chunky-card bg-white">
      <div className="flex items-center justify-between border-b-3 border-black bg-primary/10 p-6">
        <h3 className="text-xl font-black uppercase tracking-tight">Tiếp tục học</h3>
        <span className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
          Trung cấp
        </span>
      </div>

      <div className="flex-1 flex-col md:flex-row flex">
        <div className="md:w-1/2 p-4">
          <div className="relative aspect-video overflow-hidden rounded-xl border-3 border-black group">
            <img
              alt="Restaurant lesson"
              className="h-full w-full object-cover"
              data-alt="Waitress taking an order in a bright modern restaurant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5IWuPof2m_UWawDnZ_S3IgX8xbqZnIZr7GYEGcCKpo0eG5fFRXT1g0hC9FnvgrfB9zkIM-FxqtA2yhrLWJjDjeHfhNSpg_CYOk0sYYysoietOn2oS22Ay7HFXjDjKQK5z0t-LS88ymfP_vub4zzKXfsgJ-RDRSW5i-TCzhL_X4Bb0iIb9L_RuRFgLZmAoeKYL3I23bQFxQ9hiEITh7wgqXtP6nqDPjwHIXej4DwPrw8ZDFffmj2DBZwCSydLSpmGYVNiE32kV8qU"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex h-16 w-16 scale-90 items-center justify-center rounded-full border-3 border-black bg-primary shadow-lg transform group-hover:scale-100 transition-transform">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 rounded-md bg-black px-2 py-1 text-xs font-bold text-white">
              12:45
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h4 className="mb-2 leading-tight text-2xl font-black">Bài 12: Đặt món tại nhà hàng</h4>
          <p className="mb-6 font-bold text-slate-500">
            Học cách sử dụng các mẫu câu lịch sự khi giao tiếp với phục vụ bàn.
          </p>

          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm font-black uppercase">
              <span>Tiến độ bài học</span>
              <span>45%</span>
            </div>
            <div className="h-5 w-full overflow-hidden rounded-full border-3 border-black bg-slate-100">
              <div className="h-full w-[45%] border-r-3 border-black bg-primary" />
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 chunky-btn font-black">
            <span className="material-symbols-outlined">play_circle</span>
            XEM VIDEO NGAY
          </button>
        </div>
      </div>
    </div>
  )
}

