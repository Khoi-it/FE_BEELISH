import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-4xl px-4 py-20 min-h-[60vh]">
        <h1 className="text-4xl font-black mb-8">Blog & Tin tức</h1>
        <div className="grid gap-6 md:grid-cols-2">
          
          <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_black]">
            <h2 className="text-2xl font-bold mb-2">Cách học từ vựng hiệu quả</h2>
            <p className="text-gray-600 mb-4">Khám phá phương pháp Spaced Repetition (Lặp lại ngắt quãng) giúp bạn nhớ từ vựng mãi mãi.</p>
            <button className="text-primary font-bold hover:underline">Đọc tiếp &rarr;</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_black]">
            <h2 className="text-2xl font-bold mb-2">Cập nhật tính năng Dictation mới</h2>
            <p className="text-gray-600 mb-4">Tìm hiểu về tính năng nghe chép chính tả mới vừa được cập nhật trên nền tảng Beelish.</p>
            <button className="text-primary font-bold hover:underline">Đọc tiếp &rarr;</button>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  )
}
