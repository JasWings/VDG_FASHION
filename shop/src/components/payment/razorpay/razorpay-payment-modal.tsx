import { useCallback, useEffect } from 'react';
import useRazorpay, { RazorpayOptions } from '@/lib/use-razorpay';
import { formatAddress } from '@/lib/format-address';
import { PaymentGateway, PaymentIntentInfo } from '@/types';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useSettings } from '@/framework/settings';
import { useOrder, useOrderPayment } from '@/framework/order';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import client from '@/framework/client';
import { useRouter } from 'next/router';

interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
}

const RazorpayPaymentModal: React.FC<Props> = ({
  trackingNumber,
  paymentIntentInfo,
  paymentGateway,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const { loadRazorpayScript, checkScriptLoaded } = useRazorpay();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const { order, isLoading, refetch } = useOrder({
    tracking_number: trackingNumber,
  });
  const { createOrderPayment } = useOrderPayment();
  const router = useRouter()

  // @ts-ignore
  const { customer_name, customer_contact, customer, billing_address } =
    order ?? {};

  const paymentHandle = useCallback(async () => {
    if (!checkScriptLoaded()) {
      await loadRazorpayScript();
    }
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: paymentIntentInfo?.amount!,
      currency: paymentIntentInfo?.currency!,
      name: customer_name!,
      description: `${t('text-order')}#${trackingNumber}`,
      image: settings?.logo?.original!,
      order_id: paymentIntentInfo?.payment_id!,
      handler: async (response : any) => {
        console.log(response,"response")
        closeModal();

       const res= await client.orders.RefreshPayment(response.razorpay_payment_id,response)
       console.log(res,"res")
      //  router.push("/orders")
        createOrderPayment({
          tracking_number: trackingNumber!,
          payment_gateway: 'razorpay' as string,
        });
      },
      prefill: {
        ...(customer_name && { name: customer_name }),
        ...(customer_contact && { contact: `+${customer_contact}` }),
        ...(customer?.email && { email: customer?.email }),
      },
      notes: {
        address: formatAddress(billing_address as any),
      },
      modal: {
        ondismiss: async () => {
          closeModal();
          await refetch();
        },
      },
    };
    console.log(options,process.env,"list",process.env.NEXT_PUBLIC_REST_API_ENDPOINT,process.env.NEXT_PUBLIC_RAZORPAY_KEY)
    const razorpay = (window as any).Razorpay(options);
    return razorpay.open();
  }, [isLoading, isSettingsLoading]);

  useEffect(() => {
    if (!isLoading && !isSettingsLoading) {
      (async () => {
        await paymentHandle();
      })();
    }
  }, [isLoading, isSettingsLoading]);

  if (isLoading || isSettingsLoading) {
    return <Spinner showText={false} />;
  }

  return null;
};

export default RazorpayPaymentModal;
