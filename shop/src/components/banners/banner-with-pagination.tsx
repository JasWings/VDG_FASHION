import { Swiper, SwiperSlide, Pagination } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { productPlaceholder } from '@/lib/placeholders';
import { Autoplay } from 'swiper';
import { getImageURL } from '@/lib/image';

interface BannerProps {
  banners: Array<{
    id: string;
    images: Array<{
      original: string;
      thumbnail?: string;
    }>;
  }>;
}

const BannerWithPagination: React.FC<BannerProps> = ({ banners }) => {
  console.log(banners,"banners")
  return (
    <div className="compact relative">
      <div className="-z-1 overflow-hidden rounded-xl">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Pagination, Autoplay]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              bulletClass:
                'swiper-pagination-bullet !w-2.5 !h-2.5 !p-1 !rounded-full bg-gray-400 !border-0 !opacity-70',
              clickableClass: 'cursor-pointer',
              bulletActiveClass: '!bg-accent',
              clickable: true,
            }}
          >
            {banners?.map((banner) =>
              banner.images.map((image, idx) => (
                <SwiperSlide key={`${banner.id}-${idx}`}>
                  <Link href={`?banner=${banner.id}`}>
                    <div className="relative h-full max-h-[240px] w-full md:max-h-[610px]">
                      <Image
                        className="h-full w-full"
                        src={ getImageURL(image) || productPlaceholder}
                        alt={banner.id}
                        width={1800}
                        height={610}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BannerWithPagination;
