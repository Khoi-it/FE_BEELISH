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
  const kpis = [
    { title: 'Total Users', value: '1,248', icon: <Users size={24} className="text-primary" />, color: 'var(--beelish-primary)' },
    { title: 'Active Learners', value: '892', icon: <Library size={24} className="text-success" />, color: 'var(--beelish-success)' },
    { title: 'Total Vocabulary', value: '5,024', icon: <BookOpen size={24} className="text-danger" />, color: 'var(--beelish-danger)' },
    { title: 'Video Lessons', value: '156', icon: <Video size={24} className="text-secondary" />, color: 'var(--beelish-secondary)' },
  ];

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Active Users',
        data: [650, 720, 810, 790, 850, 920, 892],
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
      title: { display: true, text: 'User Activity Trend' },
    },
  };

  const doughnutData = {
    labels: ['Beginner', 'Intermediate', 'Advanced'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#679436', '#ffbf00', '#ef4444'],
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
            <h5 className="fw-bold mb-3 w-100 text-center">User Demographics</h5>
            <div style={{ maxWidth: '250px' }}>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-4">
        <h5 className="fw-bold mb-3">Recent Activity</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Item</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold">John Doe</td>
                <td><span className="badge bg-success border border-dark">Completed</span></td>
                <td>Basic Greetings - Video</td>
                <td className="text-muted">2 mins ago</td>
              </tr>
              <tr>
                <td className="fw-bold">Jane Smith</td>
                <td><span className="badge bg-primary border border-dark text-dark">Started</span></td>
                <td>Colors & Shapes - Vocab Set</td>
                <td className="text-muted">15 mins ago</td>
              </tr>
              <tr>
                <td className="fw-bold">Admin</td>
                <td><span className="badge bg-secondary border border-dark">Added</span></td>
                <td>New Word: "Exacerbate"</td>
                <td className="text-muted">1 hour ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
