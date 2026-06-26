import { useState } from 'react';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="admin-topbar d-flex justify-content-between align-items-center p-3 sticky-top">
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn btn-primary d-flex align-items-center justify-content-center p-2"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        <div className="position-relative d-none d-md-block">
          <input 
            type="text" 
            className="form-control border-3 border-dark" 
            placeholder="Search anything..." 
            style={{ paddingLeft: '40px', borderRadius: '0.5rem' }}
          />
          <Search size={18} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '12px' }} />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light border-3 border-dark p-2 position-relative d-flex align-items-center justify-content-center" style={{borderRadius: '0.5rem', boxShadow: '2px 2px 0px 0px var(--beelish-secondary)'}}>
          <Bell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
            3
          </span>
        </button>
        
        <div className="position-relative">
          <div 
            className="d-flex align-items-center gap-2" 
            style={{cursor: 'pointer'}}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="bg-light border-3 border-dark d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{width: '40px', height: '40px', boxShadow: '2px 2px 0px 0px var(--beelish-secondary)'}}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-100 h-100" style={{ objectFit: 'cover' }} />
              ) : (
                <User size={20} className="text-secondary" />
              )}
            </div>
            <span className="fw-bold text-secondary d-none d-sm-block">
              {user?.fullName || user?.name || 'Admin'}
            </span>
          </div>

          {dropdownOpen && (
            <div 
              className="position-absolute end-0 mt-3 bg-white border border-3 border-dark p-1" 
              style={{ minWidth: '150px', zIndex: 1000, borderRadius: '0.5rem', boxShadow: '4px 4px 0px 0px var(--beelish-secondary)' }}
            >
              <button 
                onClick={logout}
                className="btn btn-light w-100 text-start text-danger fw-bold d-flex align-items-center gap-2 border-0"
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
