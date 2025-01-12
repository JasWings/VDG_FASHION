import { useType } from '@/framework/type';
import { banner1, banner2 } from '@/lib/placeholders';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@/components/banners/banner-with-search')
);
const BannerShort = dynamic(() => import('@/components/banners/banner-short'));
const BannerWithoutSlider = dynamic(
  () => import('@/components/banners/banner-without-slider')
);
const BannerWithPagination = dynamic(
  () => import('@/components/banners/banner-with-pagination')
);
const MAP_BANNER_TO_GROUP: Record<string, any> = {
  classic: BannerWithSearch,
  modern: BannerShort,
  minimal: BannerWithoutSlider,
  standard: BannerWithSearch,
  compact: BannerWithPagination,
  default: BannerWithSearch,
};

const Banner: React.FC<{ layout: string; variables: any }> = ({
  layout,
  variables,
}) => {
  const custom={
    "id": 1,
    "name": "Grocery",
    "settings": {
        "isHome": true,
        "layoutType": "classic",
        "productCard": "neon"
    },
    "slug": "grocery",
    "language": "en",
    "icon": "FruitsVegetable",
    "promotional_sliders": [
        {
            "id": "902",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
        },
        {
            "id": "903",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
        },
        {
            "id": "904",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
        },
        {
            "id": "905",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
        },
        {
            "id": "906",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
        }
    ],
    "created_at": "2021-03-08T07:18:25.000Z",
    "updated_at": "2021-09-26T15:23:32.000Z",
    "translated_languages": [
        "en"
    ],
    "banners": [
        {
            "id": 12,
            "type_id": 1,
            "title": "Groceries Delivered in 90 Minute",
            "description": "Get your healthy foods & snacks delivered at your doorsteps all day everyday",
            "image": {
                "id": 907,
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/grocery.png",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/grocery-thumbnail.jpg"
            },
            "created_at": "2021-07-17T13:21:55.000000Z",
            "updated_at": "2021-07-17T13:21:55.000000Z"
        }
    ]
}
  const { type, error } = useType(variables.type);

  const group_images = [
    { name: "first", file :  banner1},
    { name: "second", file: banner2}
  ]
  
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_BANNER_TO_GROUP[layout];
  return (
    <Component banners={group_images} layout={layout} slug={custom?.slug} />
  );
};

export default Banner;
