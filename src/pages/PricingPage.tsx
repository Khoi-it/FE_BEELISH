import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-5xl px-4 py-20 min-h-[60vh]">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">Bảng giá Beelish</h1>
          <p className="text-xl text-gray-600">Chọn gói học phù hợp nhất với mục tiêu của bạn</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          
          <div className="bg-white p-8 rounded-3xl border-[3px] border-[#283f3b] shadow-[8px_8px_0_0_#283f3b] flex flex-col">
            <h2 className="text-3xl font-black mb-2">Miễn phí</h2>
            <div className="text-4xl font-black mb-6">0đ<span className="text-lg text-gray-500 font-medium">/tháng</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500">check_circle</span> Truy cập 100+ bài học cơ bản</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500">check_circle</span> Luyện nghe chép 3 video/ngày</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500">check_circle</span> Duy trì Streak cơ bản</li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-gray-200 hover:bg-gray-300 transition-colors border-2 border-[#283f3b]">Bắt đầu ngay</button>
          </div>

          <div className="bg-[#ffbf00] p-8 rounded-3xl border-[3px] border-[#283f3b] shadow-[8px_8px_0_0_#283f3b] flex flex-col relative transform md:-translate-y-4">
            <div className="absolute -top-4 right-8 bg-[#283f3b] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Phổ biến nhất</div>
            <h2 className="text-3xl font-black mb-2">Premium</h2>
            <div className="text-4xl font-black mb-6">99.000đ<span className="text-lg text-[#283f3b]/70 font-medium">/tháng</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">check_circle</span> Không giới hạn kho từ vựng</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">check_circle</span> Xem Video Dictation VIP không quảng cáo</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">check_circle</span> Thống kê học tập chuyên sâu</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined">check_circle</span> Huy hiệu Premium độc quyền</li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-[#283f3b] text-white hover:bg-black transition-colors border-2 border-[#283f3b]">Nâng cấp ngay</button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
