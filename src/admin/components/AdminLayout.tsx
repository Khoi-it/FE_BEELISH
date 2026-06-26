import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../assets/css/admin-style.css'; // Custom CSS is safely scoped via .admin-body

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Ensure body has the admin class and load Bootstrap ONLY for admin
  useEffect(() => {
    document.body.classList.add('admin-body');

    // Dynamically inject Bootstrap 5 CSS
    const bsLink = document.createElement('link');
    bsLink.rel = 'stylesheet';
    bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    bsLink.id = 'admin-bootstrap-css';
    document.head.appendChild(bsLink);

    // Dynamically inject DataTables Bootstrap 5 CSS
    const dtLink = document.createElement('link');
    dtLink.rel = 'stylesheet';
    dtLink.href = 'https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css';
    dtLink.id = 'admin-dt-css';
    document.head.appendChild(dtLink);

    return () => {
      document.body.classList.remove('admin-body');
      
      const bsNode = document.getElementById('admin-bootstrap-css');
      if (bsNode) bsNode.remove();

      const dtNode = document.getElementById('admin-dt-css');
      if (dtNode) dtNode.remove();
    };
  }, []);

  return (
    <div className="d-flex admin-wrapper" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

