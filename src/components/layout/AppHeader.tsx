import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import iconImage from '../../assets/icon.png'
import textImage from '../../assets/text.png'
import {ROUTES} from '../../constants/routes'
import {useAuth} from "../../contexts/AuthContext.tsx";

const navItems = [
    {label: 'Trang chủ', route: ROUTES.HOME},
    {label: 'Từ vựng', route: ROUTES.VOCABULARY},
    {label: 'Video', route: ROUTES.VIDEO},
]

export default function AppHeader() {
    const {user} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const displayName = user?.name || 'Khách';

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <header
            className="flex items-center justify-between chunky-border bg-white px-4 py-3 rounded-xl chunky-shadow mb-8">
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
                    {navItems.map(({label, route}) => (
                        <Link key={route} to={route}
                              className="px-3 py-1.5 text-sm font-bold hover:bg-primary/20 rounded-lg">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/*RIGHT*/}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                {/*Search*/}
                <div
                    className="hidden lg:flex bg-white chunky-border rounded-lg px-3 py-1.5 items-center gap-2 h-10 md:h-12">
                    <span className="material-symbols-outlined text-xl">search</span>
                    <input className="border-none focus:ring-0 text-sm font-bold bg-transparent w-28 md:w-38"
                           placeholder="Search..." type="text"/>
                </div>

                {isLoggedIn ? (
                    <>
                        {/*Streak*/}
                        <div
                            className="hidden sm:flex items-center gap-1.5 bg-white border-3 border-black ring-2 ring-black px-2 md:px-3 py-1.5 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B] h-10 md:h-11">
                          <span
                              className="material-symbols-outlined text-orange-500 fill-1 text-xl">local_fire_department</span>
                            <span className="text-sm hidden md:inline">12 Ngày</span>
                        </div>

                        {/*XP*/}
                        <div
                            className="hidden sm:flex items-center gap-1.5 bg-primary border-3 border-black ring-2 ring-black px-2 md:px-3 py-1.5 rounded-xl font-bold shadow-[4px_4px_0px_0px_#283F3B] h-10 md:h-11">
                            <span className="material-symbols-outlined text-xl">stars</span>
                            <span className="text-sm hidden md:inline">1,240 XP</span>
                        </div>

                        {/*Notification*/}
                        <button
                            className="px-2 md:px-3 py-1.5 chunky-border rounded-lg hover:bg-primary transition-colors flex items-center justify-center h-10 md:h-12">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>

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
            </div>
        </header>
    )
}

