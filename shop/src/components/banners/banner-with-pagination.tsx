import { Swiper, SwiperSlide, Pagination } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import type { Banner } from '@/types';
import { Autoplay } from 'swiper'; // Import the Autoplay module

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
  slug?: string;
}

const BannerWithPagination: React.FC<BannerProps> = ({ banners, slug }) => {
  return (
    <div className="compact relative">
      <div className="-z-1 overflow-hidden rounded-xl">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Pagination, Autoplay]} // Add Autoplay module
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            autoplay={{
              delay: 3000, // Time in milliseconds (e.g., 3000ms = 3 seconds)
              disableOnInteraction: false, // Keeps autoplay even after user interaction
            }}
            pagination={{
              bulletClass:
                'swiper-pagination-bullet !w-2.5 !h-2.5 !p-1 !rounded-full bg-gray-400 !border-0 !opacity-70',
              clickableClass: 'cursor-pointer',
              bulletActiveClass: '!bg-accent',
              clickable: true,
            }}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <Link href={`?group=675fd2d26b6b9321b2092503`}>
                  <div className="relative h-full max-h-[240px] w-full md:max-h-[610px]">
                    <Image
                      className="h-full w-full"
                      src={banner.file ?? productPlaceholder}
                      alt={banner.title ?? ''}
                      width={1800}
                      height={610}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BannerWithPagination;
