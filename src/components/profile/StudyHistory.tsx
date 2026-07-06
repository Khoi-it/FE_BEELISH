import { useState, useEffect } from 'react';
import { getStudyHistory } from '../../api/userApi';

interface HistoryRowProps {
    icon: string;
    iconBgClass?: string;
    title: string;
    subtitle: string;
    xp: string;
    hasDashed?: boolean;
}

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

            <div className="text-xs font-black text-[#FF9F1C]">{xp}</div>
        </div>
    )
}

// 1. Cập nhật interface theo đúng cấu trúc JSON mới trả về
interface VocabSet {
    vocabId: string;
    vocabName: string;
    numMemorizeNew: number;
    xpNew: number;
    updatedAt: string | null;
}

interface ApiHistoryDailyItem {
    id: string;
    date: string; // VD: "2026-05-31"
    totalNumMemorizeNew: number;
    totalXpNew: number;
    updatedAt: string; // VD: "2026-05-31T16:53:22.43"
    vocabSets: VocabSet[];
}

export default function StudyHistory() {
    const [history, setHistory] = useState<HistoryRowProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getStudyHistory();
                
                if (response && response.content) {
                    const contentList: ApiHistoryDailyItem[] = response.content;
                    
                    if (contentList.length === 0) {
                        setHistory([]);
                        return;
                    }

                    // 2. Map dữ liệu lịch sử theo từng hoạt động
                    const rawHistory: (HistoryRowProps & { timestamp: number })[] = [];
                    contentList.forEach((item) => {
                        const dateObj = new Date(item.updatedAt || item.date);
                        const formattedDate = dateObj.toLocaleDateString('vi-VN', {
                            day: '2-digit', month: '2-digit', year: 'numeric'
                        });

                        if (item.vocabSets && item.vocabSets.length > 0) {
                            item.vocabSets.forEach(v => {
                                const isVideo = v.vocabId.startsWith('VID_');
                                const timeObj = new Date(v.updatedAt || item.updatedAt || item.date);
                                const formattedTime = timeObj.toLocaleTimeString('vi-VN', {
                                    hour: '2-digit', minute: '2-digit'
                                });

                                rawHistory.push({
                                    icon: isVideo ? "play_circle" : "style",
                                    iconBgClass: isVideo ? "bg-secondary-container" : "bg-tertiary-container",
                                    title: isVideo ? `Xem video: ${v.vocabName}` : `Học từ vựng: ${v.vocabName}`,
                                    subtitle: isVideo ? `Hoàn thành bài tập • ${formattedTime} ngày ${formattedDate}` : `Học ${v.numMemorizeNew} từ mới • ${formattedTime} ngày ${formattedDate}`,
                                    xp: `+${v.xpNew}XP`,
                                    hasDashed: true,
                                    timestamp: timeObj.getTime()
                                });
                            });
                        } else {
                            // Backup in case there are no vocabSets details
                            const formattedTime = dateObj.toLocaleTimeString('vi-VN', {
                                hour: '2-digit', minute: '2-digit'
                            });
                            rawHistory.push({
                                icon: "style",
                                iconBgClass: "bg-tertiary-container", 
                                title: `Luyện tập`, 
                                subtitle: `Học ${item.totalNumMemorizeNew} từ mới • ${formattedTime} ngày ${formattedDate}`, 
                                xp: `+${item.totalXpNew}XP`,
                                hasDashed: true,
                                timestamp: dateObj.getTime()
                            });
                        }
                    });

                    // Sort descending by timestamp
                    rawHistory.sort((a, b) => b.timestamp - a.timestamp);

                    const mappedHistory = rawHistory.map((item, idx) => ({
                        ...item,
                        hasDashed: idx < rawHistory.length - 1
                    }));

                    setHistory(mappedHistory);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API Lịch sử học tập:", error);
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
                {!isLoading && history.length === 0 ? (
                    <div className="py-8 text-center text-sm font-bold opacity-50">
                        Chưa có lịch sử học tập nào.
                    </div>
                ) : (
                    history.slice(0, visibleCount).map((item, idx, arr) => (
                        <HistoryRow key={idx} {...item} hasDashed={idx < arr.length - 1} />
                    ))
                )}
            </div>

            {history.length > visibleCount && (
                <button 
                    onClick={() => setVisibleCount(prev => prev + 3)}
                    className="m-4 rounded-lg border-2 border-[#283f3b] px-2 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-zinc-50"
                >
                    Xem tất cả
                </button>
            )}
        </div>
    );
}