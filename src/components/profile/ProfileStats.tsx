import { useState, useEffect } from 'react';
import { getProfileStats } from '../../api/profileApi';

interface StatCardProps {
    label: string;
    value: string | number;
    accentClassName?: string;
    subValue?: string;
    subValueClassName?: string;
}

const MOCK_STATS: StatCardProps[] = [
    { label: "Số từ đã học", value: "1,240", subValue: "+12 hôm nay", subValueClassName: "text-tertiary" },
    { label: "Ngày học liên tiếp", value: "15", accentClassName: "text-[#FF9F1C]", subValue: "Kỷ lục: 32 ngày" },
    { label: "Tổng XP", value: "24,500", subValue: "Level 24", subValueClassName: "text-[#ffbf00]" },
    { label: "Thứ hạng", value: "#4", subValue: "Gold League" }
];

function StatCard({ label, value, accentClassName, subValue, subValueClassName }: StatCardProps) {
    return (
        <div className="flex flex-col justify-between rounded-[1.5rem] border-4 border-[#283f3b] bg-white p-6 shadow-[4px_4px_0px_0px_#283f3b]">
            <span className="font-black uppercase tracking-widest text-xs opacity-60">{label}</span>
            <div className={`mt-4 text-4xl font-black ${accentClassName || ''}`}>{value}</div>
            {subValue ? (
                <div className={`mt-2 text-xs font-bold opacity-60 ${subValueClassName || ''}`}>{subValue}</div>
            ) : null}
        </div>
    )
}

export default function ProfileStats() {
    const [stats, setStats] = useState<StatCardProps[]>(MOCK_STATS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getProfileStats();
                // Giả định API trả về đúng format mảng StatCardProps, nếu không cần map lại dữ liệu
                if (data && data.length > 0) {
                    setStats(data);
                }
            } catch (error) {
                console.warn("Dùng mock data do API ProfileStats chưa sẵn sàng:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchStats();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center font-bold text-xl opacity-50">Đang tải thống kê...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
            ))}
        </div>
    );
}
