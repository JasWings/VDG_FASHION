import Banner from '@/components/banners/banner';
import PromotionSliders from '@/components/promotions/promotions';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
import FilterBar from './filter-bar';
import ProductGridHome from '@/components/products/grids/home';
import type { HomePageProps } from '@/types';
import { useState, useEffect } from 'react';
import SidebarFilter from './filter-bar2';
import StickyBox from 'react-sticky-box';
import OffersGrid from '../products/offer-grid';

export default function ClassicLayout({ variables }: HomePageProps) {
  const [filterLoading, setFilterLoading] = useState(false);

  const checkConditionAndReload = () => {
    if (filterLoading) {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    if (filterLoading) {
      const intervalId = setInterval(checkConditionAndReload, 3100);
      return () => clearInterval(intervalId);
    }
  }, [filterLoading]);

  return (
    <>
      <Banner layout="compact" variables={variables.types} />
      {/* <PromotionSliders variables={variables.types} /> */}
      {/* <FilterBar variables={variables.categories} /> */}
      <Categories
        layout="standard"
        variables={variables.categories}
        filterLoading={filterLoading}
        setFilterLoading={setFilterLoading}
      />
      <Element
        name="grid"
        className="flex flex-col lg:flex-row border-t border-solid border-border-200 border-opacity-70"
      >
        {/* Sidebar Filter for Mobile (Top) */}
        <div className="block lg:hidden w-full">
          <SidebarFilter variables={variables.categories} />
        </div>

        {/* Sidebar Filter for Desktop (Side) */}
        <div className="hidden lg:block w-80 shrink-0 pt-6">
          <StickyBox offsetTop={140} offsetBottom={30}>
            <SidebarFilter variables={variables.categories} />
          </StickyBox>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <ProductGridHome
            className="px-4 pb-8 lg:p-8"
            variables={variables.products}
            filterLoading={filterLoading}
            setFilterLoading={setFilterLoading}
          />
        </div>
      </Element>
    </>
  );
}
