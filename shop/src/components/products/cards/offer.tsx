import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import { PlusIcon } from '@/components/icons/plus-icon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ImageLoader from '@/components/ui/loaders/imageLoader';
import { getImageURL } from '@/lib/image';

const AddToCart = dynamic(
  () =>
    import('@/components/products/add-to-cart/add-to-cart').then(
      (module) => module.AddToCart
    ),
  { ssr: false }
);

type OfferProps = {
  product: any;
  offers: any;
  className?: string;
};

const Offer: React.FC<OfferProps> = ({ product, className, offers }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const searchText = router.query.text as string;
  const filterCategory = router.query.category as string;
  const filteredProducts = searchText
    ? product?.name.toLowerCase().includes(searchText.toLowerCase())
    : filterCategory
    ? product?.category?.slug === filterCategory
    : product;

  const {
    unit,
    quantity,
    min_price,
    max_price,
    main_image,
    is_variant,
    uuid,
    name,
    image,
    product_prices,
    weight_in_grams,
    slug,
    has_variants,
    product_type,
  } = product ?? {};

  const isVariant = product?.product_type === 'variable' ? true : false;
  const variants_list = product?.variation_options;
  const first_variant = variants_list?.[0];

  const [imageLoading, setImageLoading] = useState(true);

  const { price, basePrice, discount } = usePrice({
    amount: isVariant ? first_variant?.sale_price : product?.sale_price,
    baseAmount: isVariant ? first_variant?.price : product?.price,
    currencyCode: 'INR',
  });

  const { price: minPrice } = usePrice({
    amount: min_price,
    currencyCode: 'INR',
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
    currencyCode: 'INR',
  });

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product);
  }

  // Extract offer details from the offer object
  const offer = offers; // Assuming you have only one offer for simplicity
  const offerTitle = offer?.offerTitle;
  const discountType = offer?.discountType;
  const buyQuantity = offer?.buyQuantity;
  const getQuantity = offer?.getQuantity;

  return (
    <article
      className={cn(
        'product-card cart-type-offer h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
        className
      )}
    >
      <div
        className="relative flex h-48 m-5 w-auto cursor-pointer items-center justify-center sm:h-48"
        onClick={handleProductQuickView}
      >
        <span className="sr-only">{t('text-product-image')}</span>
        {imageLoading && <ImageLoader />}
        <Image
          src={image ? getImageURL(image?.file) : productPlaceholder}
          alt={slug || ''}
          fill
          sizes="(max-width: 768px) 100vw"
          className="product-image object-contain"
          onLoad={() => setImageLoading(false)}
          style={{ opacity: imageLoading ? '0' : '1' }}
        />
      </div>

      {/* Offer Badge Section */}
      {offer && (
        <div className="absolute top-0 left-0 p-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-br-lg shadow-lg">
          <span>{discountType === 'Buy X Get Y' ? `Buy ${buyQuantity} Get ${getQuantity}` : `Buy ${buyQuantity} Get ${getQuantity} Free`}</span>
        </div>
      )}

      <header className="p-3 md:p-6">
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

        <div className="flex justify-between mb-4">
          <h3
            className="cursor-pointer truncate text-base font-semibold text-[#1F2937] leading-6 "
            onClick={handleProductQuickView}
          >
            {name}
          </h3>
          <p className="text-base font-semibold text-[#1F2937] leading-6 ">
            &#8377;{isVariant ? first_variant?.sale_price : product?.sale_price}
          </p>
        </div>

        {product_type.toLowerCase() === 'variable' ? (
          <>
            {Number(quantity) > 0 && (
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
            {Number(quantity) > 0 && (
              <AddToCart variant="neon" data={product} cartProduct={null} />
            )}
          </>
        )}

        {Number(quantity) <= 0 && (
          <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
            {t('text-out-quantity')}
          </div>
        )}
      </header>
    </article>
  );
};

export default Offer;
