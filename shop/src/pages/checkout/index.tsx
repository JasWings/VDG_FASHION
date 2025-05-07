import { useTranslation } from 'next-i18next';
import { billingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import OrderNote from '@/components/checkout/order-note';
export { getStaticProps } from '@/framework/general.ssr';
import { useCart } from '@/store/quick-cart/cart.context';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useGetAddress } from '@/framework/user';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid')
);
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false }
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
  // { ssr: false }
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, address, profile,phone_number  } = me ?? {};
  const {Cart}=useCart()
  const {openModal,closeModal}=useModalAction()
  const {data}=useGetAddress()
  const router =useRouter()


  // if(Cart.items.length===0){
  //    return <Spinner />
  // }
  
  
  
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <ContactGrid
              className="bg-light p-5 shadow-700 md:p-8"
              contact={phone_number}
              label={t('text-contact-number')}
              count={1}
            />

            <AddressGrid
              userId={id!}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-billing-address')}
              count={2}
              //@ts-ignore
              // addresses={data?.filter((i)=>i.address_type==="billing")}
              addresses={data?.filter(
                (item) => item?.address_type === AddressType.Billing
              )}
              //@ts-ignore
              atom={billingAddressAtom}
              type={AddressType.Billing}
            />
            <AddressGrid
              userId={id!}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-shipping-address')}
              count={3}
              //@ts-ignore
              addresses={data?.filter(
                (item) => item?.address_type === "shipping"
              )}
              //@ts-ignore
              atom={shippingAddressAtom}
              type={AddressType.Shipping}
            />
            {/* <ScheduleGrid
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={4}
            /> */}
            <OrderNote count={4} label={t('Order Note')} />
          </div>
          <div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
// CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
