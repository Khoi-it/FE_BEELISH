import styles from '../../styles/LandingPage.module.css'

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div
          className={`mb-2 inline-block self-start rounded-full bg-white px-4 py-1 text-xs font-black tracking-widest uppercase ${styles.chunkyBorder} ${styles.shadowChunky}`}
        >
          🐝 Ứng dụng số 1 Việt Nam
        </div>

        <h1 className="text-6xl leading-[1.1] font-black tracking-tight md:text-7xl">
          Học Tiếng Anh{' '}
          <span className="text-[#ffbf00] italic underline decoration-[#283f3b]">Siêu Cấp</span>
        </h1>

        <p className="max-w-lg text-xl font-medium leading-relaxed text-[#283f3bcc]">
          Học cùng chú ong thông thái để chinh phục tiếng Anh dễ dàng hơn mỗi ngày với phương pháp độc quyền.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            className={`group relative flex items-center justify-center rounded-2xl bg-[#ffbf00] px-10 py-5 text-xl font-black transition-all hover:translate-x-1 hover:translate-y-1 ${styles.chunkyBorder} ${styles.shadowChunkyLg}`}
          >
            BẮT ĐẦU CÀY NGAY
            <span className="material-symbols-outlined ml-2 font-black transition-transform group-hover:translate-x-1">
              bolt
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10 rounded-full bg-[#ffbf0033] blur-3xl" />
        <div
          className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-white ${styles.chunkyBorder} ${styles.shadowChunkyLg}`}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXGg86vPF3DnODHa7VDAYaz4I-Q191dMSugesnD-33iy_BXwjUNExZVrCfoRyhrKvd71-y1jWhaAWluq--hdoScCI61uG8Y_be9xUFbYlZVdm8P41P2onSzzkvOLjyU8BORaNJujalIJ-bv86ZUHl1Wzd3tyhyR_YPfS0URarV-D2YxG8xfC7UW8ew174AekzMEuIH84TUGtQlmIbt8RNotfriy2uUEqNW9UDxREM1qtE8Q_WYVrKFiDaq4BCOqqYqCwAjI-nnUSQ"
            alt="Beelish Mascot illustration"
            className="h-4/5 w-4/5 object-contain"
          />
        </div>
      </div>
    </section>
  )
}
