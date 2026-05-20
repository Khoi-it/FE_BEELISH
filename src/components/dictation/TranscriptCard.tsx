const MOCK_TRANSCRIPTS = [
  { time: "00:12", text: "Yesterday I decided to visit the local history museum.", state: "default" },
  { time: "00:18", text: "It was surprisingly quiet for a Saturday afternoon.", state: "default" },
  { time: "00:24", text: "I stood in front of the massive whale skeleton...", state: "active" },
  { time: "00:30", text: "And I felt so small compared to the ancient giant.", state: "disabled" },
  { time: "00:35", text: "The tour guide started explaining the evolution of species.", state: "disabled" }
];

export default function TranscriptCard() {
  return (
    <section className="col-span-3 flex flex-col h-full max-h-[800px]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow">
        <div className="border-border-thick bg-primary p-4 text-center font-black uppercase tracking-widest border-b-2">
          Transcript
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {MOCK_TRANSCRIPTS.map((item, idx) => {
            let containerClass = "group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border";
            let textClass = "text-sm font-bold leading-tight";
            
            if (item.state === "active") {
              containerClass = "group flex cursor-pointer items-start gap-3 rounded-xl border-border-thick bg-primary/10 p-3 transition-all chunky-border";
              textClass = "italic text-sm font-bold leading-tight";
            } else if (item.state === "disabled") {
              containerClass = "group flex cursor-pointer items-start gap-3 rounded-xl border-transparent p-3 transition-all hover:border-border-thick hover:bg-background-light chunky-border opacity-50 grayscale";
            }

            return (
              <div key={idx} className={containerClass}>
                <button className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center squircle chunky-border chunky-shadow-sm chunky-shadow-active bg-white">
                  <span className="material-symbols-outlined text-sm font-black">add</span>
                </button>
                <div>
                  <span className="mb-1 block text-[10px] font-black opacity-50">{item.time}</span>
                  <p className={textClass}>
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
