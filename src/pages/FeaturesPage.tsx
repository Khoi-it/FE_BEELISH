import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-5xl px-4 py-20 min-h-[60vh]">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">Tính năng nổi bật</h1>
          <p className="text-xl text-gray-600">Khám phá các công cụ mạnh mẽ giúp bạn làm chủ tiếng Anh</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-2xl border-[3px] border-[#283f3b] shadow-[6px_6px_0_0_#283f3b]">
            <span className="material-symbols-outlined text-5xl text-[#ffbf00] mb-4 block">school</span>
            <h2 className="text-2xl font-bold mb-3">Học Từ Vựng Thông Minh</h2>
            <p className="text-gray-600">Học từ mới thông qua Flashcard và kỹ thuật lặp lại ngắt quãng, đảm bảo nhớ lâu không quên.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-[3px] border-[#283f3b] shadow-[6px_6px_0_0_#283f3b]">
            <span className="material-symbols-outlined text-5xl text-[#ffbf00] mb-4 block">headphones</span>
            <h2 className="text-2xl font-bold mb-3">Nghe Chép Chính Tả</h2>
            <p className="text-gray-600">Luyện nghe với các video thực tế kèm phụ đề đồng bộ. Nâng cao kỹ năng nghe hiểu cực nhanh.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-[3px] border-[#283f3b] shadow-[6px_6px_0_0_#283f3b]">
            <span className="material-symbols-outlined text-5xl text-[#ffbf00] mb-4 block">military_tech</span>
            <h2 className="text-2xl font-bold mb-3">Gamification</h2>
            <p className="text-gray-600">Tích lũy điểm kinh nghiệm (XP), thăng hạng và duy trì chuỗi ngày học để luôn có động lực.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
