import { useState, useEffect } from "react";
import { getLastWeekStats, getLastMonthStats } from "../../api/userApi";

// Định nghĩa dữ liệu trả về từ API
interface ApiStatItem {
    date: string;
    numMemorizeNew: number;
}

// Định nghĩa cấu trúc dữ liệu sau khi map dùng cho UI
interface ChartBarItem {
    dayLabel: string;
    value: number;
    heightPercent: number;
    isLast: boolean;
}

export default function ProgressChart() {
    const [chartData, setChartData] = useState<ChartBarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                let response;
                if (viewMode === 'week') {
                    response = await getLastWeekStats();
                } else {
                    // Fetch month stats, if API fails or doesn't exist, we fallback to empty
                    try {
                        response = await getLastMonthStats();
                    } catch (e) {
                        console.warn("Month stats not available yet", e);
                        response = [];
                    }
                }
                
                if (response) {
                    const rawData: ApiStatItem[] = response;
                    
                    const maxValue = Math.max(...rawData.map(d => d.numMemorizeNew), 0);
                    const safeMax = maxValue > 0 ? maxValue : 1;

                    const mappedData = rawData.map((item, index) => {
                        const dateObj = new Date(item.date);
                        let dayLabel = '';
                        if (viewMode === 'week') {
                            dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                        } else {
                            // For month view, just show date (e.g. "12/5") or day number
                            dayLabel = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
                        }
                        
                        let heightPercent = (item.numMemorizeNew / safeMax) * 100;
                        if (heightPercent < 5 && item.numMemorizeNew === 0) heightPercent = 5;
                        if (heightPercent < 5 && item.numMemorizeNew > 0) heightPercent = 10; // Slightly taller if > 0 but very small

                        return {
                            dayLabel,
                            value: item.numMemorizeNew,
                            heightPercent,
                            isLast: index === rawData.length - 1
                        };
                    });

                    setChartData(mappedData);
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [viewMode]);

    return (
        <div className="lg:col-span-2 rounded-[1.5rem] border-4 border-[#283f3b] bg-white shadow-[4px_4px_0px_0px_#283f3b]">
            <div className="flex items-center justify-between border-b-4 border-[#283f3b] p-6">
                <h2 className="text-xl font-black uppercase tracking-tight">Biểu đồ tiến độ</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setViewMode('week')}
                        className={`rounded border-2 border-[#283f3b] px-3 py-1 text-xs font-black uppercase transition-all ${viewMode === 'week' ? 'bg-primary-container' : 'opacity-40 hover:opacity-100'}`}>
                        W
                    </button>
                    <button 
                        onClick={() => setViewMode('month')}
                        className={`rounded border-2 border-[#283f3b] px-3 py-1 text-xs font-black uppercase transition-all ${viewMode === 'month' ? 'bg-primary-container' : 'opacity-40 hover:opacity-100'}`}>
                        M
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center p-8 text-sm font-bold opacity-50">
                    Đang tải biểu đồ...
                </div>
            ) : (
                <>
                    <div className={`flex h-64 items-end justify-between p-8 ${viewMode === 'month' ? 'gap-1' : 'gap-4'}`}>
                        {chartData.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`group relative flex-1 border-t-4 border-[#283f3b] transition-all duration-500 ease-in-out hover:-translate-y-1 ${
                                    viewMode === 'week' ? 'border-x-4' : 'border-x-[1px]'
                                } ${
                                    item.isLast ? 'bg-tertiary' : 'bg-[#ffbf00]'
                                }`}
                                style={{ height: `${item.heightPercent}%` }}
                            >
                                <div className="absolute left-1/2 -top-10 hidden w-max -translate-x-1/2 rounded bg-[#283f3b] px-2 py-1 text-[10px] text-white group-hover:block z-10">
                                    {item.value} từ ({item.dayLabel})
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[#283f3b]" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between px-8 pb-4 text-[10px] font-black uppercase opacity-40">
                        {viewMode === 'week' ? (
                            chartData.map((item, idx) => (
                                <span key={`label-${idx}`} className="w-full text-center">
                                    {item.dayLabel}
                                </span>
                            ))
                        ) : (
                            <div className="w-full flex justify-between">
                                <span>{chartData[0]?.dayLabel}</span>
                                <span>{chartData[Math.floor(chartData.length / 2)]?.dayLabel}</span>
                                <span>{chartData[chartData.length - 1]?.dayLabel}</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}