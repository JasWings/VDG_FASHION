import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect, useState } from 'react';
import { useOrder } from '@/framework/order';
import { useRouter } from 'next/router';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import RazorpayPaymentModal from '@/components/payment/razorpay/razorpay-payment-modal';
import client from '@/framework/client';

export default function OrderPage() {
  const { query } = useRouter();
  const [isDone, setDone] = useState(true);
  const [paymentIntentInfo, setPaymentIntentInfo] =useState<any>(null);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number,
  });

  const { tracking_number } = query ?? {};

  useEffect(() => {
    const getPayment = async () => {
      try {
        const resp: any = await client.orders.makePayment(tracking_number);
        console.log(resp)
        if (resp) {
          setPaymentIntentInfo(resp?.data); // Store the payment intent info for the modal
          setPaymentModalVisible(true); // Trigger modal visibility
          setDone(false);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    };

    if (order?.order_status === 'initiated') {
      getPayment();
    } else {
      setDone(false);
    }
  }, [order?.order_status, tracking_number]);

  if (!tracking_number || isDone) {
    return <Spinner showText={false} />;
  }

  const infor = {
    payment_id : paymentIntentInfo?.orderId,
    is_redirect : true ,
    redirect_url : "/orders",
    currency : paymentIntentInfo?.currency,
    amount : "1",
    client_secret   : null      
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Order order={order} loadingStatus={!isLoading && isFetching && isDone} />

      {/* Conditionally Render Razorpay Modal */}
      {isPaymentModalVisible && paymentIntentInfo && (
        <RazorpayPaymentModal
          trackingNumber={tracking_number}
          paymentIntentInfo={ 
           infor
           }
          paymentGateway="razorpay"
        />
      )}
    </>
  );
}

OrderPage.getLayout = getLayout;
