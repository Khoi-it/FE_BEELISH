import { useEffect, useState } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'

const WORDS = [
  { word: 'Accommodate', type: 'v.', def: 'Cung cấp chỗ ở', ex: 'The hotel can accommodate up to 500 guests.', learned: true },
  { word: 'Beneficial', type: 'adj.', def: 'Có lợi ích', ex: 'A good diet is beneficial to health.', learned: true },
  { word: 'Communicate', type: 'v.', def: 'Giao tiếp', ex: 'We communicate via email.', learned: false },
  { word: 'Determination', type: 'n.', def: 'Sự quyết tâm', ex: 'It takes a lot of determination to succeed.', learned: false },
  { word: 'Elaborate', type: 'adj.', def: 'Tỉ mỉ, phức tạp', ex: 'They made an elaborate preparation for the party.', learned: false },
]

// ─── Flashcard View ────────────────────────────────────────────────────────────
function FlashcardView({ deckTitle, onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<('known' | 'unknown')[]>([])

  const card = WORDS[index]
  const total = WORDS.length
  const done = results.length

  function handleAnswer(known: boolean) {
    setResults((prev) => [...prev, known ? 'known' : 'unknown'])
    setFlipped(false)
    setTimeout(() => setIndex((i) => i + 1), 300)
  }

  if (done === total) {
    const knownCount = results.filter((r) => r === 'known').length
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-12 text-center">
        <div className="rounded-full border-4 border-secondary bg-primary p-6 shadow-[6px_6px_0px_0px_#283f3b]">
          <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            emoji_events
          </span>
        </div>
        <div>
          <h2 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Hoàn thành!</h2>
          <p className="mt-3 text-xl font-bold opacity-70">
            Bạn đã thuộc <span className="font-black text-tertiary">{knownCount}/{total}</span> từ
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setIndex(0); setFlipped(false); setResults([]) }}
            className="rounded-xl border-4 border-secondary bg-primary px-8 py-3 font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Học lại
          </button>
          <button
            onClick={onBack}
            className="rounded-xl border-4 border-secondary bg-surface px-8 py-3 font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-black uppercase text-secondary transition-all hover:-translate-x-1"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        {deckTitle}
      </button>

      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-black uppercase text-sm opacity-60">{index + 1} / {total}</span>
          <div className="h-3 w-2/3 overflow-hidden rounded-full border-2 border-secondary bg-surface">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((index) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Card flip */}
        <div
          className="group relative mx-auto mb-8 h-72 cursor-pointer select-none"
          style={{ perspective: '1200px' }}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-4 border-secondary bg-surface p-10 shadow-[8px_8px_0px_0px_#283f3b]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className="mb-3 rounded-full border-2 border-secondary px-3 py-0.5 text-xs font-black uppercase">{card.type}</span>
              <h2 className="font-headline text-6xl font-black uppercase italic tracking-tighter">{card.word}</h2>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest opacity-40">Nhấn để xem nghĩa</p>
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border-4 border-secondary bg-primary p-10 shadow-[8px_8px_0px_0px_#283f3b]"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-3xl font-black">{card.def}</p>
              <p className="mt-2 text-center text-base italic opacity-80">"{card.ex}"</p>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {flipped && (
          <div className="flex gap-6">
            <button
              onClick={() => handleAnswer(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-secondary bg-error px-6 py-4 font-black uppercase text-surface shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined">close</span>
              Chưa biết
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-secondary bg-[#679436] px-6 py-4 font-black uppercase text-surface shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined">check</span>
              Đã biết
            </button>
          </div>
        )}
        {!flipped && (
          <p className="text-center text-sm font-black uppercase tracking-widest opacity-40">
            Nhấn vào thẻ để lật
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Cloze View ────────────────────────────────────────────────────────────────
function ClozeView({ deckTitle, onBack }) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const card = WORDS[index]
  const total = WORDS.length
  const done = index >= total

  // Replace the target word in the example with blanks
  const clozeRegex = new RegExp(card?.word, 'i')
  const clozeSentence = card ? card.ex.replace(clozeRegex, '_____') : ''
  const isCorrect = submitted && input.trim().toLowerCase() === card?.word.toLowerCase()

  function handleSubmit() {
    if (!input.trim()) return
    setSubmitted(true)
    if (input.trim().toLowerCase() === card.word.toLowerCase()) setScore((s) => s + 1)
  }

  function handleNext() {
    setInput('')
    setSubmitted(false)
    setIndex((i) => i + 1)
  }

  if (done) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-12 text-center">
        <div className="rounded-full border-4 border-secondary bg-[#679436] p-6 shadow-[6px_6px_0px_0px_#283f3b]">
          <span className="material-symbols-outlined text-6xl text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>
            edit_note
          </span>
        </div>
        <div>
          <h2 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Hoàn thành!</h2>
          <p className="mt-3 text-xl font-bold opacity-70">
            Điền đúng <span className="font-black text-[#679436]">{score}/{total}</span> từ
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setIndex(0); setInput(''); setSubmitted(false); setScore(0) }}
            className="rounded-xl border-4 border-secondary bg-[#679436] px-8 py-3 font-black uppercase text-surface shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Làm lại
          </button>
          <button
            onClick={onBack}
            className="rounded-xl border-4 border-secondary bg-surface px-8 py-3 font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-black uppercase text-secondary transition-all hover:-translate-x-1"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        {deckTitle}
      </button>

      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-black uppercase text-sm opacity-60">{index + 1} / {total}</span>
          <div className="h-3 w-2/3 overflow-hidden rounded-full border-2 border-secondary bg-surface">
            <div
              className="h-full bg-[#679436] transition-all duration-300"
              style={{ width: `${(index / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border-4 border-secondary bg-surface p-10 shadow-[8px_8px_0px_0px_#283f3b]">
          {/* Hint */}
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border-2 border-secondary px-3 py-0.5 text-xs font-black uppercase">{card.type}</span>
            <span className="text-sm font-bold italic opacity-60">Gợi ý: {card.def}</span>
          </div>

          {/* Cloze sentence */}
          <p className="mb-8 text-2xl font-bold leading-relaxed">{clozeSentence}</p>

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              disabled={submitted}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
              placeholder="Điền từ còn thiếu..."
              className={`flex-1 rounded-xl border-4 px-4 py-3 font-bold outline-none transition-colors ${
                submitted
                  ? isCorrect
                    ? 'border-[#679436] bg-[#679436]/10 text-[#679436]'
                    : 'border-error bg-error/10 text-error'
                  : 'border-secondary bg-white focus:border-primary'
              }`}
            />
            {!submitted && (
              <button
                onClick={handleSubmit}
                className="rounded-xl border-4 border-secondary bg-secondary px-6 py-3 font-black uppercase text-surface shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Kiểm tra
              </button>
            )}
          </div>

          {/* Result feedback */}
          {submitted && (
            <div className={`mt-6 rounded-xl border-4 p-4 ${isCorrect ? 'border-[#679436] bg-[#679436]/10' : 'border-error bg-error/10'}`}>
              <div className="flex items-center gap-2 font-black uppercase">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isCorrect ? 'check_circle' : 'cancel'}
                </span>
                {isCorrect ? 'Chính xác!' : `Đáp án đúng: ${card.word}`}
              </div>
              <button
                onClick={handleNext}
                className="mt-4 rounded-xl border-4 border-secondary bg-secondary px-6 py-2 font-black uppercase text-surface shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {index + 1 < total ? 'Tiếp theo →' : 'Xem kết quả'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Deck Card ─────────────────────────────────────────────────────────────────
function DeckCard({ icon, title, wordCount, progress, barClass, iconWrapClass, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(title)
        }
      }}
      className="group cursor-pointer rounded-xl border-4 border-secondary bg-surface-variant p-6 transition-all brutalist-shadow-lg brutalist-shadow-hover"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center border-4 border-secondary brutalist-shadow ${iconWrapClass}`}
      >
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="mb-2 text-2xl font-black uppercase leading-tight">{title}</h3>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-black uppercase tracking-widest text-surface">
          {wordCount} Words
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-black uppercase">
          <span>Tiến độ</span>
          <span>{progress}%</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full border-2 border-secondary bg-surface">
          <div
            className={`h-full border-r-2 border-secondary ${barClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function VocabularyPage() {
  const [selectedDeckTitle, setSelectedDeckTitle] = useState<string | null>(null)
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false)
  const [studyMode, setStudyMode] = useState<'flashcard' | 'cloze' | null>(null)

  const closeModal = () => setIsStudyModalOpen(false)

  function startStudy(mode: 'flashcard' | 'cloze') {
    setStudyMode(mode)
    setIsStudyModalOpen(false)
  }

  function exitStudy() {
    setStudyMode(null)
  }

  useEffect(() => {
    if (!isStudyModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isStudyModalOpen])

  return (
    <div className="min-h-screen bg-background font-body text-on-background">
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <AppHeader />

        {/* ── Study mode views ── */}
        {studyMode === 'flashcard' && selectedDeckTitle && (
          <FlashcardView deckTitle={selectedDeckTitle} onBack={exitStudy} />
        )}

        {studyMode === 'cloze' && selectedDeckTitle && (
          <ClozeView deckTitle={selectedDeckTitle} onBack={exitStudy} />
        )}

        {/* ── Normal views (deck list + word list) ── */}
        {!studyMode && (
          <>
            {!selectedDeckTitle ? (
              <div className="space-y-12 py-2 md:py-4">
                <section>
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <h2 className="font-headline text-4xl font-black uppercase italic tracking-tighter underline">
                      Bộ từ cá nhân
                    </h2>
                    <button
                      type="button"
                      className="flex items-center gap-2 border-4 border-secondary bg-tertiary px-4 py-2 font-black uppercase text-on-tertiary brutalist-shadow brutalist-shadow-hover"
                    >
                      <span className="material-symbols-outlined">add_circle</span>
                      Tạo mới
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <DeckCard icon="folder" title="Daily Conversation" wordCount={120} progress={65} iconWrapClass="bg-primary" barClass="bg-primary" onSelect={setSelectedDeckTitle} />
                    <DeckCard icon="inventory_2" title="Business English" wordCount={45} progress={12} iconWrapClass="bg-tertiary" barClass="bg-tertiary" onSelect={setSelectedDeckTitle} />
                  </div>
                </section>

                <section>
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Bộ từ hệ thống</h2>
                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <DeckCard icon="auto_stories" title="IELTS Level 1" wordCount={500} progress={0} iconWrapClass="bg-secondary-container" barClass="bg-secondary-container" onSelect={setSelectedDeckTitle} />
                    <DeckCard icon="school" title="TOEIC 650+" wordCount={850} progress={45} iconWrapClass="bg-primary" barClass="bg-primary" onSelect={setSelectedDeckTitle} />
                    <DeckCard icon="travel_explore" title="Travel Phrases" wordCount={200} progress={90} iconWrapClass="bg-tertiary-container" barClass="bg-tertiary-container" onSelect={setSelectedDeckTitle} />
                  </div>
                </section>
              </div>
            ) : (
              <div className="py-2 md:py-4">
                <button
                  onClick={() => setSelectedDeckTitle(null)}
                  className="mb-8 flex items-center gap-2 font-black uppercase text-secondary transition-all hover:-translate-x-1"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Quay lại danh sách
                </button>
                <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">{selectedDeckTitle}</h1>
                    <p className="mt-2 font-bold uppercase tracking-widest opacity-60">120 Words</p>
                  </div>
                  <button
                    onClick={() => setIsStudyModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl border-4 border-secondary bg-primary px-8 py-4 text-xl font-black uppercase text-secondary shadow-[6px_6px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    Học từ vựng
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border-4 border-secondary shadow-[6px_6px_0px_0px_#283f3b]">
                  <table className="w-full border-collapse bg-surface">
                    <thead>
                      <tr className="border-b-4 border-secondary bg-secondary text-surface">
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Từ vựng</th>
                        <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-widest">Loại từ</th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Nghĩa</th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Ví dụ</th>
                        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest">Đã thuộc</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WORDS.map((w, index) => (
                        <tr
                          key={index}
                          className={`border-b-2 border-dashed border-secondary/30 transition-colors last:border-b-0 ${w.learned ? 'bg-primary/10' : 'hover:bg-surface-variant/50'}`}
                        >
                          <td className="px-6 py-4">
                            <span className="text-lg font-black uppercase">{w.word}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="rounded-full border-2 border-secondary px-3 py-0.5 text-xs font-black uppercase">{w.type}</span>
                          </td>
                          <td className="px-6 py-4 font-bold">{w.def}</td>
                          <td className="px-6 py-4 text-sm italic opacity-70">"{w.ex}"</td>
                          <td className="px-6 py-4 text-center">
                            {w.learned ? (
                              <span className="material-symbols-outlined text-2xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                check_circle
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-2xl opacity-30">radio_button_unchecked</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Study Mode Modal ── */}
      {isStudyModalOpen ? (
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
      ) : null}
    </div>
  )
}
