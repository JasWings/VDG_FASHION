import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import StripePaymentModal from '@/components/payment/stripe/stripe-payment-modal';
import Modal from '@/components/ui/modal/modal';
import dynamic from 'next/dynamic';

const RazorpayPaymentModal = dynamic(
  () => import('@/components/payment/razorpay/razorpay-payment-modal'),
  { ssr: false }
);

const PAYMENTS_FORM_COMPONENTS: any = {
  STRIPE: {
    component: StripePaymentModal,
    type: 'default',
  }
};

const PaymentModal = () => {
  const {
    isOpen,
    data: { paymentGateway, paymentIntentInfo, trackingNumber,refresh_id},
  } = useModalState();
  const { closeModal } = useModalAction();
  const PaymentMethod = PAYMENTS_FORM_COMPONENTS["STRIPE"];
  const PaymentComponent = StripePaymentModal;
  const paymentModalType = 'custom'
  return paymentModalType === 'custom' ? (
    <Modal open={isOpen} onClose={closeModal}>
      <PaymentComponent
        paymentIntentInfo={paymentIntentInfo}
        trackingNumber={trackingNumber}
        paymentGateway={paymentGateway}
        refresh_id={refresh_id}
      />
    </Modal>
  ) : (
    <PaymentComponent
      paymentIntentInfo={paymentIntentInfo}
      trackingNumber={trackingNumber}
      paymentGateway={paymentGateway}
      refresh_id={refresh_id}
    />
  );
};

export default PaymentModal;
