import { useEffect, useState } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import { MOCK_WORDS } from '../constants/mockWords'
import FlashcardView from '../components/vocabulary/FlashcardView'
import ClozeView from '../components/vocabulary/ClozeView'
import DeckCard from '../components/vocabulary/DeckCard'
import StudyModeModal from '../components/vocabulary/StudyModeModal'

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
    const onKey = (e: any) => {
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
                      {MOCK_WORDS.map((w, index) => (
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
      {isStudyModalOpen && selectedDeckTitle && (
        <StudyModeModal 
          selectedDeckTitle={selectedDeckTitle} 
          closeModal={closeModal} 
          startStudy={startStudy} 
        />
      )}
    </div>
  )
}
