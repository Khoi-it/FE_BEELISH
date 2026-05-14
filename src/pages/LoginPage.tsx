import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import {ROUTES, routeHash} from '../constants/routes'
import {useAuth} from "../contexts/AuthContext.tsx";

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({type: '', text: ''})

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage({type: '', text: ''})
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })

            const result = await response.json()

            if (!response.ok || (result.statusCode && result.statusCode !== 200)) {
                throw new Error(result.message || 'Sai tài khoản hoặc mật khẩu!');
            }

            if (result.data && result.data.accessToken) {
                localStorage.setItem('accessToken', result.data.accessToken);
                if (result.data.refreshToken) {
                    localStorage.setItem('refreshToken', result.data.refreshToken);
                }
            } else {
                throw new Error("Không nhận được dữ liệu xác thực từ máy chủ");
            }

            setMessage({type: 'success', text: 'Đăng nhập thành công!'})
            setUser(result.data.user);

            // Xóa form
            setUsername('')
            setPassword('')

            // Chuyển sang trang chủ
            navigate(ROUTES.HOME)
        } catch (error) {
            // Kiểm tra xem error có phải là một Error object chuẩn không
            if (error instanceof Error) {
                setMessage({ type: 'error', text: '❌ Lỗi: ' + error.message });
            } else {
                // Đề phòng trường hợp lỗi quái lạ nào đó không phải là Error
                setMessage({ type: 'error', text: '❌ Đã xảy ra lỗi không xác định!' });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
            <div className="mx-auto w-full max-w-[1440px] px-4 pt-4">
                <AppHeader/>
            </div>
            <main className="flex-1 flex items-center justify-center py-4 px-6">
                <div
                    className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-6 chunky-shadow-login md:p-8">
                    <div className="mb-6 text-center">
                        <div
                            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-moss-green bg-primary/20">
                            <span className="material-symbols-outlined text-moss-green text-3xl">lock_open</span>
                        </div>
                        <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Đăng nhập</h2>
                        <p className="font-medium text-moss-green/70">Chào mừng bạn quay trở lại với Beelish</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {message.text && (
                            <div
                                className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {message.text}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="ml-1 block text-sm font-bold text-moss-green">Tên đăng nhập</label>
                            <div className="relative">
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-3 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                    placeholder="Tên tài khoản của bạn"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-moss-green">Mật khẩu</label>
                                <a className="text-primary font-bold text-xs hover:underline underline-offset-2 text-moss-green/60"
                                   href="#"
                                   tabIndex={-1}>
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-3 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                                <span
                                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-moss-green/50">
                                    visibility
                                </span>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2 ml-1">
                            <input
                                className="h-5 w-5 rounded border-2 border-moss-green text-primary focus:ring-primary focus:ring-offset-0"
                                id="remember"
                                type="checkbox"
                            />
                            <label className="cursor-pointer text-sm font-bold text-moss-green" htmlFor="remember">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        {/* Primary Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading} // Thêm dòng này
                            className={`w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-lg flex items-center justify-center gap-2 
                            ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-moss-green button-3d-primary'}`}
                        >
                            <span>{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</span>
                            {!isLoading && <span className="material-symbols-outlined font-bold">arrow_forward</span>}
                        </button>

                        {/* Divider */}
                        <div className="relative py-3 flex items-center">
                            <div className="flex-grow border-t-2 border-moss-green/10"></div>
                            <span
                                className="flex-shrink mx-4 text-moss-green/40 font-bold text-xs uppercase tracking-widest">
                                Hoặc
                            </span>
                            <div className="flex-grow border-t-2 border-moss-green/10"></div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            className="w-full bg-white text-moss-green font-bold py-3 rounded-xl border-2 border-moss-green text-base button-3d-secondary flex items-center justify-center gap-3"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"/>
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"/>
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"/>
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"/>
                            </svg>
                            <span>Đăng nhập bằng Google</span>
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="mt-6 text-center text-sm font-bold text-moss-green">
                        Chưa có tài khoản?
                        <a className="ml-1 text-primary hover:underline underline-offset-4 decoration-2"
                           href={routeHash(ROUTES.REGISTER)}>
                            Tham gia ngay
                        </a>
                    </p>
                </div>
            </main>

            <footer className="p-4 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-moss-green/40">
                    <span>© 2024 Beelish Co.</span>
                    <span>•</span>
                    <a className="hover:text-moss-green" href="#">
                        Bảo mật
                    </a>
                    <span>•</span>
                    <a className="hover:text-moss-green" href="#">
                        Điều khoản
                    </a>
                </div>
            </footer>
        </div>
    )
}

