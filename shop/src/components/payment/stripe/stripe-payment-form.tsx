import { useTranslation } from 'next-i18next';
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useOrderPayment, useSavePaymentMethod } from '@/framework/order';
import { toast } from 'react-toastify';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { PaymentGateway, PaymentIntentInfo } from '@/types';
import StripeBaseForm from '@/components/payment/stripe/stripe-base-form';
import getStripe from '@/lib/get-stripejs';
import StripeElementForm from '@/components/payment/stripe/stripe-element-base-form';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import client from '@/framework/client';
interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
  refresh_id:any
}

const PaymentForm: React.FC<Props> = ({
  paymentIntentInfo,
  trackingNumber,
  paymentGateway,
  refresh_id
}) => {
  const { t } = useTranslation('common');
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const { closeModal } = useModalAction();
  const { createOrderPayment } = useOrderPayment();
  const { savePaymentMethod } = useSavePaymentMethod();
  const [cardError, setCardError] = useState('');
  const router=useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement)!;
    setLoading(true);
      const confirmCardPayment = await stripe.confirmCardPayment(
        paymentIntentInfo?.clientSecret!,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      // router.push("/orders")
      // Send card response to the api
      // await createOrderPayment({
      //   tracking_number: trackingNumber,
      //   payment_gateway: 'stripe' as string,
      // });
      const response:any=await client.orders.RefreshPayment(refresh_id)
      if (confirmCardPayment?.paymentIntent?.status === 'succeeded') {
        //@ts-ignore
        toast.success(t('payment-successful'));
        if(router.pathname==="/orders"){
          window.location.reload()
        }
        router.push("/orders")
        // window.location.reload()
        setLoading(false);
        closeModal();
      } else {
        setCardError(confirmCardPayment?.error?.message as string);
        setLoading(false);
      }
  };

  // function changeSaveCard() {
  //   setSaveCard(!saveCard);
  // }
  return (
    <StripeBaseForm
      handleSubmit={handleSubmit}
      type={'checkout'}
      loading={loading}
      cardError={cardError}
      // changeSaveCard={changeSaveCard}
      saveCard={saveCard}
    />
  );
};

const StripePaymentForm: React.FC<Props> = ({
  paymentGateway,
  paymentIntentInfo,
  trackingNumber,
  refresh_id
}) => {
  let onlyCard = false; 

  const clientSecret = paymentIntentInfo?.client_secret;

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",

    }
  };

  return (
    <>
      <Elements options={options} stripe={getStripe()}>
        <PaymentForm
          paymentIntentInfo={paymentIntentInfo}
          trackingNumber={trackingNumber}
          paymentGateway={paymentGateway}
          refresh_id={refresh_id}
        />
      </Elements>
    </>
  );
};

export default StripePaymentForm;