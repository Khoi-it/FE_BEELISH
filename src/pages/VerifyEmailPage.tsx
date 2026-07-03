import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import AppHeader from '../components/layout/AppHeader';
import { ROUTES } from '../constants/routes';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Đang xác thực email...');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Không tìm thấy token xác thực hợp lệ.');
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH}/verify-email?token=${token}`, {
                    method: 'GET',
                });
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Xác thực thất bại');
                }

                setStatus('success');
                setMessage('Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.');
            } catch (error: any) {
                setStatus('error');
                setMessage(error.message || 'Có lỗi xảy ra khi xác thực email.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
            <div className="mx-auto w-full max-w-[1440px] px-4 pt-4">
                <AppHeader />
            </div>
            
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 chunky-shadow-login text-center">
                    {status === 'loading' && (
                        <div className="mb-6 inline-flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-primary border-t-transparent"></div>
                    )}
                    {status === 'success' && (
                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <span className="material-symbols-outlined text-green-500 text-4xl">check_circle</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                            <span className="material-symbols-outlined text-red-500 text-4xl">error</span>
                        </div>
                    )}

                    <h2 className="mb-4 text-2xl font-extrabold text-moss-green">
                        {status === 'loading' ? 'Đang xác thực...' : status === 'success' ? 'Thành công!' : 'Thất bại!'}
                    </h2>
                    <p className="mb-8 font-medium text-moss-green/70">{message}</p>

                    <div className="flex flex-col gap-3">
                        <Link to={ROUTES.LOGIN} className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-primary button-3d-primary block">
                            Đăng nhập
                        </Link>
                        {status === 'error' && (
                            <button onClick={() => navigate(ROUTES.REGISTER)} className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-white hover:bg-gray-50 transition-all">
                                Quay lại Đăng ký
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
