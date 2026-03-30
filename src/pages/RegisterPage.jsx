import { useState } from 'react'
import MarketingHeader from '../components/layout/MarketingHeader'
import { ROUTES, routeHash } from '../constants/routes'
import '../styles/LegacyGlobals.module.css'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
      <MarketingHeader />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 chunky-shadow-login md:p-12">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-moss-green bg-primary/20">
              <span className="material-symbols-outlined text-moss-green text-4xl">lock_open</span>
            </div>
            <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Đăng ký</h2>
            <p className="font-medium text-moss-green/70">Tạo tài khoản để bắt đầu hành trình học Beelish</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 block text-sm font-bold text-moss-green">Họ và tên</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                placeholder="Nguyễn Văn A"
                type="text"
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
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-moss-green/50">
                  visibility
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl border-2 border-moss-green bg-primary py-4 text-lg font-extrabold text-moss-green button-3d-primary flex items-center justify-center gap-2"
            >
              <span>Đăng ký</span>
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-moss-green">
            Đã có tài khoản?
            <a className="ml-1 text-primary hover:underline underline-offset-4 decoration-2" href={routeHash(ROUTES.LOGIN)}>
              Đăng nhập
            </a>
          </p>
        </div>
      </main>

      <footer className="p-8 text-center">
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

