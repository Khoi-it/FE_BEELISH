import { useAuth } from "../../contexts/AuthContext";

export default function ProfileHeader({ onEditClick }: { onEditClick: () => void }) {
    const { user, logout } = useAuth();
    const displayName = user?.fulltName || user?.name || 'Học viên Beelish';

    return (
        <section className="relative flex flex-col gap-8 overflow-hidden rounded-[2rem] border-4 border-[#283f3b] bg-white p-8 shadow-[8px_8px_0px_0px_#283f3b] md:flex-row md:items-center">
            <div className="absolute right-0 top-0 h-64 w-64 -rotate-12 translate-x-20 -translate-y-20 rounded-full border-4 border-[#283f3b] border-dashed bg-primary-container/10" />

            <div className="relative">
                <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b]">
                    <img
                        alt={displayName}
                        className="h-full w-full object-cover"
                        src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBC2iyhNzwKbtQW0LNx7-rHsVPKPmFcj1tNWZntgSIeshoSJ3j8tL7857mMnQp8bn3KoZtZr_Fw8fxnpf3QBZg9q6xNgsVvwRvSiAl81jj1Lef9sEQU5qEttcnrsZUOiMgEMtwreYCAM0cq0J_S4Wgd-kV1XYSJd-08xDtlEAda9oXEJkaILVnRcNzuATzfuy-Nt96n27rXFmPEGh-I7R67xCjF_VUnkaw-KPTzTvWIanI2A8pQ5Fn7EVJFlK698-3U9j6VzXHV4"}
                    />
                </div>

                <div className="absolute -bottom-2 -right-2 rounded-full border-2 border-[#283f3b] bg-tertiary-container p-2 shadow-[2px_2px_0px_0px_#283f3b]">
                    <span className="material-symbols-outlined text-sm text-white" style={{ fontVariationSettings: '"FILL" 1' }}>
                        verified
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <h1 className="text-4xl font-black uppercase tracking-tight">{displayName}</h1>
                    <span className="rounded-full border-2 border-[#283f3b] bg-secondary-container px-4 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_#283f3b]">
                        PRO MEMBER
                    </span>
                </div>

                <p className="pt-1 text-xl font-bold italic underline decoration-[#ffbf00] decoration-4">
                    {user?.level || 'CHƯA XÁC ĐỊNH'}
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start">
                    <div className="flex items-center gap-2 rounded-xl border-2 border-[#283f3b] bg-[#fcfbf8] px-4 py-2 shadow-[2px_2px_0px_0px_#283f3b]">
                        <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: '"FILL" 1' }}>
                            local_fire_department
                        </span>
                        <span className="font-black text-sm uppercase">15 Days Streak</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border-2 border-[#283f3b] bg-[#fcfbf8] px-4 py-2 shadow-[2px_2px_0px_0px_#283f3b]">
                        <span className="material-symbols-outlined text-[#ffbf00]" style={{ fontVariationSettings: '"FILL" 1' }}>
                            stars
                        </span>
                        <span className="font-black text-sm uppercase">Gold League</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:ml-2">
                <button
                    onClick={onEditClick}
                    className="rounded-xl border-4 border-[#283f3b] bg-[#ffbf00] px-8 py-3 text-center font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                >
                    Sửa Hồ Sơ
                </button>
                <button
                    onClick={logout}
                    className="rounded-xl border-4 border-[#283f3b] bg-white px-8 py-3 text-center font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                >
                    ĐĂNG XUẤT
                </button>
            </div>
        </section>
    );
}
