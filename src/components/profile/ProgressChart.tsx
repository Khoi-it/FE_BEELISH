export default function ProgressChart() {
    return (
        <div className="lg:col-span-2 rounded-[1.5rem] border-4 border-[#283f3b] bg-white shadow-[4px_4px_0px_0px_#283f3b]">
            <div className="flex items-center justify-between border-b-4 border-[#283f3b] p-6">
                <h2 className="text-xl font-black uppercase tracking-tight">Biểu đồ tiến độ</h2>
                <div className="flex gap-2">
                    <button className="rounded border-2 border-[#283f3b] bg-primary-container px-3 py-1 text-xs font-black uppercase">
                        W
                    </button>
                    <button className="rounded border-2 border-[#283f3b] px-3 py-1 text-xs font-black uppercase opacity-40">
                        M
                    </button>
                </div>
            </div>

            <div className="flex h-64 items-end justify-between gap-4 p-8">
                <div className="group relative flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[30%]">
                    <div className="absolute left-1/2 -top-10 hidden -translate-x-1 rounded bg-[#283f3b] px-2 py-1 text-[10px] text-white group-hover:block">
                        240XP
                    </div>
                </div>
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[45%]" />
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[20%]" />
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[80%]" />
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[60%]" />
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[95%]" />
                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-tertiary h-[75%]" />
            </div>

            <div className="flex justify-between px-8 pb-4 text-[10px] font-black uppercase opacity-40">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </div>
    );
}
