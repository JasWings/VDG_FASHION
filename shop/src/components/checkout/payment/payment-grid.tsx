import { RadioGroup } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useState } from 'react';
import Alert from '@/components/ui/alert';
import CashOnDelivery from '@/components/checkout/payment/cash-on-delivery';
import { useAtom } from 'jotai';
import { paymentGatewayAtom } from '@/store/checkout';
import cn from 'classnames';
import { useSettings } from '@/framework/settings';
import { PaymentGateway } from '@/types';
import PaymentOnline from '@/components/checkout/payment/payment-online';
import { RazorPayIcon } from '@/components/icons/payment-gateways/razorpay';
import axios from 'axios';
import client from '@/framework/client';

const PaymentGroupOption = ({ payment: { name, value, icon, }, theme, cart }) => (
  <RadioGroup.Option  value={value} key={value}>
    {({ checked  }) => (
      <div
        className={cn(
          'relative flex h-full w-full cursor-pointer items-center justify-center rounded border border-gray-200 bg-light p-3 text-center',
          checked ? checked : value === cart && '!border-accent bg-light shadow-600',
          {
            '!border-gray-800 bg-light shadow-600': theme === 'bw' && checked,
          }
        )}
      >
        {icon ? icon : <span className="text-xs font-semibold text-heading">{name}</span>}
      </div>
    )}
  </RadioGroup.Option>
);

const BACKEND_TO_FRONTEND = {
  cod: PaymentGateway.COD,
  online: PaymentGateway.RAZORPAY,
};

const FRONTEND_TO_BACKEND = {
  [PaymentGateway.COD]: 'cod',
  [PaymentGateway.RAZORPAY]: 'online',
};

const Methods = {
  "COD":"COD",
  "Online":"RAZORPAY"
}

const PaymentGrid = ({ className, theme, cart, refetchCart }:any) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [gateway, setGateway] = useState<any>( BACKEND_TO_FRONTEND[cart.payment_method]);
  const { t } = useTranslation('common');
  const { settings, isLoading } = useSettings();
  const [updating, setUpdating] = useState(false);

  const AVAILABLE_PAYMENT_METHODS_MAP = {
    [PaymentGateway.RAZORPAY]: {
      name: 'Razorpay',
      value: PaymentGateway.RAZORPAY,
      icon: <RazorPayIcon />,
      component: PaymentOnline,
    },
    [PaymentGateway.COD]: {
      name: 'Cash on Delivery',
      value: PaymentGateway.COD,
      icon: null,
      component: CashOnDelivery,
    },
  };
   
  // Initialize gateway from cart.paymentMethod backend string (like "cod", "online")
  useEffect(() => {
    if (cart?.payment_method) {
      const frontendMethod = FRONTEND_TO_BACKEND[cart.payment_method.toLowerCase()];
      
      setGateway(frontendMethod);
    }
  }, []);

  // Handle payment method change
  const onChangePayment = async (value) => {
    setGateway(value);
    setUpdating(true);
    setErrorMessage(null);

    try {
      // Map frontend value to backend string
      const backendValue = FRONTEND_TO_BACKEND[value];
      const data = { payment_method: backendValue }
      await client.cart.updatePayment(data)
      if (typeof refetchCart === 'function') {
        await refetchCart();
      }
    } catch (error) {
      setErrorMessage('error-updating-payment-method');
      // revert gateway to previous value from cart if error
      if (cart?.paymentMethod) {
        const frontendMethod = BACKEND_TO_FRONTEND[cart.paymentMethod.toLowerCase()];
        setGateway(frontendMethod || PaymentGateway.COD);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={className}>
      {errorMessage && (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      )}

      <RadioGroup value={gateway} onChange={onChangePayment} disabled={updating}>
        <RadioGroup.Label className="mb-5 block text-base font-semibold text-heading">
          {t('text-choose-payment')}
        </RadioGroup.Label>

        <div className="mb-8 grid grid-cols-2 gap-4">
          {Object.values(AVAILABLE_PAYMENT_METHODS_MAP).map((payment) => (
            <Fragment key={payment.value} >
              <PaymentGroupOption theme={theme} payment={payment} cart={cart.payment_method} />
            </Fragment>
          ))}
        </div>
      </RadioGroup>

      {updating && <p className="text-sm text-gray-500">Updating payment method...</p>}
    </div>
  );
};

export default PaymentGrid;
