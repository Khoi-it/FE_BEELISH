import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppHeader from '../components/layout/AppHeader.jsx'
import { MOCK_WORDS } from '../constants/mockWords'
import FlashcardView from '../components/vocabulary/FlashcardView'
import ClozeView from '../components/vocabulary/ClozeView'
import DeckCard from '../components/vocabulary/DeckCard'
import StudyModeModal from '../components/vocabulary/StudyModeModal'
import { getUserVocabSets, getSystemVocabSets, getWordsByDeckId } from '../api/vocabularyApi'

const MOCK_USER_DECKS = [
  { id: 'u1', icon: "folder", title: "Daily Conversation", wordCount: 120, progress: 65 },
  { id: 'u2', icon: "inventory_2", title: "Business English", wordCount: 45, progress: 12 },
];

const MOCK_SYSTEM_DECKS = [
  { id: 's1', icon: "auto_stories", title: "IELTS Level 1", wordCount: 500, progress: 0 },
  { id: 's2', icon: "school", title: "TOEIC 650+", wordCount: 850, progress: 0 },
  { id: 's3', icon: "travel_explore", title: "Travel Phrases", wordCount: 200, progress: 0 }
];

export default function VocabularyPage() {
  const { user } = useAuth()
  const [userDecks, setUserDecks] = useState<any[]>([])
  const [systemDecks, setSystemDecks] = useState<any[]>(MOCK_SYSTEM_DECKS)
  const [selectedDeck, setSelectedDeck] = useState<any | null>(null)
  const [words, setWords] = useState<any[]>(MOCK_WORDS)
  const [isLoadingWords, setIsLoadingWords] = useState(false)

  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false)
  const [studyMode, setStudyMode] = useState<'flashcard' | 'cloze' | null>(null)

  const closeModal = () => setIsStudyModalOpen(false)

  function startStudy(mode: 'flashcard' | 'cloze') {
    if (!words || words.length === 0) return;
    setStudyMode(mode)
    setIsStudyModalOpen(false)
  }

  function exitStudy() {
    setStudyMode(null)
  }

  useEffect(() => {
    const fetchDecks = async () => {
      if (user) {
        try {
          const uDecks = await getUserVocabSets();
          // Kiểm tra xem dữ liệu trả về có bị lỗi format (ví dụ trả về object chứa mảng thay vì mảng trực tiếp)
          const actualDecks = Array.isArray(uDecks) ? uDecks : (uDecks.data || []);
          if (actualDecks && actualDecks.length > 0) {
            setUserDecks(actualDecks);
          } else {
            setUserDecks([]);
          }
        } catch (err) {
          console.warn('Lỗi lấy User Decks:', err);
          setUserDecks([]);
        }
      }

      try {
        const sDecks = await getSystemVocabSets();
        if (sDecks && sDecks.length) setSystemDecks(sDecks);
      } catch (err) {
        console.warn('Dùng mock data (System Decks):', err);
      }
    };
    fetchDecks();
  }, [])

  useEffect(() => {
    if (!selectedDeck) return;
    const fetchWords = async () => {
      setIsLoadingWords(true);
      try {
        const data = await getWordsByDeckId(selectedDeck.id || 1);
        if (data && Array.isArray(data)) {
          setWords(data);
        } else {
          setWords([]);
        }
      } catch (err) {
        console.warn('Dùng mock data (Words):', err);
        setWords(MOCK_WORDS);
      } finally {
        setIsLoadingWords(false);
      }
    };
    fetchWords();
  }, [selectedDeck])

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
        {studyMode === 'flashcard' && selectedDeck && words.length > 0 && (
          <FlashcardView deckTitle={selectedDeck.title} words={words} onBack={exitStudy} />
        )}

        {studyMode === 'cloze' && selectedDeck && words.length > 0 && (
          <ClozeView deckTitle={selectedDeck.title} words={words} onBack={exitStudy} />
        )}

        {/* ── Normal views (deck list + word list) ── */}
        {!studyMode && (
          <>
            {!selectedDeck ? (
              <div className="space-y-12 py-2 md:py-4">
                {user && (
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
                    {userDecks.length > 0 ? (
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {userDecks.map((deck, i) => (
                          <DeckCard key={i} {...deck} onSelect={() => setSelectedDeck(deck)} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center border-4 border-dashed border-secondary/30 rounded-xl bg-surface">
                        <p className="font-bold text-lg text-secondary/70">Bạn chưa có bộ từ cá nhân nào. Nhấn "Tạo mới" để bắt đầu nhé!</p>
                      </div>
                    )}
                  </section>
                )}

                <section>
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Bộ từ hệ thống</h2>
                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {systemDecks.map((deck, i) => (
                      <DeckCard key={i} {...deck} onSelect={() => setSelectedDeck(deck)} />
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="py-2 md:py-4">
                <button
                  onClick={() => setSelectedDeck(null)}
                  className="mb-8 flex items-center gap-2 font-black uppercase text-secondary transition-all hover:-translate-x-1"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Quay lại danh sách
                </button>
                <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">{selectedDeck.title}</h1>
                    <p className="mt-2 font-bold uppercase tracking-widest opacity-60">{selectedDeck.wordCount || words.length} Words</p>
                  </div>
                  <button
                    onClick={() => setIsStudyModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl border-4 border-secondary bg-primary px-8 py-4 text-xl font-black uppercase text-secondary shadow-[6px_6px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    Học từ vựng
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border-4 border-secondary shadow-[6px_6px_0px_0px_#283f3b] min-h-[300px]">
                  {isLoadingWords ? (
                    <div className="flex h-64 items-center justify-center font-bold uppercase opacity-50">Đang tải danh sách từ...</div>
                  ) : (
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
                        {words.map((w, index) => (
                          <tr
                            key={index}
                            className={`border-b-2 border-dashed border-secondary/30 transition-colors last:border-b-0 ${w.learned ? 'bg-primary/10' : 'hover:bg-surface-variant/50'}`}
                          >
                            <td className="px-6 py-4">
                              <span className="text-lg font-black uppercase">{w.word}</span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="rounded-full border-2 border-secondary px-3 py-0.5 text-xs font-black uppercase">{w.type || 'N/A'}</span>
                            </td>
                            <td className="px-6 py-4 font-bold">{w.def || w.mean}</td>
                            <td className="px-6 py-4 text-sm italic opacity-70">"{w.ex || w.example}"</td>
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
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Study Mode Modal ── */}
      {isStudyModalOpen && selectedDeck && (
        <StudyModeModal 
          selectedDeckTitle={selectedDeck.title} 
          closeModal={closeModal} 
          startStudy={startStudy} 
        />
      )}
    </div>
  )
}
