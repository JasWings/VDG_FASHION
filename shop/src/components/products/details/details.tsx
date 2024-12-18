import BackButton from '@/components/ui/back-button';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import usePrice from '@/lib/use-price';
import { ThumbsCarousel } from '@/components/ui/thumb-carousel';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@/lib/get-variations';
import { useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@/components/ui/truncate';
import { scroller, Element } from 'react-scroll';
import CategoryBadges from './category-badges';
import WeightBadges from './weight-badges';
import VariationPrice from './variation-price';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import type { Product } from '@/types';
import { useAtom } from 'jotai';
import VariationGroups from './variation-groups';
import { isVariationSelected } from '@/lib/is-variation-selected';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAttributes } from './attributes.context';
import classNames from 'classnames';
import { displayImage } from '@/lib/display-product-preview-images';
import { HeartOutlineIcon } from '@/components/icons/heart-outline';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useUser } from "@/framework/user";
import { useInWishlist, useToggleWishlist } from "@/framework/wishlist";
import { useIntersection } from 'react-use';
import { StarIcon } from '@/components/icons/star-icon';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import client from '@/framework/client';
import VariantWeightBadges from './weights';
// import { useCountry } from '@/store/country/country.context';
import ImageLoader from '@/components/ui/loaders/imageLoader';
import { productPlaceholder } from '@/lib/placeholders';
import { getImageURL } from '@/lib/image';

const FavoriteButton = dynamic(
  () => import('@/components/products/details/favorite-button'),
  { ssr: false }
);

