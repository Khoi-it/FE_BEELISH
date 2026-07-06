import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-4xl px-4 py-20 min-h-[60vh]">
        <h1 className="text-4xl font-black mb-8">Chính sách bảo mật</h1>
        <div className="prose max-w-none space-y-4">
          <p>Chúng tôi tại Beelish tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân của bạn.</p>
          <h2 className="text-2xl font-bold mt-6">1. Thu thập thông tin</h2>
          <p>Chúng tôi chỉ thu thập các thông tin cần thiết để cung cấp dịch vụ tốt nhất cho bạn, bao gồm địa chỉ email, tên hiển thị và tiến trình học tập.</p>
          <h2 className="text-2xl font-bold mt-6">2. Sử dụng thông tin</h2>
          <p>Dữ liệu của bạn được sử dụng để cá nhân hóa trải nghiệm học tập, cải thiện ứng dụng và cung cấp các tính năng xếp hạng/chuỗi ngày học (streak) an toàn.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
