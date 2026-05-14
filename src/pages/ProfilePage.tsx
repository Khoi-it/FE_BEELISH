import {useState} from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import {useAuth} from "../contexts/AuthContext.tsx";

function StatCard({label, value, accentClassName, subValue, subValueClassName}) {
    return (
        <div
            className="flex flex-col justify-between rounded-[1.5rem] border-4 border-[#283f3b] bg-white p-6 shadow-[4px_4px_0px_0px_#283f3b]">
            <span className="font-black uppercase tracking-widest text-xs opacity-60">{label}</span>
            <div className={`mt-4 text-4xl font-black ${accentClassName || ''}`}>{value}</div>
            {subValue ? (
                <div className={`mt-2 text-xs font-bold opacity-60 ${subValueClassName || ''}`}>{subValue}</div>
            ) : null}
        </div>
    )
}

function HistoryRow({icon, iconBgClass, title, subtitle, xp, hasDashed = true}) {
    return (
        <div
            className={`flex items-center gap-4 p-3 ${hasDashed ? 'border-b-2 border-dashed border-[#283f3b]/20' : ''}`}
        >
            <div
                className={`rounded-lg border-2 border-[#283f3b] bg-primary-container p-2 shadow-[2px_2px_0px_0px_#283f3b] ${
                    iconBgClass || ''
                }`}
            >
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

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { user, logout } = useAuth();

    const displayName = user?.fullName || user?.name || 'Học viên Beelish';


    return (
        <div className="min-h-screen bg-background font-body text-on-background">
            <div className="mx-auto max-w-[1440px] px-4 py-6">
                <AppHeader/>

                <div className="space-y-8">
                    <section
                        className="relative flex flex-col gap-8 overflow-hidden rounded-[2rem] border-4 border-[#283f3b] bg-white p-8 shadow-[8px_8px_0px_0px_#283f3b] md:flex-row md:items-center">
                        <div
                            className="absolute right-0 top-0 h-64 w-64 -rotate-12 translate-x-20 -translate-y-20 rounded-full border-4 border-[#283f3b] border-dashed bg-primary-container/10"/>

                        <div className="relative">
                            <div
                                className="h-40 w-40 overflow-hidden rounded-full border-4 border-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b]">
                                <img
                                    alt="Nguyễn Văn Minh"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMBC2iyhNzwKbtQW0LNx7-rHsVPKPmFcj1tNWZntgSIeshoSJ3j8tL7857mMnQp8bn3KoZtZr_Fw8fxnpf3QBZg9q6xNgsVvwRvSiAl81jj1Lef9sEQU5qEttcnrsZUOiMgEMtwreYCAM0cq0J_S4Wgd-kV1XYSJd-08xDtlEAda9oXEJkaILVnRcNzuATzfuy-Nt96n27rXFmPEGh-I7R67xCjF_VUnkaw-KPTzTvWIanI2A8pQ5Fn7EVJFlK698-3U9j6VzXHV4"
                                />
                            </div>

                            <div
                                className="absolute -bottom-2 -right-2 rounded-full border-2 border-[#283f3b] bg-tertiary-container p-2 shadow-[2px_2px_0px_0px_#283f3b]">
                <span className="material-symbols-outlined text-sm text-white"
                      style={{fontVariationSettings: '"FILL" 1'}}>
                  verified
                </span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <h1 className="text-4xl font-black uppercase tracking-tight">{displayName}</h1>
                                <span
                                    className="rounded-full border-2 border-[#283f3b] bg-secondary-container px-4 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_#283f3b]">
                                    PRO MEMBER
                                </span>
                            </div>

                            <p className="pt-1 text-xl font-bold italic underline decoration-[#ffbf00] decoration-4">
                                TRUNG CẤP - B2
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start">
                                <div
                                    className="flex items-center gap-2 rounded-xl border-2 border-[#283f3b] bg-[#fcfbf8] px-4 py-2 shadow-[2px_2px_0px_0px_#283f3b]">
                  <span
                      className="material-symbols-outlined text-red-500"
                      style={{fontVariationSettings: '"FILL" 1'}}
                  >
                    local_fire_department
                  </span>
                                    <span className="font-black text-sm uppercase">15 Days Streak</span>
                                </div>

                                <div
                                    className="flex items-center gap-2 rounded-xl border-2 border-[#283f3b] bg-[#fcfbf8] px-4 py-2 shadow-[2px_2px_0px_0px_#283f3b]">
                  <span
                      className="material-symbols-outlined text-[#ffbf00]"
                      style={{fontVariationSettings: '"FILL" 1'}}
                  >
                    stars
                  </span>
                                    <span className="font-black text-sm uppercase">Gold League</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 md:ml-2">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
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

                    {/* Bento statistics */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <StatCard label="Số từ đã học" value="1,240" subValue="+12 hôm nay"
                                  subValueClassName="text-tertiary"/>
                        <StatCard
                            label="Ngày học liên tiếp"
                            value="15"
                            accentClassName="text-[#FF9F1C]"
                            subValue="Kỷ lục: 32 ngày"
                        />
                        <StatCard label="Tổng XP" value="24,500" subValue="Level 24"
                                  subValueClassName="text-[#ffbf00]"/>
                        <StatCard label="Thứ hạng" value="#4" subValue="Gold League"/>
                    </div>

                    {/* Secondary sections */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div
                            className="lg:col-span-2 rounded-[1.5rem] border-4 border-[#283f3b] bg-white shadow-[4px_4px_0px_0px_#283f3b]">
                            <div className="flex items-center justify-between border-b-4 border-[#283f3b] p-6">
                                <h2 className="text-xl font-black uppercase tracking-tight">Biểu đồ tiến độ</h2>
                                <div className="flex gap-2">
                                    <button
                                        className="rounded border-2 border-[#283f3b] bg-primary-container px-3 py-1 text-xs font-black uppercase">
                                        W
                                    </button>
                                    <button
                                        className="rounded border-2 border-[#283f3b] px-3 py-1 text-xs font-black uppercase opacity-40">
                                        M
                                    </button>
                                </div>
                            </div>

                            <div className="flex h-64 items-end justify-between gap-4 p-8">
                                <div
                                    className="group relative flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[30%]">
                                    <div
                                        className="absolute left-1/2 -top-10 hidden -translate-x-1 rounded bg-[#283f3b] px-2 py-1 text-[10px] text-white group-hover:block">
                                        240XP
                                    </div>
                                </div>
                                <div
                                    className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[45%]"/>
                                <div
                                    className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[20%]"/>
                                <div
                                    className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[80%]"/>
                                <div
                                    className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[60%]"/>
                                <div
                                    className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-[#ffbf00] h-[95%]"/>
                                <div className="flex-1 border-x-4 border-t-4 border-[#283f3b] bg-tertiary h-[75%]"/>
                            </div>

                            <div
                                className="flex justify-between px-8 pb-4 text-[10px] font-black uppercase opacity-40">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        <div
                            className="flex flex-col rounded-[1.5rem] border-4 border-[#283f3b] bg-white shadow-[4px_4px_0px_0px_#283f3b]">
                            <div className="border-b-4 border-[#283f3b] p-6">
                                <h2 className="text-xl font-black uppercase tracking-tight">Lịch sử học tập</h2>
                            </div>

                            <div className="space-y-4 overflow-y-auto p-4 max-h-[300px]">
                                <HistoryRow
                                    icon="mic"
                                    iconBgClass="bg-primary-container"
                                    title="Dictation: Lesson 04"
                                    subtitle="Completed • 2h ago"
                                    xp="+45XP"
                                />
                                <HistoryRow
                                    icon="style"
                                    iconBgClass="bg-tertiary-container"
                                    title="Flashcards: Daily Conv."
                                    subtitle="Reviewed • 5h ago"
                                    xp="+20XP"
                                />
                                <HistoryRow
                                    icon="play_circle"
                                    iconBgClass="bg-secondary-container"
                                    title="Video: Business Phrasal Verbs"
                                    subtitle="Watched • Yesterday"
                                    xp="+100XP"
                                />
                                <HistoryRow
                                    hasDashed={false}
                                    icon="mic"
                                    iconBgClass="bg-primary-container"
                                    title="Dictation: Lesson 03"
                                    subtitle="Completed • Yesterday"
                                    xp="+50XP"
                                />
                            </div>

                            <button
                                className="m-4 rounded-lg border-2 border-[#283f3b] px-2 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-zinc-50">
                                Xem tất cả
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#283f3b]/80 p-4 backdrop-blur-sm">
                    <div
                        className="w-full max-w-md rounded-[2rem] border-4 border-[#283f3b] bg-[#fcfbf8] p-8 shadow-[8px_8px_0px_0px_#283f3b]">
                        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-[#283f3b]">
                            Sửa hồ sơ
                        </h2>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                            <div className="flex items-center gap-4">
                                <div
                                    className="h-16 w-16 overflow-hidden rounded-full border-4 border-[#283f3b] bg-white shadow-[2px_2px_0px_0px_#283f3b] shrink-0">
                                    <img
                                        alt="Current Avatar"
                                        className="h-full w-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMBC2iyhNzwKbtQW0LNx7-rHsVPKPmFcj1tNWZntgSIeshoSJ3j8tL7857mMnQp8bn3KoZtZr_Fw8fxnpf3QBZg9q6xNgsVvwRvSiAl81jj1Lef9sEQU5qEttcnrsZUOiMgEMtwreYCAM0cq0J_S4Wgd-kV1XYSJd-08xDtlEAda9oXEJkaILVnRcNzuATzfuy-Nt96n27rXFmPEGh-I7R67xCjF_VUnkaw-KPTzTvWIanI2A8pQ5Fn7EVJFlK698-3U9j6VzXHV4"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                                        Ảnh đại diện
                                    </label>
                                    <label
                                        className="inline-block cursor-pointer rounded-lg border-2 border-[#283f3b] bg-primary-container px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#283f3b] transition-all hover:brightness-95 active:translate-y-1 active:shadow-none">
                                        Thay đổi
                                        <input type="file" className="hidden" accept="image/*"/>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="nguyen.minh@example.com"
                                    className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Nguyễn Văn Minh"
                                    className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                                    Mục tiêu học tập
                                </label>
                                <select
                                    defaultValue="b2"
                                    className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00]"
                                >
                                    <option value="b1">Sơ trung cấp - B1</option>
                                    <option value="b2">Trung cấp - B2</option>
                                    <option value="c1">Cao cấp - C1</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 rounded-xl border-4 border-[#283f3b] bg-[#ffbf00] px-4 py-3 font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

