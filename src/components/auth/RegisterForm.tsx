import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../contexts/AuthContext.tsx";

export default function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isRegistered, setIsRegistered] = useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const loginWithGoogle = useGoogleLogin({
      onSuccess: (codeResponse) => handleGoogleSuccess(codeResponse),
      onError: () => setMessage({ type: 'error', text: 'Đăng nhập Google thất bại!' })
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu nhập lại không khớp!' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          fullName: fullName,
          email: email,
          password: password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Đăng ký thất bại, vui lòng thử lại!');
      }

      setMessage({ type: 'success', text: 'Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.' });
      setIsRegistered(true);

    } catch (error: any) {
      setMessage({ type: 'error', text: '❌ Lỗi: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gửi lại email thất bại!');
      setMessage({ type: 'success', text: 'Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: '❌ Lỗi: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
        const token = credentialResponse.access_token || credentialResponse.credential;
        const response = await fetch('http://localhost:8080/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Đăng nhập Google thất bại!');
        
        localStorage.setItem('accessToken', result.data.accessToken);
        if (result.data.refreshToken) localStorage.setItem('refreshToken', result.data.refreshToken);
        setUser(result.data.user);
        if (result.data.user) localStorage.setItem('user', JSON.stringify(result.data.user));
        
        navigate(result.data.user.roleId === 'ROLE_ADMIN' ? '/admin' : ROUTES.HOME);
    } catch (error: any) {
        setMessage({ type: 'error', text: '❌ Lỗi: ' + error.message });
    } finally {
        setIsLoading(false);
    }
  };

  if (isRegistered) {
      return (
          <div className="text-center space-y-6">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <span className="material-symbols-outlined text-green-500 text-4xl">mark_email_unread</span>
              </div>
              <h2 className="text-2xl font-extrabold text-moss-green">Kiểm tra Email của bạn</h2>
              <p className="font-medium text-moss-green/70">
                  Chúng tôi đã gửi một email xác thực đến <strong>{email}</strong>. 
                  Vui lòng kiểm tra hộp thư đến (và thư mục rác) để kích hoạt tài khoản.
              </p>
              {message.text && (
                  <div className={`p-4 rounded-xl text-sm font-bold border-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                      {message.text}
                  </div>
              )}
              <div className="flex flex-col gap-3 mt-6">
                  <button onClick={handleResendEmail} disabled={isLoading} className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-white hover:bg-gray-50 transition-all">
                      {isLoading ? 'Đang gửi...' : 'Gửi lại email'}
                  </button>
                  <Link to={ROUTES.LOGIN} className="w-full font-extrabold py-3 rounded-xl border-2 border-moss-green text-moss-green bg-primary button-3d-primary block text-center">
                      Quay lại Đăng nhập
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <>
      <div className="mb-10 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-moss-green bg-primary/20">
          <span className="material-symbols-outlined text-moss-green text-4xl">lock_open</span>
        </div>
        <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Đăng ký</h2>
        <p className="font-medium text-moss-green/70">Tạo tài khoản để bắt đầu hành trình học Beelish</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Ô nhập Họ và Tên */}
        <div className="space-y-2">
          <label className="ml-1 block text-sm font-bold text-moss-green">Họ và tên</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
            placeholder="Nguyễn Văn A"
            type="text"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="ml-1 block text-sm font-bold text-moss-green">Tên đăng nhập</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
            placeholder="Tên tài khoản của bạn"
            type="text"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="ml-1 block text-sm font-bold text-moss-green">Email</label>
          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
              placeholder="example@beelish.vn"
              type="email"
              required
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-moss-green/50">
              mail
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="ml-1 flex items-center justify-between">
            <label className="text-sm font-bold text-moss-green">Mật khẩu</label>
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
              placeholder="••••••••"
              type="password"
              required
              minLength={6}
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-moss-green/50">
              visibility
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 block text-sm font-bold text-moss-green">Nhập lại mật khẩu</label>
          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
              placeholder="••••••••"
              type="password"
              required
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-moss-green/50">
              visibility
            </span>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center border-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
            }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-xl border-2 border-moss-green py-4 text-lg font-extrabold text-moss-green flex items-center justify-center gap-2 transition-all
            ${isLoading ? 'bg-gray-300 cursor-not-allowed opacity-70' : 'bg-primary button-3d-primary hover:translate-y-[-2px]'}`}
        >
          <span>{isLoading ? 'Đang xử lý...' : 'Đăng ký'}</span>
          {!isLoading && <span className="material-symbols-outlined font-bold">arrow_forward</span>}
        </button>

        <div className="relative py-3 flex items-center">
            <div className="flex-grow border-t-2 border-moss-green/10"></div>
            <span className="flex-shrink mx-4 text-moss-green/40 font-bold text-xs uppercase tracking-widest">Hoặc</span>
            <div className="flex-grow border-t-2 border-moss-green/10"></div>
        </div>

        <div className="flex justify-center">
            <button
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full bg-white text-moss-green font-bold py-3 rounded-xl border-2 border-moss-green text-base button-3d-secondary flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Đăng nhập bằng Google</span>
            </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm font-bold text-moss-green">
        Đã có tài khoản?
        <Link className="ml-1 text-primary hover:underline underline-offset-4 decoration-2" to={ROUTES.LOGIN}>
          Đăng nhập
        </Link>
      </p>
    </>
  )
}
