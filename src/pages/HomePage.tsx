import { Link } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader.jsx'
import GoalCard from '../components/home/GoalCard'
import ContinueLearningCard from '../components/home/ContinueLearningCard'
import HoneycombActivityCard from '../components/home/HoneycombActivityCard'
import SocialChallengesCard from '../components/home/SocialChallengesCard'
import UpcomingWorkshopCard from '../components/home/UpcomingWorkshopCard'
import Footer from '../components/layout/Footer.js'
import { useDashboardData } from '../hooks/useDashboardData';

export default function HomePage() {
  const { data, isAuthenticated, loading } = useDashboardData();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-display">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-[#E5D1D0] font-display text-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 py-6 relative">
        <AppHeader />
        
        <div className={`grid grid-cols-12 gap-6 transition-all duration-300 ${!isAuthenticated ? 'blur-md opacity-60 pointer-events-none select-none' : ''}`}>
          {/* Cập nhật GoalCard theo data */}
          <GoalCard 
            dailyGoal={data?.dailyGoal} 
            todayXP={data?.todayXP}
            progressPercent={data?.progressPercent}
          />
          {/* Cập nhật ContinueLearningCard theo data (cần truyền videoId/resumeAt nếu ContinueLearningCard nhận props) */}
          <ContinueLearningCard />
          
          {/* Hiển thị Heatmap tổ ong cũ */}
          <HoneycombActivityCard checkinHistory={data?.checkinHistory} />
          
          <SocialChallengesCard />
          <UpcomingWorkshopCard />
        </div>

        {/* Overlay Modal khi chưa đăng nhập */}
        {!isAuthenticated && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 border-4 border-slate-900">
              <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">Chưa đăng nhập!</h3>
              <p className="text-slate-600 mb-8 font-bold">Bạn cần đăng nhập để theo dõi tiến độ, xem biểu đồ tần suất học và tiếp tục lộ trình của mình.</p>
              <Link 
                to="/login"
                className="inline-block w-full bg-primary hover:bg-primary/90 text-slate-900 font-black text-lg py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
