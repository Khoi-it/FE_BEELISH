import { useState } from 'react';
import { updateUser } from '../../api/userApi';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function LearningGoalModal({ 
    onSuccess, 
    userTempData 
}: { 
    onSuccess: () => void,
    userTempData: any 
}) {
    const { setUser } = useAuth();
    const [level, setLevel] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!level) {
            setError('Vui lòng chọn một mục tiêu học tập!');
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            // Include existing name and email to avoid overwriting them with null
            const name = userTempData?.fullName || userTempData?.name || '';
            const email = userTempData?.email || '';

            await updateUser({ name, email, level });

            // Update user in context and local storage
            const updatedUser = { 
                ...userTempData, 
                level: level 
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Dispatch event for other components if needed
            window.dispatchEvent(new Event('userStatsUpdated'));

            onSuccess();
        } catch (err) {
            console.error('Error updating learning goal:', err);
            setError('Có lỗi xảy ra khi lưu mục tiêu. Vui lòng thử lại.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#283f3b]/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[2rem] border-4 border-[#283f3b] bg-[#fcfbf8] p-8 shadow-[8px_8px_0px_0px_#283f3b] transform scale-100 animate-in fade-in zoom-in duration-200">
                <div className="mb-6 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#283f3b] bg-primary/20">
                        <span className="material-symbols-outlined text-[#283f3b] text-4xl">flag</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-black uppercase tracking-tight text-[#283f3b]">
                        Mục tiêu học tập
                    </h2>
                    <p className="font-medium text-[#283f3b]/70">
                        Hãy chọn trình độ mục tiêu để Beelish đề xuất bài học phù hợp nhất với bạn.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <select
                            value={level}
                            onChange={(e) => {
                                setLevel(e.target.value);
                                setError('');
                            }}
                            className="w-full rounded-xl border-4 border-[#283f3b] bg-white px-4 py-4 font-bold text-[#283f3b] outline-none transition-colors focus:border-[#ffbf00] cursor-pointer"
                        >
                            <option value="" disabled>-- Chọn trình độ mong muốn --</option>
                            <option value="A1">Sơ cấp - A1</option>
                            <option value="A2">Sơ trung cấp - A2</option>
                            <option value="B1">Trung cấp - B1</option>
                            <option value="B2">Trung cao cấp - B2</option>
                            <option value="C1">Cao cấp - C1</option>
                        </select>
                        {error && <p className="mt-2 text-sm font-bold text-red-500">{error}</p>}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`w-full rounded-xl border-4 border-[#283f3b] px-4 py-4 font-black uppercase shadow-[4px_4px_0px_0px_#283f3b] transition-all flex justify-center items-center gap-2
                            ${isSaving 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed translate-y-1 shadow-none' 
                                : 'bg-[#ffbf00] text-[#283f3b] active:translate-y-1 active:shadow-none hover:brightness-110'
                            }`}
                    >
                        <span>{isSaving ? 'Đang lưu...' : 'Bắt đầu học ngay'}</span>
                        {!isSaving && <span className="material-symbols-outlined font-bold">rocket_launch</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
