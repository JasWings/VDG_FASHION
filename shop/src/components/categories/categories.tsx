import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useCategories } from '@/framework/category';
import { useRouter } from 'next/router';

const StickySidebarListCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-list-categories')
);
const StaticSidebarVerticalRectangleCategories = dynamic(
  () => import('@/components/categories/sliding-vertical-rectangle-categories')
);
const StickySidebarBoxedCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-boxed-categories')
);
const FilterCategoryGrid = dynamic(
  () => import('@/components/categories/filter-category-grid')
);
const SlidingCardCategories = dynamic(
  () => import('@/components/categories/sliding-card-category')
);
const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarBoxedCategories,
  standard: StaticSidebarVerticalRectangleCategories,
  minimal: FilterCategoryGrid,
  compact: SlidingCardCategories,
  default: StickySidebarListCategories,
};
interface CategoriesProps {
  layout: string;
  variables: any;
  className?: string;
  filterLoading:any;
  setFilterLoading:any
}
export default function Categories({
  layout,
  className,
  variables,
  filterLoading,
  setFilterLoading
}: CategoriesProps) {
  const { query } = useRouter()
  const type_id = query.group as string
  const { categories, isLoading, error } = useCategories({...variables,type_id});
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_CATEGORY_TO_GROUP[layout];
  
  return (
    <Component
      notFound={!Boolean(categories.length)}
      categories={categories}
      loading={isLoading}
      className={className}
      variables={variables}
      filterLoading={filterLoading}
      setFilterLoading={setFilterLoading}
    />
  );
}
