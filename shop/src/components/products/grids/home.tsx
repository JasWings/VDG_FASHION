import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
  filterLoading:any;
  setFilterLoading:any
}
export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
  filterLoading,
  setFilterLoading
}: Props) {
  const { query } = useRouter();
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts(30);
  const productsItem:any = products;

  return (
    <Grid
      products={productsItem}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={PRODUCTS_PER_PAGE}
      className={className}
      gridClassName={gridClassName}
      column={column}
      filterLoading={filterLoading}
      setFilterLoading={setFilterLoading}
    />
  );
}