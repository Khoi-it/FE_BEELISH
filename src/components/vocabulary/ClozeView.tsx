import { useState } from 'react'

interface ClozeViewProps {
  deckTitle: string;
  words: any[];
  onBack: () => void;
}

export default function ClozeView({ deckTitle, words, onBack }: ClozeViewProps) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const card = words[index]
  const total = words.length
  const done = index >= total

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