type Props = {
  product: any;
  backBtn?: boolean;
  isModal?: boolean;
};
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    id,
    name,
    images, 
    main_image,
    thumb_image,
    description,
    identity,
    sku,
    weight_in_grams,
    nutrition_values,
    unit,
    category,
    gallery,
    type,
    stock,
    quantity,
    shop,
    slug,
    ratings,
    video,
    has_variants,
  } = product ?? {};
  const isVariant = product?.product_type === "variable" ? true : false
  const variants_list = product?.variation_options
  const first_variant = variants_list?.[0]


  const { t } = useTranslation('common');
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);
  // const {selectedCountry}=useCountry()
  const router = useRouter();
  const { closeModal } = useModalAction();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const [isImageLoad,setImageLoad]=useState(true)

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setShowStickyShortDetails(false);
      return;
    }
    if (intersection && !intersection.isIntersecting) {
      setShowStickyShortDetails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);
  const { attributes } = useAttributes();
  const [VariantProducts,setVariantProducts]=useState([])
  const [MainProduct,setMainProduct]=useState([])

  const findPriceIndex=()=>{
    let countryIndex: number | undefined
    // const PriceIndex=  product?.product_prices.map((list:any,index:number)=>{
    //     if(list.country===selectedCountry.id ){
    //        return countryIndex=index
    //     }
    // })
  return countryIndex
}

  const { price, basePrice, discount } = usePrice({
    amount: isVariant ? first_variant?.price : product?.price,
    baseAmount: isVariant ? first_variant?.sale_price : product?.sale_price    ,currencyCode:"USD"
  });

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };
  const hasVariations = !isEmpty(images);
  const previewImages = displayImage(images, gallery, images);
  const checkMainProduct=async()=>{
    const response:any=await client.products.MainProducts({id:product?.base_product})

    setMainProduct(response?.results)
}
  useEffect(()=>{
    const checkVariantProducts=async(id:any)=>{
          const response:any=await client.products.variantProducts({id:id})
          setVariantProducts(response?.results)
    }
    if(has_variants){
       checkVariantProducts(product?.id)
    }
    if(product?.is_variant){
        checkMainProduct()
    }
  },[])

  if(product?.is_variant&&MainProduct.length===0){
    checkMainProduct()
    return <Spinner />
  }
  console.log(product,"product",previewImages,variants_list)
  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row">
        <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
            {backBtn && <BackButton />}
            {discount && (
              <div className="rounded-full bg-yellow-500 px-3 text-xs font-semibold leading-6 text-light ltr:ml-auto rtl:mr-auto">
                {discount}
              </div>
            )}
          {/* </div> */}
          { gallery?.length===0&& !product?.image ?
           <Image 
           width={448}
           height={759}
           src={productPlaceholder}
           className=' shadow'
           alt={name}
           onLoad={()=>setImageLoad(false)}
           style={{opacity:isImageLoad?"0":"1"}}
           />
          :
            gallery?.length===0&&!product?.image?(
              <div className=' flex flex-col  justify-center'>
                {
                  isImageLoad&&(
                    <ImageLoader />
                    // <div className="bg-gray-300 animate-pulse w-[448px] h-[600px]"></div>
                  )
                }
                  <Image 
                  width={448}
                  height={759}
                  src={getImageURL(product?.image?.file)}
                  alt={name}
                  onLoad={()=>setImageLoad(false)}
                  style={{opacity:isImageLoad?"0":"1"}}
                  />
            </div>
            ):    
          <div className="product-gallery h-full">
          <ThumbsCarousel
            gallery={previewImages}
            main_image={gallery}
            video={video}
            hideThumbs={
              previewImages.length && video?.length
                ? false
                : previewImages.length <= 1
            }
          />
        </div>
              }   
        </div>

        <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="w-full" ref={intersectionRef}>
            <div className="flex w-full items-start justify-between space-x-8 rtl:space-x-reverse">
              <h1
                className={classNames(
                  `text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl pb-2`,
                  {
                    'cursor-pointer transition-colors hover:text-accent':
                      isModal,
                  }
                )}
                {...(isModal && {
                  onClick: () => navigate(Routes.product(slug)),
                })}
              >
                {name}
              </h1>
              {/* <div>
                <FavoriteButton
                  productId={id}
                  className={classNames({ 'mr-1': isModal })}
                />
              </div> */}
            </div>
            <div className=' flex w-full items-start justify-start space-x-8 rtl:space-x-reverse'>
                <p className=' font-medium text-lg leading-8'>SKU:  {sku}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              {unit && !hasVariations && (
                <span className="block text-sm font-normal text-body">
                  {unit}
                </span>
              )}

              {/* {isModal && (
                <div className="inline-flex shrink-0 items-center rounded border border-accent bg-accent px-3 py-1 text-sm text-white">
                  {ratings}
                  <StarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" />
                </div>
              )} */}
            </div>

            {description && (
              <div className="mt-3 font-normal text-base leading-6 text-body md:mt-4">
                <Truncate
                  character={150}
                  {...(!isModal && {
                    onClick: () => scrollDetails(),
                    compressText: 'Read More',
                  })}
                >
                  {description}
                </Truncate>
              </div>
            )}

            {isVariant ? (
              <>
                <div className="my-5 flex items-center md:my-10">
                  {/* <VariationPrice
                    selectedVariation={first_variant}
                    minPrice={first_variant.price}
                    maxPrice={first_variant.sale_price}
                  /> */}
                </div>
                {/* <div>
                  <VariationGroups variations={variants_list} name={name} />
                </div> */}
              </>
            ) : (
              <span className="my-5 flex items-center md:my-10">
                <ins className="text-2xl font-semibold text-accent no-underline md:text-3xl">
                  {/* {price} */}
                  ₹{product?.sale_price}
                </ins>
                {basePrice && (
                  <del className="text-sm font-normal text-muted ltr:ml-2 rtl:mr-2 md:text-base">
                    {basePrice}
                  </del>
                )}
              </span>
            )}
            <div>
            {/* { has_variants ||product?.is_variant?( */}
                <VariantWeightBadges weight={weight_in_grams} has_variants={product?.has_variants} is_variant={product?.is_variant} products={product?.is_variant?MainProduct:VariantProducts}/>
              {/* ) */}
            {/* : */}
            {/* (
              <WeightBadges  weight={weight_in_grams} product={product}/>
            )
            } */}
            <div className="flex flex-col items-center   md:mt-6 lg:flex-row">
              <div className="mb-3 w-full lg:mb-0 lg:max-w-[400px]">
                <AddToCart
                  data={ isVariant ? first_variant :product}
                  variant="big"
                  variation={selectedVariation}
                  disabled={selectedVariation?.is_disable || !isSelected}
                />
              </div>
              </div>
              {
                !product?.is_external ? (
                  !hasVariations && (
                    <>
                      {Number(quantity) > 0 ? (
                        <span className="whitespace-nowrap text-base text-body ltr:lg:ml-7 rtl:lg:mr-7">
                          {/* {stock} {t('text-pieces-available')} */}
                        </span>
                      ) : (
                        <div className="whitespace-nowrap text-base text-red-500 ltr:lg:ml-7 rtl:lg:mr-7">
                          {t('text-out-stock')}
                        </div>
                      )}
                    </>
                  )
                ) : ''
              }


              {!isEmpty(selectedVariation) && (
                <span className="whitespace-nowrap text-base text-body ltr:lg:ml-7 rtl:lg:mr-7">
                  {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                    ? t('text-out-stock')
                    : `${selectedVariation.quantity} ${t(
                      'text-pieces-available'
                    )}`}
                </span>
              )}
            </div>
          </div>

          {category && (
            <CategoryBadges
              categories={category}
              basePath={`/${type?.slug}`}
              onClose={closeModal}
            />
          )}
          {
            nutrition_values&&(
              <div className='pt-6 w-[70%]'>
              <h1
                className={classNames(
                  `text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl pb-2 border-b border-border-200`,
                )}
              >
               Nutrition Value
                </h1>
               {Object.entries(nutrition_values).map(([key, value]:[string,any]) => (
                 <div key={key} className=' flex flex-row justify-between font-medium text-[14px] leading-7 border-b border-border-200'>
                   {
                    value?.NutritionName?(<> <span className=' py-3'>{value?.NutritionName}:</span> <span className=' py-3'>{value?.NutritionValue}</span></>) 
                    :
                    <>
                    <span className=' py-3'>{key}:</span> <span className=' py-3'>{value}</span> 
                    </>
                   }
                 </div>
               ))}
               </div>
            )
          } 
          {shop?.name && (
            <div className="mt-2 flex items-center">
              <span className="py-1 text-sm font-semibold capitalize text-heading ltr:mr-6 rtl:ml-6">
                {t('common:text-sellers')}
              </span>

              <button
                onClick={() => navigate(Routes.shop(shop?.slug))}
                className="text-sm tracking-wider text-accent underline transition hover:text-accent-hover hover:no-underline"
              >
                {shop?.name}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* <Element
        name="details"
        className="border-b border-border-200 border-opacity-70 px-5 py-4 lg:px-16 lg:py-14"
      >
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
          {t('text-details')}
        </h2>
        <p className="text-sm text-body">{description}</p>
      </Element> */}
    </article>
  );
};

export default Details;
