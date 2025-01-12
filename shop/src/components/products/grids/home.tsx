import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
  filterLoading: any;
  setFilterLoading: any;
}

export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
  filterLoading,
  setFilterLoading,
}: Props) {
  const { query } = useRouter();
  
  // Extract category and group from query params
  const category = query.category as string;
  const group = query.group as string;
  const price = query.price as string;
  const sortedBy = query.sortedBy as string
  const orderBy = query.orderBy as string

  // Pass category and group as parameters to the useProducts hook
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts(30, category, group,price,orderBy,sortedBy);
  
  return (
    <Grid
      products={products}
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
