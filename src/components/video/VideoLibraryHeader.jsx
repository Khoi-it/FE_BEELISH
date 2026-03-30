export default function VideoLibraryHeader() {
  return (
    <div className="mb-8 flex justify-between items-end px-4">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Thư viện Video</h2>
        <p className="font-bold opacity-60">
          Khám phá các bài học tiếng Anh qua video chất lượng cao
        </p>
      </div>

      <div className="flex gap-2">
        <button className="rounded-lg bg-white px-4 py-2 font-bold shadow-chunky-sm chunky-border hover:bg-primary transition-colors">
          Tất cả
        </button>
        <button className="rounded-lg bg-white px-4 py-2 font-bold shadow-chunky-sm chunky-border hover:bg-primary transition-colors">
          Mới nhất
        </button>
        <button className="rounded-lg bg-white px-4 py-2 font-bold shadow-chunky-sm chunky-border hover:bg-primary transition-colors">
          Phổ biến
        </button>
      </div>
    </div>
  )
}

