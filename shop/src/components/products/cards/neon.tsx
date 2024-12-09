import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
//  import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import { PlusIcon } from '@/components/icons/plus-icon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useCountry } from '@/store/country/country.context';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ImageLoader from '@/components/ui/loaders/imageLoader';

const AddToCart = dynamic(
  () =>
    import('@/components/products/add-to-cart/add-to-cart').then(
      (module) => module.AddToCart
    ),
  { ssr: false }
);

type NeonProps = {
  product: any;
  className?: string;
};

const Neon: React.FC<NeonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const router=useRouter()
  const {selectedCountry}=useCountry()
  const searchText=router.query.text as String
  const filterCategory=router.query.category as String
  const filteredProducts=searchText ?product?.identity.toLowerCase().includes(searchText.toLowerCase()):filterCategory?product?.category?.slug===filterCategory:product
  const { image, unit, stock, min_price, max_price, main_image ,is_variant ,uuid,identity,thumb_image,product_prices ,weight_in_grams ,slug ,has_variants } =
    product ?? {};
  const [VariantProducts,setVariantProducts]=useState([])
  const [imageLoading,setImageLoading]=useState(true)

  const findPriceIndex=()=>{
    let countryIndex: number | undefined
    const PriceIndex=  product_prices.map((list,index)=>{
        if(list.country===selectedCountry.id ){
           return countryIndex=index
        }
    })
  return countryIndex
}

  const [isAuthorize]=useAtom(authorizationAtom)
  const { price, basePrice, discount } = usePrice({
    amount: product_prices&&product_prices[0]&&product_prices[0].actual_price ? product_prices[findPriceIndex()]?.current_price : product.product_prices!,
    baseAmount: product_prices&&product_prices[0]&&product_prices[findPriceIndex()]?.actual_price,currencyCode:"USD"
  });
  
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });
  const { openModal } = useModalAction();
  
  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product);
  } 

  if(selectedCountry===undefined){
    return <Spinner />
  }



  return (
    <>
    {
      router.query.category==="all"||!router.query.category&&!router.query.text?
      <>
        {!is_variant&&
          <article
            className={cn(
              'product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
              className
            )}
          >
            <div
              className="relative flex h-48 m-5 w-auto cursor-pointer items-center justify-center sm:h-48"
              onClick={handleProductQuickView}
            >
              <span className="sr-only">{t('text-product-image')}</span>
              {
                imageLoading&&<ImageLoader />
              }
              <Image
                src={thumb_image?"https://api.slrexports.com"+thumb_image?.file : productPlaceholder}
                alt={slug||""}
                fill
                sizes="(max-width: 768px) 100vw"
                className="product-image object-contain"
                onLoad={()=>setImageLoading(false)}
                style={{opacity:imageLoading?"0":"1"}}
              />
              {discount &&!imageLoading&& (
                <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
                  {discount}
                </div>
              )}
            </div>
            {/* End of product image */}
      
             <header className="p-3 md:p-6">
               {product_prices&&product_prices[0]?( 
                <div className="mb-2">
                  <span className="text-sm font-semibold text-heading md:text-base">
                    {minPrice}
                  </span>
                  {/* <span> - </span> */}
                  <span className="text-sm font-semibold text-heading md:text-base">
                    {maxPrice}
                  </span>
                </div>
              ) : (
                <div className="mb-2 flex items-center">
                  <span className="text-sm font-semibold text-heading md:text-base">
                    {price}
                  </span>
                  {basePrice && (
                    <del className="text-xs text-muted ltr:ml-2 rtl:mr-2 md:text-sm">
                      {basePrice}
                    </del>
                  )}
                </div>
              )}
              {/* End of product price */}
              <div className=' flex justify-between'>
              <h3
                className="cursor-pointer truncate text-base font-semibold text-[#1F2937] leading-6 "
                onClick={handleProductQuickView}
              >
                {identity}
              </h3>
              {product_prices&&product_prices[0]&&<p className="text-base font-semibold text-[#1F2937] leading-6 ">{product_prices[findPriceIndex()]?.product_country?.currency_symbol}{product_prices[findPriceIndex()]?.current_price}</p>}
              </div>
              <div className=' mb-4'>
              <span className=' text-[#6B7280] font-normal text-sm leading-5'>{weight_in_grams}gm</span>
              </div>
              {/* End of product title */}
      
              {false ? (
                <>
                  {Number(stock) > 0 || Number(stock)===0 && (
                    <button
                      onClick={handleProductQuickView}
                      className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 md:h-9 md:text-sm"
                    >
                      <span className="flex-1">{t('text-add')}</span>
                      <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
                        <PlusIcon className="h-4 w-4 stroke-2" />
                      </span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  {Number(stock) > 0 && (
                      isAuthorize
                      ?
                      <AddToCart variant="neon" data={product} cartProduct={null}  />
                      :
                      <AddToCart variant="neon" data={product} cartProduct={null} />
                  )}
                </>
              )}
      
              {Number(stock) <= 0 && (
                <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
                  {t('text-out-stock')}
                </div>
              )}
              {/* End of add to cart */}
            </header> 
          </article>
          }      
      </>
      :
      <>
      {
        router.query.category? product?.category?.slug===router.query.category &&
        // product?.category&&product.category.slug===router.query.category&&
        <>
          {!is_variant&&
            <article
              className={cn(
                'product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
                className
              )}
            >
              <div
                className="relative flex h-48 m-5 mr-5 w-auto cursor-pointer items-center justify-center sm:h-64"
                onClick={handleProductQuickView}
              >
                <span className="sr-only">{t('text-product-image')}</span>
                {
                imageLoading&&<ImageLoader />
                }
                <Image
                  src={thumb_image?"https://api.slrexports.com"+thumb_image?.file : productPlaceholder}
                  alt={identity}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="product-image object-contain"
                  onLoad={()=>setImageLoading(false)}
                  style={{opacity:imageLoading?"0":"1"}}
                />
                {discount && (
                  <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
                    {discount}
                  </div>
                )}
              </div>
              {/* End of product image */}
        
               <header className="p-3 md:p-6">
                {/* End of product price */}
                <div className=' flex justify-between'>
                <h3
                  className="cursor-pointer truncate text-base font-semibold text-[#1F2937] leading-6 "
                  onClick={handleProductQuickView}
                >
                  {identity}
                </h3>
                {product_prices&&product_prices[0]&&<p className="text-base font-semibold text-[#1F2937] leading-6 ">{product_prices[findPriceIndex()].product_country?.currency_symbol}{product_prices[findPriceIndex()].current_price}</p>}
                </div>
                <div className=' mb-4'>
                <span className=' text-[#6B7280] font-normal text-sm leading-5'>{weight_in_grams}gm</span>
                </div>
                {/* End of product title */}
        
                {false ? (
                  <>
                    {Number(stock) > 0 && (
                      <button
                        onClick={handleProductQuickView}
                        className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 md:h-9 md:text-sm"
                      >
                        <span className="flex-1">{t('text-add')}</span>
                        <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
                          <PlusIcon className="h-4 w-4 stroke-2" />
                        </span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {Number(stock) > 0 && (
                      isAuthorize
                      ?
                      <AddToCart variant="neon" data={product} cartProduct={null}  />
                      :
                      <AddToCart variant="neon" data={product} cartProduct={null} />
                  )}
                  </>
                )}
        
                {Number(stock) <= 0 && (
                  <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
                    {t('text-out-stock')}
                  </div>
                )}
                {/* End of add to cart */}
              </header> 
            </article>
            }
      </>
      : product?.identity.toLowerCase().includes(searchText.toLowerCase())&&
      <>
      {!is_variant&&
        <article
          className={cn(
            'product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
            className
          )}
        >
          <div
            className="relative flex h-48 m-5 mr-5 w-auto cursor-pointer items-center justify-center sm:h-64"
            onClick={handleProductQuickView}
          >
            <span className="sr-only">{t('text-product-image')}</span>
            {
                imageLoading&&<ImageLoader />
            }
            <Image
              src={thumb_image?"https://api.slrexports.com"+thumb_image?.file : productPlaceholder}
              alt={identity}
              fill
              sizes="(max-width: 768px) 100vw"
              className="product-image object-contain"
              onLoad={()=>setImageLoading(false)}
              style={{opacity:imageLoading?"0":"1"}}
            />
            {discount && (
              <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
                {discount}
              </div>
            )}
          </div>
          {/* End of product image */}
    
           <header className="p-3 md:p-6">
            {/* End of product price */}
            <div className=' flex justify-between'>
            <h3
              className="cursor-pointer truncate text-base font-semibold text-[#1F2937] leading-6"
              onClick={handleProductQuickView}
            >
              {identity}
            </h3>
            {product_prices&&product_prices[0]&&<p className="text-base font-semibold text-[#1F2937] leading-6">{product_prices[findPriceIndex()].product_country?.currency_symbol}{product_prices[findPriceIndex()].current_price}</p>}
            </div>
            <div className=' mb-4'>
            <span className=' text-[#6B7280] font-normal text-sm leading-5'>{weight_in_grams}gm</span>
            </div>
            {/* End of product title */}
    
            {false ? (
              <>
                {Number(stock) > 0 && (
                  <button
                    onClick={handleProductQuickView}
                    className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 md:h-9 md:text-sm"
                  >
                    <span className="flex-1">{t('text-add')}</span>
                    <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
                      <PlusIcon className="h-4 w-4 stroke-2" />
                    </span>
                  </button>
                )}
              </>
            ) : (
              <>
                {Number(stock) > 0 && (
                  isAuthorize
                  ?
                  <AddToCart variant="neon" data={product} cartProduct={null}  />
                  :
                  <AddToCart variant="neon" data={product} cartProduct={null} />
              )}
              </>
            )}
    
            {Number(stock) <= 0 && (
              <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
                {t('text-out-stock')}
              </div>
            )}
            {/* End of add to cart */}
          </header> 
        </article>
        }
  </>

}
      </>
    }
       </>
  );
};

export default Neon;
