import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect, useState } from 'react';
import { PaymentStatus } from '@/types';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder } from '@/framework/order';
import { useRouter } from 'next/router';
import { useModalAction } from '@/components/ui/modal/modal.context';
import client from '@/framework/client';
import Header from '@/components/layouts/header';

// export { getServerSideProps } from '@/framework/order.ssr';

export default function PayementPage() {
  const { openModal } = useModalAction();
  const { query } = useRouter();
  const [isDone,setDone]=useState(true)

  // @ts-ignore
  const { uuid} = query ?? {};
  const isPaymentModalEnabled = true;
  useEffect(() => {
    const fetchPayment=async()=>{
        const resp:any=await client.orders.makePayment(uuid)
        if(resp){
          setDone(false)
          {openModal("PAYMENT_MODAL",{paymentGateway:"stripe",paymentIntentInfo:resp?.data,trackingNumber:resp?.data.payment_id})}
        }
    }
    fetchPayment()
  }, []);

   if (isDone) {
     return <Spinner showText={false} />;
   }

  return (
    <>
    <Header></Header>
      <Seo noindex={true} nofollow={true} />
      {/* <Order order={null} loadingStatus={true} /> */}
    </>
  );
}

// PayementPage.getLayout = getLayout;


