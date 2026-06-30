interface AuthMessageModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | '';
  message: string;
  onClose: () => void;
}

export default function AuthMessageModal({ isOpen, type, message, onClose }: AuthMessageModalProps) {
  if (!isOpen || !message) return null;

  const isError = type === 'error';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border-4 border-slate-900 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" style={{ backgroundColor: isError ? '#fee2e2' : '#dcfce7' }}>
            <span className="material-symbols-outlined text-4xl" style={{ color: isError ? '#ef4444' : '#22c55e' }}>
                {isError ? 'error' : 'check_circle'}
            </span>
        </div>

        <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase mt-2">
            {isError ? 'Lỗi!' : 'Thành công!'}
        </h3>
        <p className="text-slate-600 mb-8 font-bold text-lg">{message}</p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="inline-block w-full bg-primary hover:bg-primary/90 text-slate-900 font-black text-lg py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
