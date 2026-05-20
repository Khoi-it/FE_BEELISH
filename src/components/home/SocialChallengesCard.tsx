const MOCK_CHALLENGES = [
  {
    name: "Anna Smith",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8UdFS1VubRxYw0HGCw_R3IE0gNY0GTuZHt_6ohhkA4Qn4FPW3BYOE1AZhNUSoj1FxdEKXkPvkxtg_RF3zPXmwQj3C0T5Zh3AsxjoLrkWxmV7T8tYa5M3U7ICs8ao9HrGQ8ZJUBZhDwm7j3EXnKUis5gbGQGUYAwO6f_vC3HEOiQ8AwZyfIcPgio1aU0FD2Zy8Xxo0a82f---UEGYKHl3tLH3B1Z8-FZfCJj5pS9GIUkCbaIO4pGnyiyUZVOwnVCy7LHqbls4kars",
    status: "Vừa học xong Bài 15",
    actionText: "THÁCH ĐẤU",
    actionClass: "bg-primary"
  },
  {
    name: "John Doe",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHTFu1jELjRagGrnBTqixM7wO9pHXD3Ncc61hKLHULDyL2cV3qf0KXSlxWQ38_3aJaQF9GVWfScX_wfIsc1E4m0OI-cwg8o-9WPrLF0GQdwfcMD3nOJ7P7CMUDCcweCNMlFGn05HDT9o66rOfRij2XEwvxxB8KgFkiKOSW46YcQDr9HzV0D4huZTTiDk20Tua84x_Pr-E-Ri-64-lGfOsSHezAz1FcnQA18SP8FPNZakCdw3RpgbYzanuzcQh8uxtNemBEksbVyD0",
    status: "Chuỗi 25 ngày 🔥",
    actionText: "VẪY TAY",
    actionClass: "bg-white"
  }
];

export default function SocialChallengesCard() {
  return (
    <div className="col-span-12 chunky-card bg-[#283F3B] p-6 text-white lg:col-span-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tight">Thách thức bạn bè</h3>
        <span className="material-symbols-outlined">group</span>
      </div>

      <div className="space-y-4">
        {MOCK_CHALLENGES.map((challenge, idx) => (
          <div key={idx} className="flex items-center gap-3 rounded-xl border-2 border-white/20 bg-white/10 p-3">
            <img
              alt={`${challenge.name} avatar`}
              className="h-10 w-10 rounded-full border-2 border-primary object-cover"
              src={challenge.avatar}
            />
            <div className="flex-1">
              <p className="font-bold">{challenge.name}</p>
              <p className="text-xs opacity-60">{challenge.status}</p>
            </div>
            <button className={`rounded-lg border-2 border-black px-4 py-1 text-xs font-black text-black ${challenge.actionClass}`}>
              {challenge.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
