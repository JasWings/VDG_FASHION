import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/forms/label';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import Input from '@/components/ui/forms/input';
import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import Alert from '@/components/ui/alert';
import isEmpty from 'lodash/isEmpty';
import { useUser } from '@/framework/user';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useCards } from '@/framework/card';
import StipeElementViewHeader from '../stripe-element-view-header';
import { useCart } from '@/store/quick-cart/cart.context';
import customCardIcon from "public/icons/card.png"
import customCvcIcon from './ccv.png';
import { ArrowRight } from '@/components/icons/arrow-right';
import Image from 'next/image';

interface Props {
  handleSubmit: any;
  type: 'checkout' | 'save_card';
  loading: boolean;
  changeSaveCard?: any;
  saveCard?: any;
  changeDefaultCard?: any;
  defaultCard?: any;
  cardError: any;
}

const StripeBaseForm: React.FC<Props> = ({
  handleSubmit,
  type = 'save_card',
  loading = false,
  changeSaveCard,
  saveCard,
  changeDefaultCard,
  defaultCard,
  cardError,
}) => {
  const { t } = useTranslation('common');
  const { isAuthorized ,me} = useUser();
  const { openModal, closeModal } = useModalAction();
  const {Cart}=useCart()
  // const { cards, isLoading, error } = useCards();
  const {
    data: { paymentGateway, paymentIntentInfo, trackingNumber },
  } = useModalState();


const customIconClasses = {
  base: 'custom-card-icon', // Custom class for the card icon
  complete: 'custom-card-icon', // Use the same class for complete state
  invalid: 'custom-card-icon', // Use the same class for invalid state
};
  const cardInputStyle = {
    
    base: {
      '::placeholder': {
        color: '#000000',
      },
      icon:'custom-card-icon'
    },
    iconClasses: {
      base: 'custom-card-icon',
      complete: 'custom-card-icon',
      invalid: 'custom-card-icon',
    },
  };

  const backModal = () => {
    openModal('PAYMENT_MODAL', {
      paymentGateway,
      paymentIntentInfo,
      trackingNumber,
    });
  };
  return (
    <div className="payment-modal relative h-full w-screen max-w-md overflow-hidden rounded-[10px] bg-light md:h-auto md:min-h-0 lg:max-w-[46rem]">      
      <div className="p-6 lg:p-12">
        {!isEmpty(cardError) ? (
          <Alert className="mb-4" message={cardError} variant="error" />
        ) : (
          ''
        )}
        <StipeElementViewHeader
          paymentIntentInfo={paymentIntentInfo}
          trackingNumber={trackingNumber}
          paymentGateway={paymentGateway}
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label>
              <span className="mb-2 block text-sm font-semibold text-black">
                EMAIL
              </span>
              <Input
                name="owner_name"
                placeholder={t('text-name')}
                value={me?.username}
                readOnly
                inputClassName="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300 focus:shadow-none"
              />
            </label>
          </div>
          <div>
            <Label className="mb-0 block">
              <span className="mb-2 flex flex-row justify-between text-sm font-semibold text-black">
                CARD NUMBER
                <Image 
                 src={"/icons/card.png"}
                 width={50}
                 height={10}
                 alt='ccv'
                />
              </span>
              <CardNumberElement
                options={{
                  showIcon: true,
                  style: cardInputStyle,
                  placeholder: "1234 1234 1234 1234",
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>
          </div>

          <div className="flex flex-wrap gap-5 lg:flex-nowrap">
            <Label className="mb-0 max-w-full basis-full lg:max-w-[50%] lg:basis-1/2">
              <span className="mb-[13px] block text-sm font-semibold text-black">
                EXPIRATION
              </span>
              <CardExpiryElement
                options={{
                  style: cardInputStyle,
                  placeholder: 'MM/YY',
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>

            <Label className="mb-0 max-w-full basis-full lg:max-w-[50%] lg:basis-1/2">
              <span className="mb-2 flex flex-row justify-between text-sm font-semibold text-black">
                CVV
                <Image 
                 src={"/icons/ccv.png"}
                 width={25}
                 height={10}
                 alt='ccv'
                />
              </span>
              <CardCvcElement
                options={{
                  ...cardInputStyle,
                  // icon: `url('/icons/ccv.png') 16px 10px`,
                  placeholder: "CVV",                  
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>
          </div>

          {/* {isAuthorized && type === 'checkout' && (
            <Checkbox
              name="save_card"
              label={t('text-save-card')}
              className="mt-3"
              onChange={changeSaveCard}
              checked={saveCard}
            />
          )} */}

          {/* {isAuthorized && type === 'save_card' && (
            <Checkbox
              name="make_default_card"
              label={t('text-add-default-card')}
              className="mt-3"
              onChange={changeDefaultCard}
              checked={defaultCard}
            />
          )} */}

          <div className=" space-x-4 lg:mt-4">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="StripePay px-12 text-sm shadow-none"
            >
              {/* {type === 'checkout' ? t('text-pay') : t('text-save')} */}
              Pay Now
              <ArrowRight className='w-[20px] h-4 pl-1'/>
            </Button>
            {/* {isAuthorized && type === 'checkout' && (
              <Button
                type="submit"
                variant="outline"
                disabled={!!loading}
                className="px-11 text-sm shadow-none"
                onClick={closeModal}
              >
                {t('pay-latter')}
              </Button>
            )} */}
            {/* {isAuthorized && cards?.length > 0 && type === 'checkout' && (
              <Button
                disabled={!!loading}
                variant="outline"
                className="cursor-pointer"
                onClick={backModal}
              >
                {t('text-back')}
              </Button>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripeBaseForm;
