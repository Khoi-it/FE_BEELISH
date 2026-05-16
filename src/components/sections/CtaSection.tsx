// import styles from '../../styles/LandingPage.module.css'

export default function CtaSection() {
  return (
    <section className="mb-20 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-[#283f3b] p-12 text-center text-white md:p-20">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <span className="material-symbols-outlined text-9xl text-white">grade</span>
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-20">
          <span className="material-symbols-outlined text-9xl text-white">rocket_launch</span>
        </div>

        <h2 className="mb-8 text-4xl leading-tight font-black uppercase tracking-tight text-[#ffbf00] md:text-6xl">
          Sẵn sàng trở thành <br />
          siêu sao Tiếng Anh?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-white/80">
          Tham gia cùng cộng đồng 1,000,000+ người học Beelish ngay hôm nay và nhận ưu đãi đặc biệt dành cho
          người mới.
        </p>

        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <button
            type="button"
            className={`rounded-2xl bg-[#ffbf00] px-12 py-5 text-xl font-black uppercase text-[#283f3b] transition-all hover:translate-x-1 hover:translate-y-1 border-[3px] border-[#283f3b]`}
            style={{ boxShadow: '4px 4px 0 0 white' }}
          >
            Bắt đầu học miễn phí
          </button>
          <button
            type="button"
            className="rounded-2xl border-[3px] border-white bg-transparent px-12 py-5 text-xl font-black uppercase transition-colors hover:bg-white/10"
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  )
}
