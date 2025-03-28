import { CustomDisclosure } from '@/components/ui/disclosure';
import { useTranslation } from 'next-i18next';
import Search from '@/components/ui/search/search';
import { useRouter } from 'next/router';
import Sorting from '../search-view/sorting';
import PriceFilter from '@/components/search-view/price-filter';
import CategoryFilter from '@/components/search-view/category-filter-view';
import TagFilter from '@/components/search-view/tag-filter-view';
import ManufacturerFilter from '@/components/search-view/manufacturer-filter-view';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import ArrowNarrowLeft from '@/components/icons/arrow-narrow-left';
import { useIsRTL } from '@/lib/locals';
import Button from '@/components/ui/button';
import { useCategories } from '@/framework/category';
import dynamic from 'next/dynamic';

const isMobile = dynamic(() => import("react-device-detect").then((mod) => mod.isMobile), { ssr: false });


const FieldWrapper = ({ children, title, defaultOpen = true }: any) => (
  <div className="border-b border-gray-200 py-7 last:border-0">
    <CustomDisclosure title={title} defaultOpen={defaultOpen}>
      {children}
    </CustomDisclosure>
  </div>
);


function ClearFiltersButton() {
  const { t } = useTranslation('common');
  const router = useRouter();

  function clearFilters() {
    const {
      price,
      category,
      sortedBy,
      orderBy,
      group,
      tags,
      manufacturer,
      text,
      ...rest
    } = router.query;
    router.push({
      pathname: router.pathname,
      query: {
        ...rest,
        ...(router.route !== '/[searchType]/search' && { manufacturer }),
      },
    });
  }
  return (
    <button
      className="text-sm font-semibold text-body transition-colors hover:text-red-500 focus:text-red-500 focus:outline-0 lg:m-0"
      onClick={clearFilters}
    >
      {t('text-clear-all')}
    </button>
  );
}
const SidebarFilter: React.FC<{
  type?: string;
  showManufacturers?: boolean;
  className?: string;
  variables: any;
}> = ({ type, showManufacturers = true, className, variables }) => {
  const router = useRouter();
  const { group } = router.query;
  const { isRTL } = useIsRTL();
  const { t } = useTranslation('common');
  const [_, closeSidebar] = useAtom(drawerAtom);
  const { categories, isLoading, error } = useCategories({ type_id: group });

  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col rounded-xl border-gray-200 bg-white lg:h-auto lg:border',
        className
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-tl-xl rounded-tr-xl border-b border-gray-200 bg-white px-5 py-6 lg:static">
        <div className="flex items-center space-x-3 rtl:space-x-reverse lg:space-x-0">
          <button
            className="text-body focus:outline-0 hidden"
            onClick={() => closeSidebar({ display: false, view: '' })}
          >
            <ArrowNarrowLeft
              className={classNames('h-7', {
                'rotate-180': isRTL,
              })}
              strokeWidth={1.7}
            />
            <span className="sr-only">{t('text-close')}</span>
          </button>

          <h3 className="text-xl font-semibold text-heading lg:text-2xl">
            {t('text-filter')}
          </h3>
        </div>
      </div>

      <div className="flex-1 px-5">
        {/* Hiding Search in Mobile */}
        {/* <div className="hidden lg:block">
          <FieldWrapper title="text-search">
            <Search variant="minimal" label="search" />
          </FieldWrapper>
        </div> */}

        {/* Hiding Sorting in Mobile */}
        {router.route !== '/[searchType]/search' && (
          <div className="hidden lg:block">
            <FieldWrapper title="text-sort">
              <Sorting />
            </FieldWrapper>
          </div>
        )}

        <FieldWrapper title="text-categories" defaultOpen={!isMobile} >
          <CategoryFilter type={categories} />
        </FieldWrapper>

        {/* Hiding Price Filter in Mobile */}
        <div className="hidden lg:block">
          <FieldWrapper title="text-sort-by-price">
            <PriceFilter />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
};



export default SidebarFilter;
