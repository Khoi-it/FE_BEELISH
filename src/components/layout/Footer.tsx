import { Link } from "react-router-dom";
import iconImage from "../../assets/icon.png";
import textImage from "../../assets/text.png";
import { ROUTES } from "../../constants/routes";

const productLinks = [
  { label: 'Tính năng', route: ROUTES.FEATURES },
  { label: 'Bảng giá', route: ROUTES.PRICING },
  { label: 'Blog', route: ROUTES.BLOG }
]
const supportLinks = [
  { label: 'Điều khoản', route: ROUTES.TERMS },
  { label: 'Bảo mật', route: ROUTES.PRIVACY },
  { label: 'Liên hệ', route: ROUTES.CONTACT }
]
const socialIcons = ['share', 'camera']

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-[#283f3b] bg-white px-6 py-10 md:py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-lg chunky-border overflow-hidden w-10 h-10 md:w-12 md:h-12">
                      <img alt="Beelish Logo" className="w-full h-full object-cover" src={iconImage}/>
                  </div>
                  <div className="h-8 flex items-center -mt-2">
                      <img alt="Beelish Text" className="h-full w-auto object-contain" src={textImage}/>
                  </div>
              </div>
            <p className="max-w-sm font-medium text-[#283f3bb3] pt-3">
              Nền tảng học tiếng Anh sáng tạo nhất, kết hợp giữa trò chơi và giáo dục để mang lại kết quả tốt
              nhất.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-black uppercase">Sản phẩm</h4>
            <ul className="flex flex-col gap-4 font-bold text-[#283f3bb3]">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.route} className="transition-colors hover:text-[#ffbf00]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-black uppercase">Hỗ trợ</h4>
            <ul className="flex flex-col gap-4 font-bold text-[#283f3bb3]">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.route} className="transition-colors hover:text-[#ffbf00]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-[#283f3b1a] pt-8 md:flex-row">
          <p className="font-bold text-[#283f3b99]">© 2024 Beelish. All rights reserved.</p>
          <div className="flex gap-6">
            {socialIcons.map((icon) => (
              <a
                key={icon}
                href="#"
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#ffbf00] border-[3px] border-[#283f3b] shadow-[4px_4px_0_0_#283f3b]`}
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
