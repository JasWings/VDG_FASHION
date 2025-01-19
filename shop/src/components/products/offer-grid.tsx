import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Button from '@/components/ui/button';
import ProductLoader from '../ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import OfferCard from '@/components/products/cards/offer';
import ErrorMessage from '@/components/ui/error-message';
import { useOffers } from '@/framework/offer';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';

interface OfferGridProps {
  className?: string;
  gridClassName?: string;
  limit?: number;
  column?: 'five' | 'auto';
  filterLoading: boolean;
  setFilterLoading: (value: boolean) => void;
}

export function OfferGrid({
  className,
  gridClassName,
  limit = PRODUCTS_PER_PAGE,
  column = 'auto',
  filterLoading,
  setFilterLoading
}: OfferGridProps) {
  const { t } = useTranslation('common');
  const [isAuthorize] = useAtom(authorizationAtom);

  const { offers, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useOffers(limit);

  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !offers?.length) {
    return (
      <div className="w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn( className)}>
      <div
        className={cn(
          {
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
          },
          gridClassName
        )}
      >
        {isLoading && !offers?.length || filterLoading
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`offer-${i}`} />
            ))
          : offers?.map((offer) => (
              offer.eligibleProducts.map((product) => (
                <OfferCard key={product.uuid} product={product} offers={offer} />
              ))
            ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="text-sm font-semibold h-11 md:text-base"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
}

interface OffersGridProps {
  className?: string;
  gridClassName?: string;
  filterLoading: boolean;
  setFilterLoading: (value: boolean) => void;
}

export default function OffersGrid({
  className,
  gridClassName,
  filterLoading,
  setFilterLoading
}: OffersGridProps) {
  return (
    <OfferGrid
      className={className}
      gridClassName={gridClassName}
      filterLoading={filterLoading}
      setFilterLoading={setFilterLoading}
    />
  );
}
