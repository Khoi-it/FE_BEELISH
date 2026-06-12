import { useState } from 'react'

interface FlashcardViewProps {
  deckTitle: string;
  words: any[];
  onBack: () => void;
  onUpdateWord?: (index: number, learned: boolean) => void;
  onComplete?: (newWords: number, xpGained: number) => void;
}

export default function FlashcardView(props: FlashcardViewProps) {
  const { deckTitle, words, onBack } = props;
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<('known' | 'unknown')[]>([])
  const [completed, setCompleted] = useState(false)

  const card = words[index]
  const total = words.length
  const done = results.length

  function handleAnswer(known: boolean) {
    setResults((prev) => [...prev, known ? 'known' : 'unknown'])
    if (props.onUpdateWord) {
      props.onUpdateWord(index, known)
    }
    setFlipped(false)
    setTimeout(() => setIndex((i) => i + 1), 300)
  }

  const finishSession = () => {
    if (!completed) {
      setCompleted(true)
      const knownCount = results.filter((r) => r === 'known').length
      const xpGained = knownCount * 10
      
      if (props.onComplete && knownCount > 0) {
        props.onComplete(knownCount, xpGained)
      }
    }
  }

  if (done === total && total > 0) {
    finishSession()
    
    const knownCount = results.filter((r) => r === 'known').length
    const xpGained = knownCount * 10

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
          <p className="mt-2 text-2xl font-black text-[#FF9F1C] drop-shadow-md">
            +{xpGained} XP
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setIndex(0); setFlipped(false); setResults([]); setCompleted(false); }}
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
          onClick={() => { finishSession(); props.onBack() }}
          className="mb-6 flex items-center gap-2 font-black uppercase text-secondary transition-all hover:-translate-x-1"
        >
        <span className="material-symbols-outlined">arrow_back</span>
        {deckTitle}
      </button>

      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-black w-2/20 uppercase text-sm opacity-60">{index + 1} / {total}</span>
          <div className="h-3 w-full overflow-hidden rounded-full border-2 border-secondary bg-surface">
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
              <p className="text-3xl font-black">{card.def || card.mean}</p>
              <p className="mt-2 text-center text-base italic opacity-80">"{card.ex || card.example}"</p>
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
