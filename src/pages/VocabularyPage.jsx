import { useEffect, useState } from 'react'
import '../styles/LegacyGlobals.module.css'
import AppHeader from '../components/layout/AppHeader.jsx'

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

export default function VocabularyPage() {
  const [selectedDeckTitle, setSelectedDeckTitle] = useState(null)

  const closeModal = () => setSelectedDeckTitle(null)

  useEffect(() => {
    if (!selectedDeckTitle) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedDeckTitle])

  return (
    <div className="min-h-screen bg-background font-body text-on-background">
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <AppHeader />

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
              <DeckCard
                icon="folder"
                title="Daily Conversation"
                wordCount={120}
                progress={65}
                iconWrapClass="bg-primary"
                barClass="bg-primary"
                onSelect={setSelectedDeckTitle}
              />
              <DeckCard
                icon="inventory_2"
                title="Business English"
                wordCount={45}
                progress={12}
                iconWrapClass="bg-tertiary"
                barClass="bg-tertiary"
                onSelect={setSelectedDeckTitle}
              />
            </div>
          </section>

          <section>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Bộ từ hệ thống</h2>
              <span
                className="material-symbols-outlined text-4xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <DeckCard
                icon="auto_stories"
                title="IELTS Level 1"
                wordCount={500}
                progress={0}
                iconWrapClass="bg-secondary-container"
                barClass="bg-secondary-container"
                onSelect={setSelectedDeckTitle}
              />
              <DeckCard
                icon="school"
                title="TOEIC 650+"
                wordCount={850}
                progress={45}
                iconWrapClass="bg-primary"
                barClass="bg-primary"
                onSelect={setSelectedDeckTitle}
              />
              <DeckCard
                icon="travel_explore"
                title="Travel Phrases"
                wordCount={200}
                progress={90}
                iconWrapClass="bg-tertiary-container"
                barClass="bg-tertiary-container"
                onSelect={setSelectedDeckTitle}
              />
            </div>
          </section>
        </div>
      </div>

      {selectedDeckTitle ? (
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
                  className="group flex flex-col items-center gap-6 rounded-2xl border-4 border-secondary bg-primary p-8 shadow-[8px_8px_0px_0px_#283f3b] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none"
                >
                  <div className="border-4 border-secondary bg-surface p-4 brutalist-shadow transition-transform group-hover:rotate-6">
                    <span
                      className="material-symbols-outlined text-5xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      layers
                    </span>
                  </div>
                  <span className="text-2xl font-black uppercase tracking-tight">Học Flashcard</span>
                </button>
                <button
                  type="button"
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
