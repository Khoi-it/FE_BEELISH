interface VideoLibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function VideoLibraryHeader({ searchQuery, onSearchChange }: VideoLibraryHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 px-4">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Thư viện Video</h2>
        <p className="font-bold opacity-60">
          Khám phá các bài học tiếng Anh qua video chất lượng cao
        </p>
      </div>

      <div className="flex w-full md:w-auto relative">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm video..." 
          className="w-full md:w-80 rounded-lg bg-white px-4 py-2.5 pl-10 font-bold shadow-chunky-sm chunky-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
      </div>
    </div>
  )
}

