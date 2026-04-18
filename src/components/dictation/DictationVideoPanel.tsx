import AchievementsCard from './AchievementsCard'

export default function DictationVideoPanel() {
  return (
    <section className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col overflow-hidden rounded-xl bg-white chunky-border chunky-shadow">
        <div className="aspect-video relative bg-black">
          <img
            alt="Video Placeholder"
            className="h-full w-full object-cover opacity-80"
            data-alt="A clean workspace with a laptop showing a coding interface"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQOpxbYvN4KN_ITqfkZhWZsbE3XA1G4kcOspO5ftNtKpe3PQ2PNDyHD1YYafjCTDG92miOSMuIfYU-xAYGe69gjrUgrkZKTc9ubkFrIBuvVK-jsfbf3tNGKqhJkC9-l8fOvU3PSzsZOvFEnkmi4sGKbZG6eK_qlpslu9bFEB2UQA-iB_U4HVvtBqySWEcnF8veKpIQ6r6T1WpOlei6CW-gG2Bp83y7NydpJC1xq1flvo_Bzm8B9HJxs4V9FhROkQXlG-gxqCQTQXA"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="chunky-shadow-active chunky-border chunky-shadow rounded-full bg-primary p-6">
              <span className="material-symbols-outlined text-4xl font-black">
                play_arrow
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white p-6">
          <div className="flex gap-4">
            <button className="group flex flex-col items-center justify-center gap-1 flex-1 rounded-xl bg-primary py-4 chunky-border chunky-shadow chunky-shadow-active">
              <span className="material-symbols-outlined text-3xl font-black">
                replay_5
              </span>
              <span className="text-xs font-black uppercase tracking-widest">Rewind</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 flex-1 rounded-xl bg-primary py-4 chunky-border chunky-shadow chunky-shadow-active">
              <span className="material-symbols-outlined text-3xl font-black">pause</span>
              <span className="text-xs font-black uppercase tracking-widest">Pause</span>
            </button>
          </div>

          <div className="flex items-center gap-4 px-2">
            <span className="text-sm font-bold">02:45</span>
            <div className="relative flex-1 overflow-hidden rounded-full border-border-thick chunky-border h-4 bg-background-light">
              <div className="absolute left-0 top-0 h-full w-1/3 border-r-2 border-border-thick bg-primary" />
            </div>
            <span className="text-sm font-bold">10:00</span>
          </div>
        </div>
      </div>

      <AchievementsCard />
    </section>
  )
}

