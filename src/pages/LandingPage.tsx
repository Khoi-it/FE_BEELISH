import MarketingHeader from '../components/layout/MarketingHeader'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import CtaSection from '../components/sections/CtaSection'
import styles from '../styles/LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <MarketingHeader />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
