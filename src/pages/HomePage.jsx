import AppHeader from '../components/layout/AppHeader.jsx'
import GoalCard from '../components/home/GoalCard'
import ContinueLearningCard from '../components/home/ContinueLearningCard'
import HoneycombActivityCard from '../components/home/HoneycombActivityCard'
import SocialChallengesCard from '../components/home/SocialChallengesCard'
import UpcomingWorkshopCard from '../components/home/UpcomingWorkshopCard'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#E5D1D0] font-display text-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 py-6">
        <AppHeader />

        <div className="grid grid-cols-12 gap-6">
          <GoalCard />
          <ContinueLearningCard />
          <HoneycombActivityCard />
          <SocialChallengesCard />
          <UpcomingWorkshopCard />
        </div>
      </div>
    </div>
  )
}

