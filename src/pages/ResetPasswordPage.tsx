import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import { ROUTES } from '../constants/routes';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light p-6 font-display">
                <div className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 text-center">
                    <h2 className="mb-4 text-2xl font-extrabold text-red-500">Lỗi liên kết!</h2>
                    <p className="mb-6 font-medium text-moss-green/70">Liên kết không hợp lệ hoặc đã hết hạn.</p>
                    <Link to="/forgot-password" className="text-primary font-bold hover:underline">Yêu cầu liên kết mới</Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu nhập lại không khớp!' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Đổi mật khẩu thất bại!');
            }

            setIsSuccess(true);
            setMessage({ type: 'success', text: 'Đổi mật khẩu thành công! Bây giờ bạn có thể đăng nhập bằng mật khẩu mới.' });
        } catch (error: any) {
            setMessage({ type: 'error', text: '❌ Lỗi: ' + error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
            <div className="mx-auto w-full max-w-[1440px] px-4 pt-4">
                <AppHeader />
            </div>
            
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 chunky-shadow-login text-center">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-moss-green bg-primary/20">
                        <span className="material-symbols-outlined text-moss-green text-4xl">password</span>
                    </div>
                    <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Tạo mật khẩu mới</h2>
                    <p className="mb-6 font-medium text-moss-green/70">
                        Vui lòng nhập mật khẩu mới của bạn bên dưới.
                    </p>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <div className="space-y-2">
                                <label className="ml-1 block text-sm font-bold text-moss-green">Mật khẩu mới</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 block text-sm font-bold text-moss-green">Xác nhận mật khẩu mới</label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                    minLength={6}
                                />
                            </div>

                            {message.text && (
                                <div className={`p-4 rounded-xl text-sm font-bold text-center border-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full mt-4 rounded-xl border-2 border-moss-green py-4 text-lg font-extrabold text-moss-green flex items-center justify-center gap-2 transition-all
                                ${isLoading ? 'bg-gray-300 cursor-not-allowed opacity-70' : 'bg-primary button-3d-primary hover:translate-y-[-2px]'}`}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Lưu mật khẩu mới'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            {message.text && (
                                <div className="p-4 rounded-xl text-sm font-bold text-center border-2 bg-green-50 text-green-600 border-green-200">
                                    {message.text}
                                </div>
                            )}
                            <button
                                onClick={() => navigate(ROUTES.LOGIN)}
                                className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-primary button-3d-primary block"
                            >
                                Đi tới Đăng nhập
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
