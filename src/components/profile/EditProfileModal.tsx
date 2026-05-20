import { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email || '');
    const [fulltName, setFulltName] = useState(user?.fulltName || user?.name || '');
    const [level, setLevel] = useState(user?.level || '');

    const handleSave = () => {
        // Thực hiện lưu API ở đây (ví dụ: gọi updateUserProfile)
        // ...
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#283f3b]/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[2rem] border-4 border-[#283f3b] bg-[#fcfbf8] p-8 shadow-[8px_8px_0px_0px_#283f3b]">
                <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-[#283f3b]">
                    Sửa hồ sơ
                </h2>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-[#283f3b] bg-white shadow-[2px_2px_0px_0px_#283f3b] shrink-0">
                            <img
                                alt="Current Avatar"
                                className="h-full w-full object-cover"
                                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBC2iyhNzwKbtQW0LNx7-rHsVPKPmFcj1tNWZntgSIeshoSJ3j8tL7857mMnQp8bn3KoZtZr_Fw8fxnpf3QBZg9q6xNgsVvwRvSiAl81jj1Lef9sEQU5qEttcnrsZUOiMgEMtwreYCAM0cq0J_S4Wgd-kV1XYSJd-08xDtlEAda9oXEJkaILVnRcNzuATzfuy-Nt96n27rXFmPEGh-I7R67xCjF_VUnkaw-KPTzTvWIanI2A8pQ5Fn7EVJFlK698-3U9j6VzXHV4"}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                                Ảnh đại diện
                            </label>
                            <label className="inline-block cursor-pointer rounded-lg border-2 border-[#283f3b] bg-primary-container px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#283f3b] transition-all hover:brightness-95 active:translate-y-1 active:shadow-none">
                                Thay đổi
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                            className="w-full rounded-xl border-4 border-[#283f3b] bg-slate-200 px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors opacity-70"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            value={fulltName}
                            onChange={(e) => setFulltName(e.target.value)}
                            placeholder="Nhập họ và tên..."
                            className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-black uppercase text-[#283f3b]">
                            Mục tiêu học tập (Level)
                        </label>
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00]"
                        >
                            <option value="">-- Chọn một Level --</option>
                            <option value="A1">Sơ cấp - A1</option>
                            <option value="A2">Sơ trung cấp - A2</option>
                            <option value="B1">Trung cấp - B1</option>
                            <option value="B2">Trung cao cấp - B2</option>
                            <option value="C1">Cao cấp - C1</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border-4 border-[#283f3b] bg-white px-4 py-3 font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 rounded-xl border-4 border-[#283f3b] bg-[#ffbf00] px-4 py-3 font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all active:translate-y-1 active:shadow-none"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
