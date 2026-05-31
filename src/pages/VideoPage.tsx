import { useState, useEffect } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import VideoLibraryHeader from '../components/video/VideoLibraryHeader'
import VideoGrid from '../components/video/VideoGrid'
import { getVideos } from '../api/videosApi'

const MOCK_VIDEOS = [
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6OOcPXQYK6k9N0rtQGHK1dj9Z6vrqj3XFmxlLgo7dcBDlxch1YH-cZqDLAGyLNwvfxlzpIMjmRudn63BoqpNvs1yJIcA_jMGgvKIJg2NoUZThQGCaB2qwh_iC_G9JXWoygkn7pdZOBaebCisiF-XhcsbadzxoAqAI-PSZS0Utmh7e7YPH2f4IPR-2NI_Q6Xfe1AXweVPoMNcWSa1xCAeWvIkjSYk07mbm4gQdBV53k93diQ-iNPnQ7kbLrn3DROdbhkfAViQoKZg',
    duration: '12:45',
    levelLabel: 'Dễ',
    levelClassName: 'bg-easy text-white border-white',
    title: 'Giao tiếp cơ bản trong quán cafe',
    views: '2.4k lượt xem',
    timeAgo: '2 ngày trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBy_i0ifAs7x-rXVn2-BPYzSTabuNIPsaIz4ixDFZsHRvT7IIxWB6nawViczYR1SFWG9MlSA-YMne-fMp9qTlbCkZysUfuEUQ6bh7jux_BVMZG9tBMpjEw_00z2MsKgS7rY4oTImKt8ncsuZWa55nT1S_3-B1d4tHVfWX0N5-NSr7MYpfGO_vaCvoSIWkUqUICSlcZn0j_WXV0xnpSHP2gcSLg60fqmwzHhZmnhcI-8mvszbKEzdetaJZpO9_drHz4fwi5Odd9Cqcw',
    duration: '08:20',
    levelLabel: 'Trung bình',
    levelClassName: 'bg-primary text-border-dark border-border-dark',
    title: 'Tiếng Anh thương mại cho người đi làm',
    views: '5.1k lượt xem',
    timeAgo: '1 tuần trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCs8Ligx47Xdwx3had9XN9A8b06OLYQAzZRXxlmduvYQz1XXM5CKPW4qydstupwiFowFzx9sLvg-w0X0bJCsBatzqT11BHDcV2-82HTM0Yc4m-nDQhUJIJA6sHLvv5T4fcIG6O6BULYf3tjPBWxeUZjumMuv0hDKu9HReVANERiPz4A82-NUK_aJX8VQk7sQ4OpdxF_6xWrqU_Anx6KRMYxOOF-2BOpUsblKB1j_4IbfcLo5U8l7qcS-R64W4galE_nLmKlA0tZL4Q',
    duration: '24:15',
    levelLabel: 'Khó',
    levelClassName: 'bg-hard text-white border-white',
    title: 'Phân tích chuyên sâu về IELTS Writing Task 2',
    views: '1.8k lượt xem',
    timeAgo: '3 ngày trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjclvE9x6Ie1ShlVYzACqrarL2dQEOHYjbxf469JzeNd8ZyqVSn8W2cb-Q3ZL5njumV_ejv0Z4MMb5x0T8Mc9ubtTnRNDd4849AU9QBHMWLe5jh_-jthi-PbIgSBKvBDI-Jm6prOhN7DHI_PeJZeYYAZTCY5ozlD5p16lYcB_d7FB8ycLt7d8E0aFg3DcvTLizqXogf54orDhxfjEGPFnv6sGySn-iMfFXRsKfC8euJL3cyyvZmhU02BqgfOrGJ1z6WXVXnUeiCaw',
    duration: '15:30',
    levelLabel: 'Dễ',
    levelClassName: 'bg-easy text-white border-white',
    title: 'Cách học từ vựng hiệu quả tại nhà',
    views: '12.4k lượt xem',
    timeAgo: '5 giờ trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6NkzzbFCL_7Zic5EfRh0RzQHDvPHOGSKqC206RnargsVPASQHxTAo1fMJZe6HuqBOBqXYpAd-rbBbqu_18s8LKWbH1jLeLRDRHGav0m86eSUvs7qZjars85iroKwvQAFBo9QgZq6eDPsVQ_agJ_dp6UO7JhXx0tXVbQiuXkdT8SuhoQxFCqbKn5marTYFULAPn-JAS_QTe5Watm8alSbFm-bFkQppDs31IY3fQLLHlsVIkRg9VtDvijn0N4JPkPf_looo1HqxPI',
    duration: '10:45',
    levelLabel: 'Trung bình',
    levelClassName: 'bg-primary text-border-dark border-border-dark',
    title: 'Thuyết trình tiếng Anh chuyên nghiệp',
    views: '3.2k lượt xem',
    timeAgo: '1 tuần trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnDMgKFaJwQIcZNBRxgf6V69J8mvhChXqRpUgTeVNKFVMARuFLFLjP6WHhbPYiroBa4BDrt14Qe5YIeXPya6sP9g-GV2rXsZ62_eZiqtjkBCXoayS_wcbrn6BrS4Hgw2T0cAygVqOUZ7ljEdeicfitBDdVH4pxqzrvSuuaKPRzQTv3-SHyQJxmdAVMem2nbLGpcAxeQ3My0oEAVmwd2TslH1WJFE9ZUThHPnavG8bNvrZ8Izq5OzqDLWhAvAX0YmCEjnF6pngTN-Y',
    duration: '05:12',
    levelLabel: 'Dễ',
    levelClassName: 'bg-easy text-white border-white',
    title: 'Luyện nghe qua tin tức hàng ngày',
    views: '8.9k lượt xem',
    timeAgo: '2 tuần trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAanowl0X7i4afh8-f3SPdmV3MbWTL3j9vfKQDvtCJv1qyeBNUEfFQuzycRv62E-rMlkZyDKVzxsq3gmHv56GXdivYrmaJ38nUg4qV7BPtqLrZ8-Wkcs6uI0vs2QFIq__iKqfyxLXX5iDRai3r4IeaIqKJfWX7cwB5gLxfJuhTcnZQwHv-nVnqggXzo2idH6VS7ol7kpvTvWewXa4PHPVh0HWPq-EJcEYXW7djyrDwStHjQQlMzM-7v8c_1SwuZCB7rEBdDC-pGIUU',
    duration: '32:00',
    levelLabel: 'Khó',
    levelClassName: 'bg-hard text-white border-white',
    title: 'Ngữ pháp nâng cao cho văn viết',
    views: '1.2k lượt xem',
    timeAgo: '1 tháng trước',
  },
  {
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeylRjzvvTVVB7Q_pBxjCLxWORyhd5PICDV2mo9HP80h1u2iat8aIUHlYWAPiVl0mIAYAlGG6Z5JxDkhFFrkgfSs9KKcwukHThNYxx8fMcDAGkhFGKaqrEKu4PR19WFzNXICnYNsowI9eMiQx3Y1HeOVeCFi-9X3ap8veoXWjGFPqKj__jpFiuUs7ZeGGEAYYcPrEVj1KALV8Ozjj96mHZykqmBm5Hv35LbHPcLt0LSuppLiL8cSY08PShrHkaR6K9z2fen_XZwAM',
    duration: '09:15',
    levelLabel: 'Trung bình',
    levelClassName: 'bg-primary text-border-dark border-border-dark',
    title: 'Slang và Idioms thông dụng nhất',
    views: '4.5k lượt xem',
    timeAgo: '2 ngày trước',
  },
]

export default function VideoPage() {
  const [videoList, setVideoList] = useState(MOCK_VIDEOS);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const data = await getVideos();
        
      
        if (data && data.length > 0) {
          setVideoList(data);
        }
      } catch (err) {
        console.warn('API error (Videos), using mock videos:', err);
      }
    };
    fetchVideoList();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#E5D1D0] font-display text-border-dark">
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] shrink-0 px-4 pt-6">
          <AppHeader />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
          <div className="mx-auto max-w-[1440px]">
            <VideoLibraryHeader />
            <VideoGrid videos={videoList} />
          </div>
        </div>
      </main>
    </div>
  )
}
