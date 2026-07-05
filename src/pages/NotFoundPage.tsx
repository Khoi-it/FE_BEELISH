import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import iconImage from '../assets/icon.png';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E5D1D0] font-display p-4">
      <div className="flex flex-col items-center text-center max-w-lg">
        {/* Lỗi 404 phong cách chunky */}
        <div className="relative mb-8 mt-12">
          <h1 className="text-[120px] md:text-[150px] leading-none font-black text-white" style={{ textShadow: '8px 8px 0px #283f3b' }}>
            404
          </h1>
          {/* Logo ong */}
          <div className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-24 h-24 md:w-28 md:h-28 rounded-[2rem] border-4 border-[#283f3b] shadow-[8px_8px_0px_0px_#283f3b] bg-primary overflow-hidden rotate-12">
            <img src={iconImage} alt="Beelish" className="w-full h-full object-cover p-2" />
          </div>
        </div>
        
        <h2 className="mb-4 text-3xl md:text-4xl font-black uppercase tracking-tight text-[#283f3b]">
          Không tìm thấy trang
        </h2>
        
        <p className="mb-10 text-lg font-bold text-[#283f3b]/70">
          Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển hoặc không tồn tại.
        </p>
        
        <Link 
          to={ROUTES.HOME}
          className="rounded-xl border-4 border-[#283f3b] bg-[#ffbf00] px-8 py-4 text-lg font-black uppercase text-[#283f3b] shadow-[4px_4px_0px_0px_#283f3b] transition-all hover:-translate-y-1 active:translate-y-1 active:shadow-none"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
