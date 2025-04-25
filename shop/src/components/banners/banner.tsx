import { useSliders } from '@/framework/slider';
import dynamic from 'next/dynamic';
import { ErrorMessage } from '@/components/ui/error-message';

const BannerWithPagination = dynamic(
  () => import('@/components/banners/banner-with-pagination')
);

const MAP_BANNER_TO_GROUP: Record<string, any> = {
  compact: BannerWithPagination,
};

const Banner: React.FC<{ layout: string }> = ({ layout }) => {
  const { sliders, error } = useSliders();

  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_BANNER_TO_GROUP[layout] || BannerWithPagination;

  return (
    <Component banners={sliders} />
  );
};

export default Banner;
