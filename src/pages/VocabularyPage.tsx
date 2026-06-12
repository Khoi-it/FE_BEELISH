import {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import AppHeader from '../components/layout/AppHeader.jsx'
import FlashcardView from '../components/vocabulary/FlashcardView'
import ClozeView from '../components/vocabulary/ClozeView'
import DeckCard from '../components/vocabulary/DeckCard'
import StudyModeModal from '../components/vocabulary/StudyModeModal'
import {getUserVocabSets, getSystemVocabSets, getWordsByDeckId, getCategories, recordStudySession} from '../api/vocabularyApi'

interface Category {
    id: number;
    name: string;
}

interface Deck {
    id?: string;
    vocabID?: string;
    icon: string;
    title: string;
    numOfWords?: number;
    learningProgress?: number;
    categoryID?: number;
    memoryWords?: string[];
    clozeWords?: string[];
}

interface Word {
    id?: string;
    word: string;
    type?: string;
    mean?: string;
    def?: string;
    example?: string;
    ex?: string;
    isMemorized?: boolean;
    isClozeCorrect?: boolean;
}

export default function VocabularyPage() {
    const {user} = useAuth()
    const [userDecks, setUserDecks] = useState<Deck[]>([])
    const [systemDecks, setSystemDecks] = useState<Deck[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
    const [words, setWords] = useState<Word[]>([])
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

    const handleStudyComplete = async (newWords: number, xpGained: number) => {
        if (!selectedDeck || !studyMode || words.length === 0) return;
        const targetVocabId = String(selectedDeck.vocabID || selectedDeck.id || 1);
        
        try {
            const currentMemoryWords = words.filter(w => w.isMemorized).map(w => w.id || w.word) as string[];
            const currentClozeWords = words.filter(w => w.isClozeCorrect).map(w => w.id || w.word) as string[];
            
            const calculatedProgress = Math.round(((currentMemoryWords.length + currentClozeWords.length) / (words.length * 2)) * 100);
            
            const result = await recordStudySession(targetVocabId, newWords, xpGained, calculatedProgress, currentMemoryWords, currentClozeWords);
            const newProgress = result.data?.learningProgress ?? Math.max(selectedDeck.learningProgress || 0, calculatedProgress);
            
            const updateDeck = (deck: Deck) => {
                if (String(deck.vocabID) === targetVocabId || String(deck.id) === targetVocabId) {
                    return { ...deck, learningProgress: newProgress, memoryWords: currentMemoryWords, clozeWords: currentClozeWords };
                }
                return deck;
            };

            setUserDecks(prev => prev.map(updateDeck));
            setSystemDecks(prev => prev.map(updateDeck));
            setSelectedDeck(prev => prev ? updateDeck(prev) : null);
        } catch (err) {
            console.error('Lỗi lưu phiên học:', err);
        }
    };

    useEffect(() => {
        const fetchDecks = async () => {
            let actualSystemDecks: Deck[] = [];
            
            try {
                const sDecks = await getSystemVocabSets();
                actualSystemDecks = Array.isArray(sDecks) ? sDecks : (sDecks.data || []);
                setSystemDecks(actualSystemDecks);
            } catch (err) {
                console.error('Lỗi lấy System Decks:', err);
            }

            try {
                const cats = await getCategories();
                const actualCategories = Array.isArray(cats) ? cats : (cats.data || []);
                setCategories(actualCategories);
            } catch (err) {
                console.error('Lỗi lấy Categories:', err);
            }

            if (user) {
                try {
                    const uDecks = await getUserVocabSets();
                    const actualUserDecks = Array.isArray(uDecks) ? uDecks : (uDecks.data || []);
                    
                    const systemDeckIds = new Set(actualSystemDecks.map(d => String(d.id)));
                    const filteredUserDecks = actualUserDecks.filter(u => !systemDeckIds.has(String(u.vocabID)));
                    setUserDecks(filteredUserDecks);

                    setSystemDecks(actualSystemDecks.map(sDeck => {
                        const userDeck = actualUserDecks.find(u => String(u.vocabID) === String(sDeck.id));
                        return userDeck ? { ...sDeck, learningProgress: userDeck.learningProgress, memoryWords: userDeck.memoryWords } : sDeck;
                    }));
                } catch (err) {
                    console.error('Lỗi lấy User Decks:', err);
                    setUserDecks([]);
                }
            }
        };
        fetchDecks();
    }, [user])

    useEffect(() => {
        if (!selectedDeck) return;
        const fetchWords = async () => {
            setIsLoadingWords(true);
            try {
                const targetVocabId = selectedDeck.vocabID || selectedDeck.id || 1;
                const data = await getWordsByDeckId(targetVocabId);
                if (data && Array.isArray(data)) {
                    const memoryWords = selectedDeck.memoryWords || [];
                    const clozeWords = selectedDeck.clozeWords || [];
                    const initializedWords = data.map(w => ({
                        ...w,
                        isMemorized: memoryWords.includes(w.id) || memoryWords.includes(w.word),
                        isClozeCorrect: clozeWords.includes(w.id) || clozeWords.includes(w.word)
                    }));
                    setWords(initializedWords);
                } else {
                    setWords([]);
                }
            } catch (err) {
                console.warn('Lỗi lấy từ vựng:', err);
                setWords([]);
            } finally {
                setIsLoadingWords(false);
            }
        };
        fetchWords();
    }, [selectedDeck])

    useEffect(() => {
        if (!isStudyModalOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isStudyModalOpen])

    return (
        <div className="min-h-screen bg-background font-body text-on-background">
            <div className="mx-auto max-w-[1440px] px-4 py-6">
                <AppHeader/>

                {/* ── Study mode views ── */}
                {studyMode === 'flashcard' && selectedDeck && words.length > 0 && (
                    <FlashcardView 
                        deckTitle={selectedDeck.title} 
                        words={words} 
                        onBack={exitStudy}
                        onUpdateWord={(index, value) => {
                            setWords(prev => {
                                const newWords = [...prev];
                                newWords[index] = { ...newWords[index], isMemorized: value };
                                return newWords;
                            });
                        }}
                        onComplete={(newWords, xpGained) => handleStudyComplete(newWords, xpGained)}
                    />
                )}

                {studyMode === 'cloze' && selectedDeck && words.length > 0 && (
                    <ClozeView 
                        deckTitle={selectedDeck.title} 
                        words={words} 
                        onBack={exitStudy}
                        onUpdateWord={(index, value) => {
                            setWords(prev => {
                                const newWords = [...prev];
                                newWords[index] = { ...newWords[index], isClozeCorrect: value };
                                return newWords;
                            });
                        }}
                        onComplete={(newWords, xpGained) => handleStudyComplete(newWords, xpGained)}
                    />
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
                                            <div
                                                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {userDecks.map((deck, i) => (
                                                    <DeckCard
                                                        key={i}
                                                        title={deck.title}
                                                        icon={deck.icon}
                                                        wordCount={deck.numOfWords || 0}
                                                        progress={deck.learningProgress|| 0}
                                                        onSelect={() => setSelectedDeck(deck)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div
                                                className="py-8 text-center border-4 border-dashed border-secondary/30 rounded-xl bg-surface">
                                                <p className="font-bold text-lg text-secondary/70">Bạn chưa có bộ từ cá
                                                    nhân nào. Nhấn "Tạo mới" để bắt đầu nhé!</p>
                                            </div>
                                        )}
                                    </section>
                                )}

                                <section className="space-y-10 pt-4">
                                    <div className="mb-6 flex flex-wrap items-center gap-4">
                                        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">
                                            Thư viện hệ thống
                                        </h2>
                                        <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                                            local_library
                                        </span>
                                    </div>

                                    {categories.map((category) => {
                                        const categoryDecks = systemDecks.filter(d => (d.categoryID || (d as any).categoryid) === category.id);
                                        return (
                                            <div key={category.id}>
                                                <h3 className="mb-6 pb-4 border-b-4 border-dashed border-secondary/20 text-2xl font-black italic uppercase text-secondary/80 flex items-center gap-2">
                                                    {category.name}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                    {categoryDecks.map((deck, i) => (
                                                        <DeckCard key={i} title={deck.title || ""} icon={deck.icon || "folder"} wordCount={deck.numOfWords || 0} progress={deck.learningProgress || 0} onSelect={() => setSelectedDeck(deck)}/>
                                                    ))}
                                                    {categoryDecks.length === 0 && (
                                                        <div className="col-span-full py-6 text-center border-4 border-dashed border-secondary/10 rounded-xl bg-surface/50">
                                                            <p className="font-bold text-sm text-secondary/50 uppercase tracking-wider">Chưa có bộ từ nào trong danh mục này</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                <div
                                    className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                    <div>
                                        <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">{selectedDeck.title}</h1>
                                        <p className="mt-2 font-bold uppercase tracking-widest opacity-60">{selectedDeck.numOfWords || words.length} Words</p>
                                    </div>
                                    <button
                                        onClick={() => setIsStudyModalOpen(true)}
                                        className="flex items-center gap-2 rounded-xl border-4 border-secondary bg-primary px-8 py-4 text-xl font-black uppercase text-secondary shadow-[6px_6px_0px_0px_#283f3b] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                                    >
                                        <span className="material-symbols-outlined text-3xl">school</span>
                                        Học từ vựng
                                    </button>
                                </div>

                                <div
                                    className="overflow-x-auto rounded-2xl border-4 border-secondary shadow-[6px_6px_0px_0px_#283f3b] min-h-[300px]">
                                    {isLoadingWords ? (
                                        <div
                                            className="flex h-64 items-center justify-center font-bold uppercase opacity-50">Đang
                                            tải danh sách từ...</div>
                                    ) : (
                                        <table className="w-full border-collapse bg-surface">
                                            <thead>
                                            <tr className="border-b-4 border-secondary bg-secondary text-surface">
                                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Từ
                                                    vựng
                                                </th>
                                                <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-widest">Loại
                                                    từ
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Nghĩa</th>
                                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest">Ví
                                                    dụ
                                                </th>
                                                <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest">Đã
                                                    thuộc
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {words.map((w, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b-2 border-dashed border-secondary/30 transition-colors last:border-b-0 ${w.isMemorized ? 'bg-primary/10' : 'hover:bg-surface-variant/50'}`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <span className="text-lg font-black uppercase">{w.word}</span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className="rounded-full border-2 border-secondary px-3 py-0.5 text-xs font-black uppercase">{w.type || 'N/A'}</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold">{w.def || w.mean}</td>
                                                    <td className="px-6 py-4 text-sm italic opacity-70">"{w.ex || w.example}"</td>
                                                    <td className="px-6 py-4 text-center">
                                                        {w.isMemorized ? (
                                                            <span
                                                                className="material-symbols-outlined text-2xl text-tertiary"
                                                                style={{fontVariationSettings: "'FILL' 1"}}>
                                  check_circle
                                </span>
                                                        ) : (
                                                            <span
                                                                className="material-symbols-outlined text-2xl opacity-30">radio_button_unchecked</span>
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
