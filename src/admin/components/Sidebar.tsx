import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, Library, Video, Settings } from 'lucide-react';
import iconImage from '../../assets/icon.png';
import textImage from '../../assets/text.png';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} className="me-2" /> },
    { name: 'Vocabulary Sets', path: '/admin/vocab-sets', icon: <Library size={20} className="me-2" /> },
    { name: 'Video Lessons', path: '/admin/videos', icon: <Video size={20} className="me-2" /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} className="me-2" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} className="me-2" /> },
  ];

  return (
    <div className={`admin-sidebar d-flex flex-column ${!isOpen ? 'collapsed' : ''}`}>
      <div className="p-3 d-flex align-items-center justify-content-center border-bottom border-dark border-3 gap-2" style={{backgroundColor: 'var(--beelish-primary)'}}>
        <div className="bg-primary rounded-lg chunky-border overflow-hidden w-10 h-10 md:w-12 md:h-12" style={{width: '40px', height: '40px'}}>
            <img alt="Beelish Logo" className="w-full h-full object-cover" src={iconImage}/>
        </div>
        <div className="h-8 flex items-center -mt-2" style={{height: '32px'}}>
            <img alt="Beelish Text" className="h-full w-auto object-contain" src={textImage}/>
        </div>
      </div>
      
      <div className="flex-grow-1 py-3 overflow-auto">
        <ul className="nav flex-column mb-auto">
          {navItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link d-flex align-items-center ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 border-top border-dark border-3 text-center text-muted" style={{fontSize: '0.8rem'}}>
        Admin Dashboard v1.0
      </div>
    </div>
  );
}
