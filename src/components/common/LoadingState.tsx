export default function LoadingState({ fullScreen = false, text = "Đang tải..." }: { fullScreen?: boolean, text?: string }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-300 shadow-[4px_4px_0px_0px_#283f3b]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#283f3b] border-r-[#283f3b] animate-spin"></div>
      </div>
      <p className="font-black uppercase tracking-widest text-[#283f3b] animate-pulse">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm font-display">
        {content}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center min-h-[200px] font-display">
      {content}
    </div>
  );
}
