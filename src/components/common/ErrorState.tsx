interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorState({ message = "Đã có lỗi xảy ra. Vui lòng thử lại sau.", onRetry, fullScreen = false }: ErrorStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6 p-8 text-center max-w-md mx-auto">
      <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border-4 border-[#283f3b] bg-red-100 shadow-[8px_8px_0px_0px_#283f3b]">
        <span className="material-symbols-outlined text-6xl text-red-500 font-black">error</span>
      </div>
      <div>
        <h3 className="mb-3 text-3xl font-black uppercase tracking-tight text-[#283f3b]">Oops!</h3>
        <p className="font-bold text-slate-600 text-lg">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl border-4 border-[#283f3b] bg-[#ffbf00] px-8 py-4 text-lg font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none hover:brightness-95"
        >
          Thử lại
        </button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background font-display">
        {content}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center min-h-[300px] font-display">
      {content}
    </div>
  );
}
