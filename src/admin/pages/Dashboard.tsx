import { Users, Library, BookOpen, Video } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { AdminDashboardData, getAdminDashboardData } from '../../api/adminDashboardApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboardData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-5 text-center fw-bold text-muted">Loading Dashboard...</div>;
  }

  if (!data) {
    return <div className="p-5 text-center text-danger fw-bold">Failed to load Dashboard data</div>;
  }

  const kpis = [
    { title: 'Total Users', value: data.totalUsers.toLocaleString(), icon: <Users size={24} className="text-primary" />, color: 'var(--beelish-primary)' },
    { title: 'Active Learners', value: data.activeLearners.toLocaleString(), icon: <Library size={24} className="text-success" />, color: 'var(--beelish-success)' },
    { title: 'Total Vocab Sets', value: data.totalVocabulary.toLocaleString(), icon: <BookOpen size={24} className="text-danger" />, color: 'var(--beelish-danger)' },
    { title: 'Video Lessons', value: data.videoLessons.toLocaleString(), icon: <Video size={24} className="text-secondary" />, color: 'var(--beelish-secondary)' },
  ];

  // For Line Chart, we assume the trend is for the last 7 days.
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }));
  }

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Active Users',
        data: data.userActivityTrend || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#ffbf00',
        backgroundColor: 'rgba(255, 191, 0, 0.5)',
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'User Activity Trend (Last 7 Days)' },
    },
  };

  // For Doughnut Chart Demographics
  const demoLabels = Object.keys(data.userDemographics || {});
  const demoValues = Object.values(data.userDemographics || {});
  
  const doughnutData = {
    labels: demoLabels.length > 0 ? demoLabels : ['No Data'],
    datasets: [
      {
        data: demoValues.length > 0 ? demoValues : [1],
        backgroundColor: ['#679436', '#ffbf00', '#ef4444', '#a8a29e'],
        borderColor: '#283F3B',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">Dashboard Overview</h2>
      
      {/* KPI Cards */}
      <div className="row mb-4">
        {kpis.map((kpi, index) => (
          <div className="col-12 col-md-6 col-xl-3 mb-3" key={index}>
            <div className="card h-100 p-3 d-flex flex-row align-items-center">
              <div 
                className="rounded p-3 me-3 border-3 border-dark d-flex align-items-center justify-content-center"
                style={{ backgroundColor: `${kpi.color}20`, boxShadow: '2px 2px 0px 0px var(--beelish-secondary)' }}
              >
                {kpi.icon}
              </div>
              <div>
                <h6 className="text-muted mb-1 fw-bold">{kpi.title}</h6>
                <h3 className="m-0 fw-bold">{kpi.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          <div className="card p-3 h-100">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card p-3 h-100 d-flex flex-column align-items-center justify-content-center">
            <h5 className="fw-bold mb-3 w-100 text-center">Weekly Activity</h5>
            <div style={{ maxWidth: '250px' }}>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card p-4">
        <h5 className="fw-bold mb-3">User Leaderboard (Top 10)</h5>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total XP</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {data.topUsers && data.topUsers.length > 0 ? (
                data.topUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold">
                      {user.rankPosition === 1 ? '🥇 1' : user.rankPosition === 2 ? '🥈 2' : user.rankPosition === 3 ? '🥉 3' : user.rankPosition}
                    </td>
                    <td className="fw-bold">{user.fullName}</td>
                    <td className="text-warning fw-bold">{user.totalXP} XP</td>
                    <td>
                      <span className={`badge border border-dark ${user.rankPosition === 1 ? 'bg-warning text-dark' : user.rankPosition === 2 ? 'bg-secondary' : user.rankPosition === 3 ? 'bg-danger' : 'bg-light text-dark'}`}>
                        {user.rankName}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
