import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import Button from '@/components/ui/button';
import NotFound from '@/components/ui/not-found';
import dynamic from 'next/dynamic';
import ProductsOfferGrid from '@/components/products/offerGrid';



const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);



const OffersPage: NextPageWithLayout = () => {

  if (false) {
    return (
      <div className="min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8">
        <NotFound text="text-no-coupon" />
      </div>
    );
  }

  return (
    <>
      <Seo title="Offers" url="offers" />
      <ProductsOfferGrid className='p-5' />
      <CartCounterButton />
    </>
  );
};

OffersPage.getLayout = getLayout;

export default OffersPage;

