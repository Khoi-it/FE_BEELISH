import styles from '../../styles/LandingPage.module.css'
import iconImage from "../../assets/icon.png";
import textImage from "../../assets/text.png";
import { ROUTES, routeHash } from '../../constants/routes'

const navItems = [
    {label: 'Trang chủ', route: ROUTES.HOME},
    {label: 'Từ vựng', route: ROUTES.VOCABULARY},
    {label: 'Video', route: ROUTES.VIDEO},
]

export default function MarketingHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#283f3b] bg-[#e5d1d0] px-6 py-4 md:px-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <a href={routeHash(ROUTES.LANDING)} className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg chunky-border overflow-hidden w-10 h-10 md:w-12 md:h-12">
                        <img alt="Beelish Logo" className="w-full h-full object-cover" src={iconImage}/>
                    </div>
                    <div className="h-8 flex items-center -mt-2">
                        <img alt="Beelish Text" className="h-full w-auto object-contain" src={textImage}/>
                    </div>
                </a>

                <nav className="hidden items-center gap-8 font-bold md:flex">
                    {navItems.map(({label, route}) => (
                        <a
                            key={route}
                            href={routeHash(route)}
                            className="transition-colors hover:text-[#ffbf00]"
                        >
                            {label}
                        </a>
                    ))}
                </nav>
                <a href={routeHash(ROUTES.LOGIN)}>
                    <button type="button" className={`flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl bg-[#ffbf00] px-6 py-2 text-sm font-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] ${styles.chunkyBorder} ${styles.chunkyButton}`}>
                        ĐĂNG NHẬP
                    </button>
                </a>
            </div>
        </header>
    )
}
