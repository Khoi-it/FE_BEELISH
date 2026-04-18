import {useState} from 'react'
import MarketingHeader from '../components/layout/MarketingHeader'
import { ROUTES, routeHash } from '../constants/routes'
import '../styles/LegacyGlobals.module.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
            <MarketingHeader/>
            <main className="flex-1 flex items-center justify-center p-6">
                <div
                    className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 chunky-shadow-login md:p-12">
                    <div className="mb-10 text-center">
                        <div
                            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-moss-green bg-primary/20">
                            <span className="material-symbols-outlined text-moss-green text-4xl">lock_open</span>
                        </div>
                        <h2 className="mb-2 text-3xl font-extrabold text-moss-green">Đăng nhập</h2>
                        <p className="font-medium text-moss-green/70">Chào mừng bạn quay trở lại với Beelish</p>
                    </div>

                    <form className="space-y-6">
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
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-moss-green/50">mail</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-moss-green">Mật khẩu</label>
                                <a className="text-primary font-bold text-xs hover:underline underline-offset-2 text-moss-green/60"
                                   href="#">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border-2 border-moss-green bg-white px-5 py-4 text-moss-green placeholder:text-moss-green/40 font-semibold focus:border-primary focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                    type="password"
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
                            type="button"
                            className="w-full bg-primary text-moss-green font-extrabold py-4 rounded-xl border-2 border-moss-green text-lg button-3d-primary flex items-center justify-center gap-2"
                        >
                            <span>Đăng nhập</span>
                            <span className="material-symbols-outlined font-bold">arrow_forward</span>
                        </button>

                        {/* Divider */}
                        <div className="relative py-4 flex items-center">
                            <div className="flex-grow border-t-2 border-moss-green/10"></div>
                            <span className="flex-shrink mx-4 text-moss-green/40 font-bold text-xs uppercase tracking-widest">
                                Hoặc
                            </span>
                            <div className="flex-grow border-t-2 border-moss-green/10"></div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            className="w-full bg-white text-moss-green font-bold py-4 rounded-xl border-2 border-moss-green text-base button-3d-secondary flex items-center justify-center gap-3"
                        >
                            <img
                                alt=""
                                className="h-5 w-5"
                                data-alt="Biểu tượng Google cho đăng nhập"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-8Uxo98Vf0sYRG5Tt28d-dc5Y9PpEilrbW1TWEMzk5pZMrq7-F0vNFGTyV2udV6QtqJEBFTH8pICEl2vDF4gSgv9Qsf-xmWcKjnoEd-j0n_4ToguQdZMWtkOwk8QiVBEauMkNsYFwvRYbCvXvyTjqX-4wh8A-j3gyuaV9Oz-wskXG8TsTOrisooQFaTMQ5oLCsDPNc9z5AIUktGLnKzKfXsOn9EZ_r_hzEMkQkLvqXjS13TM_JI8r70j-3dYdgx2nbkPJ8AQVoHY"
                            />
                            <span>Đăng nhập bằng Google</span>
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="mt-8 text-center text-sm font-bold text-moss-green">
                        Chưa có tài khoản?
                        <a className="ml-1 text-primary hover:underline underline-offset-4 decoration-2" href={routeHash(ROUTES.REGISTER)}>
                            Tham gia ngay
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

