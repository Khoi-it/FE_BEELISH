import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import iconImage from '../../assets/icon.png'
import textImage from '../../assets/text.png'
import {ROUTES} from '../../constants/routes'
import {useAuth} from "../../contexts/AuthContext.tsx";
import { getNotifications, markAllAsRead, NotificationItem } from '../../api/notificationApi';
import { getStats } from '../../api/userApi';

const navItems = [
    {label: 'Tổng quan', route: ROUTES.HOME},
    {label: 'Từ vựng', route: ROUTES.VOCABULARY},
    {label: 'Video', route: ROUTES.VIDEO},
]

export default function AppHeader() {
    const {user} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const displayName = user?.fullName || user?.name || 'Khách';

    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [showNotifications, setShowNotifications] = useState(false)
    const [userStats, setUserStats] = useState<{ currentStreak?: number, totalXp?: number } | null>(null)
    const unreadCount = notifications.filter(n => !(n.read ?? (n as any).isRead)).length
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        const fetchStats = () => {
            getStats().then(res => {
                if (res) {
                    setUserStats(res)
                }
            }).catch(console.error)
        };

        if (isLoggedIn) {
            getNotifications().then(res => {
                setNotifications(Array.isArray(res) ? res : res || [])
            }).catch(console.error)

            fetchStats();
            
            // Listen for stats update from other components
            window.addEventListener('userStatsUpdated', fetchStats);
            return () => window.removeEventListener('userStatsUpdated', fetchStats);
        }
    }, [isLoggedIn])

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
        <header
            className="sticky top-4 z-50 flex items-center justify-between chunky-border bg-white px-4 py-3 rounded-xl chunky-shadow mb-8">
            {/*LEFT*/}
            <div className="flex items-center gap-4 shrink-0">
                <Link to={ROUTES.LANDING} className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg chunky-border overflow-hidden w-10 h-10 md:w-12 md:h-12">
                        <img alt="Beelish Logo" className="w-full h-full object-cover" src={iconImage}/>
                    </div>
                    <div className="h-8 flex items-center -mt-2">
                        <img alt="Beelish Text" className="h-full w-auto object-contain" src={textImage}/>
                    </div>
                </Link>
                <nav className="hidden md:flex gap-2 items-center">
                    {navItems
                        .filter(item => item.route === ROUTES.HOME ? isLoggedIn : true)
                        .map(({label, route}) => (
                        <Link key={route} to={route}
                              className="px-3 py-1.5 text-sm font-bold hover:bg-primary/20 rounded-lg">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/*RIGHT*/}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">

                {isLoggedIn ? (
                    <>
                        {/*Streak*/}
                        <div
                            className="hidden sm:flex items-center gap-1.5 bg-white border-3 border-black ring-2 ring-black px-2 md:px-3 py-1.5 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B] h-10 md:h-11">
                          <span
                              className="material-symbols-outlined text-orange-500 fill-1 text-xl">local_fire_department</span>
                            <span className="text-sm hidden md:inline">{userStats?.currentStreak || 0} Ngày</span>
                        </div>

                        {/*XP*/}
                        <div
                            className="hidden sm:flex items-center gap-1.5 bg-primary border-3 border-black ring-2 ring-black px-2 md:px-3 py-1.5 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B] h-10 md:h-11">
                            <span className="material-symbols-outlined text-xl">stars</span>
                            <span className="text-sm hidden md:inline">{(userStats?.totalXp || 0).toLocaleString()} XP</span>
                        </div>

                        {/*Admin Switch*/}
                        {user?.roleId === 'ROLE_ADMIN' && (
                            <Link to="/admin"
                                  className="hidden sm:flex items-center gap-1.5 bg-indigo-300 border-3 border-black ring-2 ring-black px-2 md:px-3 py-1.5 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B] h-10 md:h-11 hover:-translate-y-0.5 transition-transform">
                                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                <span className="text-sm hidden md:inline">Admin</span>
                            </Link>
                        )}

                        {/*Notification*/}
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="relative px-2 md:px-3 py-1.5 chunky-border rounded-lg hover:bg-primary transition-colors flex items-center justify-center h-10 md:h-12">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div className="fixed sm:absolute top-[88px] sm:top-auto sm:mt-2 right-4 sm:-right-4 md:right-0 w-[calc(100vw-2rem)] sm:w-80 bg-white chunky-border rounded-xl chunky-shadow overflow-hidden z-50">
                                    <div className="p-3 border-b-2 border-black bg-primary/20">
                                        <h3 className="font-bold">Thông báo</h3>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-gray-500">
                                                Không có thông báo nào.
                                            </div>
                                        ) : (
                                            notifications.map(notif => {
                                                const isUnread = typeof notif.read !== 'undefined' ? !notif.read : !(notif as any).isRead;
                                                return (
                                                    <div
                                                        key={notif.id}
                                                        className={`p-4 border-b-2 border-secondary/10 transition-colors hover:bg-surface-variant ${isUnread ? 'bg-primary/5' : ''}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className={`font-bold ${isUnread ? 'text-secondary' : 'text-secondary/70'}`}>
                                                                {notif.title}
                                                            </h4>
                                                            {isUnread && (
                                                                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                                                        <span className="text-[10px] text-gray-400 mt-2 block">
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

                        {/*User*/}
                        <Link to={ROUTES.PROFILE}
                              className="flex items-center gap-2 pl-2 md:pl-3 border-l-2 border-border-dark/10">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-bold leading-none">{displayName}</p>
                                <span className="text-[10px] font-bold text-easy uppercase">Beginner</span>
                            </div>
                            <div
                                className="w-8 h-8 md:w-9 md:h-9 bg-primary chunky-border rounded-full overflow-hidden">
                                <img alt="User Avatar"
                                     className="w-full h-full object-cover"
                                     referrerPolicy="no-referrer"
                                     src={user?.avatar|| 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}/>
                            </div>
                        </Link>
                    </>
                ) : (
                    <Link to={ROUTES.LOGIN}>
                        <button type="button"
                                className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-2 text-sm font-black transition-all hover:-translate-y-0.5 border-2 border-moss-green shadow-[4px_4px_0px_0px_#283F3B]">
                            ĐĂNG NHẬP
                        </button>
                    </Link>
                )}

                {/* Hamburger Menu Toggle */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex items-center justify-center p-2 rounded-lg chunky-border hover:bg-primary/20 transition-colors ml-1"
                >
                    <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-[110%] left-0 right-0 bg-white chunky-border rounded-xl chunky-shadow p-4 flex flex-col gap-4 md:hidden z-50">
                    <nav className="flex flex-col gap-2">
                        {navItems
                            .filter(item => item.route === ROUTES.HOME ? isLoggedIn : true)
                            .map(({label, route}) => (
                            <Link key={route} to={route}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="px-4 py-3 text-base font-bold hover:bg-primary/20 rounded-lg chunky-border bg-surface text-center">
                                {label}
                            </Link>
                        ))}
                    </nav>
                    
                    {isLoggedIn && (
                        <div className="flex gap-2 justify-center mt-2 border-t-2 border-dashed border-secondary/20 pt-4">
                            <div className="flex items-center gap-1.5 bg-white border-3 border-black ring-2 ring-black px-3 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B]">
                                <span className="material-symbols-outlined text-orange-500 fill-1 text-xl">local_fire_department</span>
                                <span className="text-sm">{userStats?.currentStreak || 0} Ngày</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-primary border-3 border-black ring-2 ring-black px-3 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B]">
                                <span className="material-symbols-outlined text-xl">stars</span>
                                <span className="text-sm">{(userStats?.totalXp || 0).toLocaleString()} XP</span>
                            </div>
                            {user?.roleId === 'ROLE_ADMIN' && (
                                <Link to="/admin"
                                      className="flex items-center gap-1.5 bg-indigo-300 border-3 border-black ring-2 ring-black px-3 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B]">
                                    <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

