import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import CtaSection from '../components/sections/CtaSection'
import '../styles/LandingPage.module.css'
import '../styles/LegacyGlobals.module.css'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body text-[#283f3b]">
      <div className="mx-auto max-w-[1440px] px-4 pt-6">
        <AppHeader />
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
