interface StudyModeModalProps {
  selectedDeckTitle: string;
  closeModal: () => void;
  startStudy: (mode: 'flashcard' | 'cloze') => void;
}

export default function StudyModeModal({ selectedDeckTitle, closeModal, startStudy }: StudyModeModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-secondary/40 p-6 backdrop-blur-sm"
      role="presentation"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-8 border-secondary bg-surface p-12 brutalist-shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vocab-mode-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container opacity-50 blur-3xl" />
        <div className="relative z-10 space-y-10 text-center">
          <div className="space-y-2">
            <h2 id="vocab-mode-title" className="font-headline text-5xl font-black uppercase italic tracking-tighter">
              Chọn chế độ học
            </h2>
            <p className="font-bold uppercase tracking-widest text-secondary/70">
              Luyện tập bộ từ {selectedDeckTitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <button
              type="button"
              onClick={() => startStudy('flashcard')}
              className="group flex flex-col items-center gap-6 rounded-2xl border-4 border-secondary bg-primary p-8 shadow-[8px_8px_0px_0px_#283f3b] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none"
            >
              <div className="border-4 border-secondary bg-surface p-4 brutalist-shadow transition-transform group-hover:rotate-6">
                <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  layers
                </span>
              </div>
              <span className="text-2xl font-black uppercase tracking-tight">Học Flashcard</span>
            </button>
            <button
              type="button"
              onClick={() => startStudy('cloze')}
              className="group flex flex-col items-center gap-6 rounded-2xl border-4 border-secondary bg-[#679436] p-8 text-surface shadow-[8px_8px_0px_0px_#283f3b] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none"
            >
              <div className="border-4 border-secondary bg-surface p-4 text-secondary brutalist-shadow transition-transform group-hover:-rotate-6">
                <span className="material-symbols-outlined text-5xl">edit_note</span>
              </div>
              <span className="text-2xl font-black uppercase tracking-tight">Điền khuyết Cloze</span>
            </button>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="mt-4 font-black uppercase text-secondary underline transition-all hover:no-underline"
          >
            Quay lại
          </button>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center border-4 border-secondary bg-surface brutalist-shadow transition-colors hover:bg-error"
          aria-label="Đóng"
        >
          <span className="material-symbols-outlined font-black">close</span>
        </button>
      </div>
    </div>
  )
}
