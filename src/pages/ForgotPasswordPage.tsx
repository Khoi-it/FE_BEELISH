import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { ROUTES } from '../constants/routes';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Gửi yêu cầu thất bại!');
            }

            setIsSent(true);
            setMessage({ type: 'success', text: 'Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư!' });
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
                        <span className="material-symbols-outlined text-moss-green text-4xl">lock_reset</span>
                    </div>
                    <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Quên mật khẩu</h2>
                    <p className="mb-6 font-medium text-moss-green/70">
                        Nhập email bạn đã đăng ký để nhận liên kết khôi phục mật khẩu.
                    </p>

                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <div className="space-y-2">
                                <label className="ml-1 block text-sm font-bold text-moss-green">Email của bạn</label>
                                <div className="relative">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                        placeholder="example@beelish.vn"
                                        type="email"
                                        required
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-moss-green/50">mail</span>
                                </div>
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
                                {isLoading ? 'Đang gửi...' : 'Gửi liên kết khôi phục'}
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
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-white hover:bg-gray-50 transition-all"
                            >
                                {isLoading ? 'Đang gửi lại...' : 'Gửi lại email'}
                            </button>
                        </div>
                    )}

                    <p className="mt-8 text-center text-sm font-bold text-moss-green">
                        Nhớ mật khẩu rồi?
                        <Link className="ml-1 text-primary hover:underline underline-offset-4 decoration-2" to={ROUTES.LOGIN}>
                            Quay lại Đăng nhập
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
