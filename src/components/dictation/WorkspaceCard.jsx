export default function WorkspaceCard() {
  return (
    <section className="col-span-5 flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow flex-1">
        <div className="flex items-center justify-between border-b-2 border-border-thick bg-background-light p-4">
          <span className="text-sm font-black uppercase tracking-widest">Workspace</span>
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full border border-border-thick bg-dict-green" />
            <span className="h-3 w-3 rounded-full border border-border-thick bg-primary" />
            <span className="h-3 w-3 rounded-full border border-border-thick bg-dict-red" />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8">
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xl font-bold leading-relaxed">
            <span className="underline decoration-4 underline-offset-4 text-dict-green">Yesterday</span>
            <span className="underline decoration-4 underline-offset-4 text-dict-green">I</span>
            <span className="underline decoration-4 underline-offset-4 text-dict-green">decided</span>
            <span className="underline decoration-4 underline-offset-4 text-dict-green">to</span>
            <span className="bg-dict-red/10 px-1 underline-offset-4 decoration-4 text-dict-red">
              go
            </span>
            <span className="border-b-0 opacity-30">visit</span>
            <span className="opacity-30">the</span>
            <span className="opacity-30">museum</span>
          </div>

          <textarea
            className="h-full w-full flex-1 rounded-xl border-none p-6 text-lg font-bold chunky-border focus:outline-none focus:ring-4 focus:ring-primary placeholder:opacity-30"
            placeholder="Type what you hear..."
          />
        </div>

        <div className="flex items-center justify-between border-t-2 border-border-thick bg-background-light p-6">
          <button className="font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg bg-white px-6 py-2">
            Hint (3 left)
          </button>
          <button className="font-black uppercase text-sm chunky-shadow-active chunky-shadow chunky-border rounded-lg bg-dict-green text-white px-8 py-2">
            Submit Segment
          </button>
        </div>
      </div>
    </section>
  )
}

