import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import CtaSection from '../components/sections/CtaSection'
import '../styles/LandingPage.module.css'


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      {/* Bọc AppHeader trong div sticky trực tiếp dưới vùng chứa toàn trang để nó bám dính suốt trang */}
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1440px] px-4 pt-6 pointer-events-none">
        <div className="pointer-events-auto">
          <AppHeader />
        </div>
      </div>
      
      <main className="mx-auto max-w-[1440px] px-4">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
