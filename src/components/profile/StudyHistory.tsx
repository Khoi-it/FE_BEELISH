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

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getStudyHistory();
                
                if (response?.statusCode === 200 && response?.data?.content) {
                    const contentList: ApiHistoryDailyItem[] = response.data.content;
                    
                    if (contentList.length === 0) {
                        setHistory([]);
                        return;
                    }

                    // 2. Map dữ liệu lịch sử theo từng ngày
                    const mappedHistory = contentList.map((item, index) => {
                        // Format lại ngày để hiển thị (từ chuỗi "2026-05-31" hoặc "updatedAt")
                        const dateObj = new Date(item.updatedAt || item.date);
                        const formattedDate = dateObj.toLocaleDateString('vi-VN', {
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric'
                        });

                        // Lấy giờ phút nếu muốn hiển thị chi tiết (VD: 16:53)
                        const formattedTime = dateObj.toLocaleTimeString('vi-VN', {
                            hour: '2-digit', 
                            minute: '2-digit'
                        });

                        return {
                            icon: "style", // Dùng icon bộ thẻ (flashcards) hoặc "text_fields"
                            iconBgClass: "bg-tertiary-container", 
                            title: `Luyện tập từ vựng`, // Tên chung cho bài học trong ngày
                            subtitle: `Học ${item.totalNumMemorizeNew} từ mới • ${formattedTime} ngày ${formattedDate}`, 
                            xp: `+${item.totalXpNew}XP`,
                            hasDashed: index < contentList.length - 1 
                        };
                    });

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
                    history.map((item, idx) => (
                        <HistoryRow key={idx} {...item} />
                    ))
                )}
            </div>

            {history.length > 0 && (
                <button className="m-4 rounded-lg border-2 border-[#283f3b] px-2 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-zinc-50">
                    Xem tất cả
                </button>
            )}
        </div>
    );
}