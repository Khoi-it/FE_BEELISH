import { useState, useEffect } from "react";
import { getLastWeekStats } from "../../api/userApi";

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

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getLastWeekStats();
                
                if (response?.statusCode === 200 && response) {
                    const rawData: ApiStatItem[] = response;
                    
                    // Tìm giá trị lớn nhất trong tuần để làm mốc 100% chiều cao
                    const maxValue = Math.max(...rawData.map(d => d.numMemorizeNew));
                    
                    // Tránh lỗi chia cho 0 nếu tất cả các ngày đều là 0
                    const safeMax = maxValue > 0 ? maxValue : 1;

                    const mappedData = rawData.map((item, index) => {
                        // Lấy thứ trong tuần từ chuỗi ngày (vd: "Mon", "Tue")
                        const dateObj = new Date(item.date);
                        const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                        
                        // Tính toán phần trăm chiều cao (tối thiểu 5% để cột không bị biến mất khi giá trị = 0)
                        let heightPercent = (item.numMemorizeNew / safeMax) * 100;
                        if (heightPercent < 5) heightPercent = 5;

                        return {
                            dayLabel,
                            value: item.numMemorizeNew,
                            heightPercent,
                            isLast: index === rawData.length - 1 // Xác định cột cuối cùng (hôm nay)
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
    }, []);

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

            {isLoading ? (
                <div className="flex h-64 items-center justify-center p-8 text-sm font-bold opacity-50">
                    Đang tải biểu đồ...
                </div>
            ) : (
                <>
                    <div className="flex h-64 items-end justify-between gap-4 p-8">
                        {chartData.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`group relative flex-1 border-x-4 border-t-4 border-[#283f3b] transition-all duration-500 ease-in-out hover:-translate-y-1 ${
                                    item.isLast ? 'bg-tertiary' : 'bg-[#ffbf00]'
                                }`}
                                // Sử dụng inline style để set chiều cao động
                                style={{ height: `${item.heightPercent}%` }}
                            >
                                {/* Tooltip hiển thị khi hover */}
                                <div className="absolute left-1/2 -top-10 hidden w-max -translate-x-1/2 rounded bg-[#283f3b] px-2 py-1 text-[10px] text-white group-hover:block z-10">
                                    {item.value} từ
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[#283f3b]" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between px-8 pb-4 text-[10px] font-black uppercase opacity-40">
                        {chartData.map((item, idx) => (
                            <span key={`label-${idx}`} className="w-full text-center">
                                {item.dayLabel}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}