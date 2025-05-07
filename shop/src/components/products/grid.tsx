import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Button from '@/components/ui/button';
import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductCard from '@/components/products/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from "@/framework/client/variables";
import type { Product } from '@/types';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { useOffers } from '@/framework/offer';
import OfferCard from '@/components/products/cards/offer';
import { useRouter } from 'next/router';


interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: 'five' | 'auto';
  shopId?: string;
  gridClassName?: string;
  products: Product[] | undefined;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
  filterLoading:any;
  setFilterLoading:any;offers:any
}

export function Grid({
  className,
  gridClassName,
  products,
  isLoading,
  error,
  loadMore,
  isLoadingMore,
  hasMore,
  limit = PRODUCTS_PER_PAGE,
  column = 'auto',
  filterLoading,
  setFilterLoading,offers
}: Props) {
  const { t } = useTranslation('common');
  const [isAuthorize]=useAtom(authorizationAtom)
  const { query } = useRouter()
  const category = query.category as string;
  const group = query.group as string;
  const text = query.text as string
  const parent = query.parent as string


  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !products?.length) {
    return (
      <div className="w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }


  return (
    <div className={cn('w-full', className)}>
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
        {
         !isLoading && offers && !category && !group && !text && !parent && offers?.map((offer:any) => (
            offer.eligibleProducts.map((product:any) => (
              <OfferCard key={product.uuid} product={product} offers={offer} />
            ))))
        }
        {isLoading && !products?.length || filterLoading
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products?.map((product) => (
              <ProductCard product={product} key={product.id} />
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
interface ProductsGridProps {
  className?: string;
  gridClassName?: string;
  variables?: any;
  column?: 'five' | 'auto';
  filterLoading:any;
  setFilterLoading:any
}
export default function ProductsGrid({
  className,
  gridClassName,
  variables,
  column = 'auto',
  filterLoading,
  setFilterLoading
}: ProductsGridProps) {
  const pageSize = 2;
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts(10);
    const { offers } =
    useOffers(9999);

  const productsItem: any = products;

  return (
    <Grid
      products={productsItem}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      className={className}
      gridClassName={gridClassName}
      column={column}
      filterLoading={filterLoading}
      setFilterLoading={setFilterLoading}
      offers={offers}
    />
  );
}
