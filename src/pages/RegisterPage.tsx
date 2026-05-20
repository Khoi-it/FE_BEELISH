import AppHeader from '../components/layout/AppHeader'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display dark:bg-background-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6">
        <AppHeader />
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[500px] rounded-2xl border-[3px] border-moss-green bg-white p-8 chunky-shadow-login md:p-12">
          <RegisterForm />
        </div>
      </main>

      <footer className="p-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-moss-green/40">
          <span>© 2026 Beelish Co.</span>
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