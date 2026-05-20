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
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {MOCK_STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
            ))}
        </div>
    );
}
