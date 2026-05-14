import AppHeader from '../components/layout/AppHeader'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import CtaSection from '../components/sections/CtaSection'
import styles from '../styles/LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.page}>
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
