import usePrice from '@/lib/use-price';
import { formatAddress } from '@/lib/format-address';
import { useTranslation } from 'next-i18next';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { Eye } from '@/components/icons/eye-icon';
import { OrderItems } from './order-items';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { SadFaceIcon } from '@/components/icons/sad-face';
import Badge from '@/components/ui/badge';
import type { Order } from '@/types';
import OrderViewHeader from './order-view-header';
import OrderStatusProgressBox from '@/components/orders/order-status-progress-box';
import { OrderStatus, PaymentStatus } from '@/types';
import Button from '../ui/button';

interface Props {
  order: Order;
  loadingStatus?: boolean;
}

const RenderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useTranslation('common');

  switch (status.toLowerCase()) {
    case 'approved':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-approved')}`}
          color="bg-accent"
          className="ltr:mr-4 rtl:ml-4"
        />
      );

    case 'rejected':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-rejected')}`}
          color="bg-red-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    case 'processing':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-processing')}`}
          color="bg-yellow-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    case 'pending':
    default:
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-pending')}`}
          color="bg-purple-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
  }
};

function RefundView({
  status,
  orderId,
}: {
  status: string;
  orderId: string | number;
}) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <>
      {status ? (
        <RenderStatusBadge status={status} />
      ) : (
        <button
          className="flex items-center text-sm font-semibold text-body transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400 ltr:mr-4 rtl:ml-4"
          onClick={() => openModal('REFUND_REQUEST', orderId)}
          disabled={Boolean(status)}
        >
          <SadFaceIcon width={18} className="ltr:mr-2 rtl:ml-2" />
          {t('text-ask-refund')}
        </button>
      )}
    </>
  );
}

const OrderDetails = ({ order, loadingStatus }: Props) => {
  const { t } = useTranslation('common');
  const {openModal}=useModalAction()
  const {
    id,
    products,
    status,
    tracking_number,
    refund,
  }: any = order ?? {};
  const {    shipping_address,
    billing_address,price_details,items}:any=order.data
  
  const { price: amount } = usePrice({
    amount: price_details?.total_actual_price,
  });
  const { price: discount } = usePrice({
    amount: order?.discount ?? 0,
  });
  const { price: total } = usePrice({
    amount: price_details?.total_actual_price,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee ?? 0,
  });
  const { price: sales_tax } = usePrice({
    amount: order?.sales_tax,
  });

  const handleCancelOrder=(order:any)=>{
        openModal("CANCEL_ORDER",order)  
  }
    
  return (
    <div className="flex w-full flex-col border border-border-200 bg-white lg:w-2/3">
      <div className="flex flex-col items-center p-5 md:flex-row md:justify-between">
        <h2 className="mb-2 flex text-sm font-semibold text-heading md:text-lg">
          Order Details
          {/* <span className="px-2">-</span>{' '} */}
          {tracking_number}
        </h2>
        {
          order?.status==="initiated"&&(
            <button className=' rounded-lg px-2 py-2 text-white hover:text-yellow-50 hover:bg-red-500 bg-red-600' onClick={()=>handleCancelOrder(order)}>
              Cancel Order
            </button>
          )
        }
        {/* {order?.status!=="initiated"&&<h1 className=' mb-2 text-lg font-semibold  text-green-600 bg-light'>Payment Successfully!</h1>} */}
        {/* <div className="flex items-center">
          {order?.payment_gateway !== 'CASH_ON_DELIVERY' && (
            <RefundView status={refund?.status} orderId={id} />
          )}
          <Link
            href={Routes.order(tracking_number)}
            className="flex items-center text-sm font-semibold text-accent no-underline transition duration-200 hover:text-accent-hover focus:text-accent-hover"
          >
            <Eye width={20} className="ltr:mr-2 rtl:ml-2" />
            {t('text-sub-orders')}
          </Link>
        </div> */}
      </div>
      <div className="relative sm:m-0 md:mx-5 md:mb-6 overflow-hidden rounded">
        <OrderViewHeader
          order={order}
          wrapperClassName="px-7 py-4"
          buttonSize="small"
          loading={loadingStatus}
        />
      </div>
      {order?.status!=="initiated"&&<div className=' flex flex-row p-[10px] gap-2 md:gap-0 items-center md:p-[20px] border-b border-border-200 border-t '>
      <span className="mb-2 block text-xs md:text-lg sm:font-normal font-normal  md:font-semibold xs:text-base  lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
        Payment Id :
      </span>
      <span className="mb-2 block text-xs xs:text-base lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
         {order?.completed_payment?.payment_id}
      </span>
      </div>
      }
      <div className="flex flex-col border-b border-border-200 sm:flex-row">
        <div className="flex w-full flex-col border-b border-border-200 px-5 py-4 sm:border-b-0 ltr:sm:border-r rtl:sm:border-l md:w-3/5">
          <div className="mb-4">
            <span className="mb-2 block text-sm font-bold text-heading">
              {t('text-shipping-address')}
            </span>

            <span className="text-sm text-body">
              {formatAddress(shipping_address)}
            </span>
          </div>

          <div>
            <span className="mb-2 block text-sm font-bold text-heading">
              {t('text-billing-address')}
            </span>

            <span className="text-sm text-body">
              {formatAddress(billing_address)}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col px-5 py-4 md:w-2/5">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{t('text-sub-total')}</span>
            <span className="text-sm text-heading">{order?.data?.country?.currency_symbol+order?.total_price}</span>
          </div>

          {/* <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{t('text-discount')}</span>
            <span className="text-sm text-heading">{discount}</span>
          </div> */}

          {/* <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{t('text-delivery-fee')}</span>
            <span className="text-sm text-heading">{delivery_fee}</span>
          </div> */}
          {/* <div className="mb-3 flex justify-between">
            <span className="text-sm text-body">{t('text-tax')}</span>
            <span className="text-sm text-heading">{sales_tax}</span>
          </div> */}

          <div className="flex justify-between">
            <span className="text-sm font-bold text-heading">
              {t('text-total')}
            </span>
            <span className="text-sm font-bold text-heading">{order?.data?.country?.currency_symbol+order?.total_price}</span>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div>
        <div className="flex w-full items-center justify-center px-6">
          {
           order?.status!=="cancelled"&&<OrderStatusProgressBox
            orderStatus={order?.status as OrderStatus}
            paymentStatus={order?.payment_status as PaymentStatus}
            />
          }
        </div>
        <OrderItems products={order} orderId={id} />
      </div>
    </div>
  );
};

export default OrderDetails;
