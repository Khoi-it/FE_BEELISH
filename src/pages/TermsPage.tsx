import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-4xl px-4 py-20 min-h-[60vh]">
        <h1 className="text-4xl font-black mb-8">Điều khoản dịch vụ</h1>
        <div className="prose max-w-none space-y-4">
          <p>Chào mừng bạn đến với Beelish. Bằng việc sử dụng trang web và ứng dụng của chúng tôi, bạn đồng ý với các điều khoản sau đây.</p>
          <h2 className="text-2xl font-bold mt-6">1. Chấp nhận điều khoản</h2>
          <p>Bằng cách truy cập, đăng ký và sử dụng Beelish, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản dịch vụ này.</p>
          <h2 className="text-2xl font-bold mt-6">2. Quyền sở hữu trí tuệ</h2>
          <p>Tất cả nội dung trên Beelish bao gồm văn bản, phần mềm, kịch bản, đồ họa, ảnh, âm thanh, âm nhạc, video và các tính năng tương tác thuộc sở hữu của chúng tôi hoặc được cấp phép cho chúng tôi.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
