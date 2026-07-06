import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-4xl px-4 py-20 min-h-[60vh]">
        <h1 className="text-4xl font-black mb-8">Liên hệ với Beelish</h1>
        <div className="prose max-w-none space-y-4">
          <p>Nếu bạn có bất kỳ câu hỏi, phản hồi hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.</p>
          <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_black]">
            <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
            <p><strong>Email:</strong> support@beelish.com</p>
            <p><strong>Hotline:</strong> 1800-BEELISH (1800-2335)</p>
            <p><strong>Địa chỉ:</strong> Tòa nhà Beelish, Số 1, Đường Học Tập, TP. HCM</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
