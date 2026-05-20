import { useState, useEffect } from 'react';
import { getStudyHistory } from '../../api/profileApi';

interface HistoryRowProps {
    icon: string;
    iconBgClass?: string;
    title: string;
    subtitle: string;
    xp: string;
    hasDashed?: boolean;
}

const MOCK_HISTORY: HistoryRowProps[] = [
    { icon: "mic", iconBgClass: "bg-primary-container", title: "Dictation: Lesson 04", subtitle: "Completed • 2h ago", xp: "+45XP", hasDashed: true },
    { icon: "style", iconBgClass: "bg-tertiary-container", title: "Flashcards: Daily Conv.", subtitle: "Reviewed • 5h ago", xp: "+20XP", hasDashed: true },
    { icon: "play_circle", iconBgClass: "bg-secondary-container", title: "Video: Business Phrasal Verbs", subtitle: "Watched • Yesterday", xp: "+100XP", hasDashed: true },
    { icon: "mic", iconBgClass: "bg-primary-container", title: "Dictation: Lesson 03", subtitle: "Completed • Yesterday", xp: "+50XP", hasDashed: false }
];

function HistoryRow({ icon, iconBgClass, title, subtitle, xp, hasDashed = true }: HistoryRowProps) {
    return (
        <div className={`flex items-center gap-4 p-3 ${hasDashed ? 'border-b-2 border-dashed border-[#283f3b]/20' : ''}`}>
            <div className={`rounded-lg border-2 border-[#283f3b] bg-primary-container p-2 shadow-[2px_2px_0px_0px_#283f3b] ${iconBgClass || ''}`}>
                <span className="material-symbols-outlined text-sm">{icon}</span>
            </div>

            <div className="flex-1">
                <div className="text-sm font-black">{title}</div>
                <div className="text-[10px] font-bold opacity-60">{subtitle}</div>
            </div>

            <div className="text-xs font-black">{xp}</div>
        </div>
    )
}

export default function StudyHistory() {
    const [history, setHistory] = useState<HistoryRowProps[]>(MOCK_HISTORY);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getStudyHistory();
                if (data && data.length > 0) {
                    setHistory(data);
                }
            } catch (error) {
                console.warn("Dùng mock data do API StudyHistory chưa sẵn sàng:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col rounded-[1.5rem] border-4 border-[#283f3b] bg-white shadow-[4px_4px_0px_0px_#283f3b]">
            <div className="border-b-4 border-[#283f3b] p-6 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-tight">Lịch sử học tập</h2>
                {isLoading && <span className="text-xs font-bold opacity-50">Đang tải...</span>}
            </div>

            <div className="space-y-4 overflow-y-auto p-4 max-h-[300px]">
                {history.map((item, idx) => (
                    <HistoryRow key={idx} {...item} />
                ))}
            </div>

            <button className="m-4 rounded-lg border-2 border-[#283f3b] px-2 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-zinc-50">
                Xem tất cả
            </button>
        </div>
    );
}
