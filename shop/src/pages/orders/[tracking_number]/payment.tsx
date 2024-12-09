import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect,useState } from 'react';
import { PaymentStatus } from '@/types';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder } from '@/framework/order';
import { useRouter } from 'next/router';
import { useModalAction } from '@/components/ui/modal/modal.context';
import client from '@/framework/client';

// export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { openModal } = useModalAction();
  const { query } = useRouter();
  const [isDone,setDone]=useState(true)

  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number,
  });
  // @ts-ignore
  const { payment_status, payment_intent, tracking_number } = query ?? {};
  const isPaymentModalEnabled = true;

  useEffect(()=>{
    const getPayment=async()=>{
      try {
        const resp:any=await client.orders.makePayment(tracking_number) 
        if(resp){
          {openModal("PAYMENT_MODAL",{paymentGateway:"stripe",paymentIntentInfo:resp?.data,trackingNumber:resp?.data.payment_id,refresh_id:tracking_number})}
          setDone(false)
        } 
      } catch (error) {
        console.log(error,"error")
      }
    }
    if(order?.status==="initiated"){
      getPayment()
    }else{
      setDone(false)
    }
  })
  if (!tracking_number || isDone) {
    return <Spinner showText={false} />;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Order order={order} loadingStatus={!isLoading && isFetching && isDone} />
    </>
  );
}

OrderPage.getLayout = getLayout;
// const Shop=()=>{
//   return(
//     <div>
//       <h1>Page</h1>
//     </div>
//   )
// }
// export default Shop