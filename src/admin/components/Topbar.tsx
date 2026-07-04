import { useState, useEffect } from 'react';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getNotifications, markAllAsRead, NotificationItem } from '../../api/notificationApi';
interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    getNotifications().then(res => {
        setNotifications(Array.isArray(res) ? res : res || [])
    }).catch(console.error)
  }, []);

  const unreadCount = notifications.filter(n => !(n.read ?? (n as any).isRead)).length;

  const handleNotificationClick = async () => {
      setShowNotifications(!showNotifications)
      if (!showNotifications && unreadCount > 0) {
          try {
              await markAllAsRead();
              setNotifications(prev => prev.map(n => ({...n, read: true, isRead: true})));
          } catch (e) {
              console.error(e)
          }
      }
  }

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
        <div className="position-relative">
          <button 
            onClick={handleNotificationClick}
            className="btn btn-light border-3 border-dark p-2 position-relative d-flex align-items-center justify-content-center" 
            style={{borderRadius: '0.5rem', boxShadow: '2px 2px 0px 0px var(--beelish-secondary)'}}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div 
              className="position-absolute mt-2 bg-white border border-3 border-dark overflow-hidden" 
              style={{ width: '320px', right: '-10px', zIndex: 1000, borderRadius: '0.75rem', boxShadow: '4px 4px 0px 0px var(--beelish-secondary)' }}
            >
              <div className="p-3 border-bottom border-2 border-dark" style={{ backgroundColor: 'rgba(var(--bs-primary-rgb), 0.2)' }}>
                  <h6 className="fw-bold m-0">Thông báo</h6>
              </div>
              <div className="overflow-auto" style={{ maxHeight: '320px' }}>
                  {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted small">
                          Không có thông báo nào.
                      </div>
                  ) : (
                      notifications.map(notif => {
                          const isUnread = typeof notif.read !== 'undefined' ? !notif.read : !(notif as any).isRead;
                          return (
                              <div
                                  key={notif.id}
                                  className={`p-3 border-bottom border-light`}
                                  style={{ backgroundColor: isUnread ? 'rgba(var(--bs-primary-rgb), 0.05)' : 'white' }}
                              >
                                  <div className="d-flex justify-content-between align-items-start mb-1">
                                      <h6 className={`fw-bold m-0 ${isUnread ? 'text-dark' : 'text-secondary'}`} style={{ fontSize: '0.9rem' }}>
                                          {notif.title}
                                      </h6>
                                      {isUnread && (
                                          <div className="rounded-circle bg-danger flex-shrink-0 mt-1" style={{ width: '8px', height: '8px' }} />
                                      )}
                                  </div>
                                  <p className="text-muted m-0 mt-1" style={{ fontSize: '0.8rem' }}>{notif.message}</p>
                                  <span className="text-muted mt-2 d-block" style={{ fontSize: '0.7rem' }}>
                                      {new Date(notif.createdAt).toLocaleString()}
                                  </span>
                              </div>
                          );
                      })
                  )}
              </div>
            </div>
          )}
        </div>
        
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
