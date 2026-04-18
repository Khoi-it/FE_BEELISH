export default function TranscriptCard() {
  return (
    <section className="col-span-3 flex flex-col h-full max-h-[800px]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow">
        <div className="border-border-thick bg-primary p-4 text-center font-black uppercase tracking-widest border-b-2">
          Transcript
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border">
            <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
              <span className="material-symbols-outlined text-sm font-black">add</span>
            </button>
            <div>
              <span className="mb-1 block text-[10px] font-black opacity-50">00:12</span>
              <p className="text-sm font-bold leading-tight">
                Yesterday I decided to visit the local history museum.
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border">
            <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
              <span className="material-symbols-outlined text-sm font-black">add</span>
            </button>
            <div>
              <span className="mb-1 block text-[10px] font-black opacity-50">00:18</span>
              <p className="text-sm font-bold leading-tight">
                It was surprisingly quiet for a Saturday afternoon.
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-start gap-3 rounded-xl border-border-thick bg-primary/10 p-3 transition-all chunky-border">
            <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
              <span className="material-symbols-outlined text-sm font-black">add</span>
            </button>
            <div>
              <span className="mb-1 block text-[10px] font-black opacity-50">00:24</span>
              <p className="italic text-sm font-bold leading-tight">
                I stood in front of the massive whale skeleton...
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border opacity-50 grayscale">
            <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
              <span className="material-symbols-outlined text-sm font-black">add</span>
            </button>
            <div>
              <span className="mb-1 block text-[10px] font-black opacity-50">00:30</span>
              <p className="text-sm font-bold leading-tight">
                And I felt so small compared to the ancient giant.
              </p>
            </div>
          </div>

          <div className="group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border opacity-50 grayscale">
            <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
              <span className="material-symbols-outlined text-sm font-black">add</span>
            </button>
            <div>
              <span className="mb-1 block text-[10px] font-black opacity-50">00:35</span>
              <p className="text-sm font-bold leading-tight">
                The tour guide started explaining the evolution of species.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

