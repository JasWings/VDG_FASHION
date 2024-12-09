import { PaymentGateway, PaymentIntentInfo } from '@/types';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/lib/get-stripejs';
import StripePaymentForm from '@/components/payment/stripe/stripe-payment-form';
import SavedCardViewHeader from '@/components/payment/saved-card-view-header';
import StripeSavedCardsList from '@/components/payment/stripe/stripe-saved-cards-list';
import { useCards } from '@/framework/card';
import React from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { StripeElementsOptions } from '@stripe/stripe-js';

interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
  refresh_id:any
}

const StripePaymentModal: React.FC<Props> = ({
  paymentIntentInfo,
  trackingNumber,
  paymentGateway,
  refresh_id
}) => {
  // const { cards, isLoading, error } = useCards();

  if (!trackingNumber) {
    return (
      <div className="h-96 w-screen max-w-md rounded-xl bg-white p-12 lg:w-full lg:min-w-[48rem]">
        <Spinner className="!h-full" showText={false} />
      </div>
    );
  }
  const clientSecret = paymentIntentInfo?.client_secret;

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  // if (error) return <ErrorMessage message={error.message} />;
  return (
    <Elements options={options} stripe={getStripe()}>
      {false? (
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 md:p-12">
          <SavedCardViewHeader
            paymentIntentInfo={paymentIntentInfo}
            trackingNumber={trackingNumber}
            paymentGateway={paymentGateway}
          />
          {/* <StripeSavedCardsList view="modal" payments={[]} /> */}
        </div>
      ) : (
        <StripePaymentForm
          paymentIntentInfo={paymentIntentInfo}
          trackingNumber={trackingNumber}
          paymentGateway={paymentGateway}
          refresh_id={refresh_id}
        />
      )}
    </Elements>
  );
};

export default StripePaymentModal;
