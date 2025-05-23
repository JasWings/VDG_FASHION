import usePrice from '@/lib/use-price';
import dayjs from 'dayjs';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import StatusColor from './status-color';

type OrderCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ onClick, order, isActive }) => {
  const { t } = useTranslation('common');
  const {  status, order_status, created, delivery_time ,items,status_history} = order;

  const { price: amount } = usePrice({
    amount: order?.total_price,
    currencyCode: "INR"
  });
  const { price: total } = usePrice({
    amount: order?.total_price,
    currencyCode: "INR"
  });


  
  return (
    <>
    {/* {
      order.map((item:any)=>( */}
        <div
        onClick={onClick}
        role="button"
        className={cn(
          'mb-4 flex w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded border-2 border-transparent bg-gray-100 last:mb-0',
          isActive === true && '!border-accent'
        )}
      >
        <div className="flex items-center justify-between border-b border-border-200 py-3 px-5 md:px-3 lg:px-5 ">
          <span className="flex shrink-0 text-sm font-bold text-heading ltr:mr-4 rtl:ml-4 lg:text-base">
            {t('text-order')}
            <span className="font-normal">#{order.id}</span>
          </span>
          <span
            // className="max-w-full truncate whitespace-nowrap rounded bg-blue-100 px-3 py-2 text-sm text-blue-500"
            className={`max-w-full truncate whitespace-nowrap rounded ${StatusColor(
              order?.order_status
            )} px-3 py-2 text-sm`}
            title={order_status}
          >
            {order_status==="initiated"? "order pending":
            order_status==="placed"?"order processing":
            order_status==="shipped"?"order shipped":
            order_status==="cancelled"?"order cancelled":
            order_status==="delivered"&&"order delivered"
            }
          </span>
        </div>
  
        <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
          <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
            <span className="w-24 shrink-0 overflow-hidden">
              {t('text-order-date')}
            </span>
            <span className="ltr:mr-auto rtl:ml-auto">:</span>
            <span className="ltr:ml-1 rtl:mr-1">
              {dayjs(created).format('MMMM D, YYYY')}
            </span>
          </p>
          <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
            <span className="w-24 shrink-0 overflow-hidden">
              {t('text-deliver-time')}
            </span>
            <span className="ltr:mr-auto rtl:ml-auto">:</span>
            <span className="truncate ltr:ml-1 rtl:mr-1">
           {status_history[status_history?.length-1]?.status==="initiated"? "order pending":
            status_history[status_history?.length-1]?.status==="placed"?"order processing":
            status_history[status_history?.length-1]?.status==="shipped"?"order shipped":
            status_history[status_history?.length-1]?.status==="cancelled"?"order cancelled":
            status_history[status_history?.length-1]?.status==="delivered"&&"order delivered"
            }
            </span>
          </p>
          <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
            <span className="w-24 shrink-0 overflow-hidden">
              {'Amount'}
            </span>
            <span className="ltr:mr-auto rtl:ml-auto">:</span>
            <span className="ltr:ml-1 rtl:mr-1">&#8377;{order?.total}</span>
          </p>
          <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
            <span className="w-24 flex-shrink-0 overflow-hidden">
              {'Total Price'}
            </span>
            <span className="ltr:mr-auto rtl:ml-auto">:</span>
            <span className="ltr:ml-1 rtl:mr-1">&#8377;{order?.total}</span>
          </p>
        </div>
      </div>
      {/* ))
    } */}
    {/* <div
      onClick={onClick}
      role="button"
      className={cn(
        'mb-4 flex w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded border-2 border-transparent bg-gray-100 last:mb-0',
        isActive === true && '!border-accent'
      )}
    >
      <div className="flex items-center justify-between border-b border-border-200 py-3 px-5 md:px-3 lg:px-5 ">
        <span className="flex shrink-0 text-sm font-bold text-heading ltr:mr-4 rtl:ml-4 lg:text-base">
          {t('text-order')}
          <span className="font-normal">#{id}</span>
        </span>
        <span
          // className="max-w-full truncate whitespace-nowrap rounded bg-blue-100 px-3 py-2 text-sm text-blue-500"
          className={`max-w-full truncate whitespace-nowrap rounded ${StatusColor(
            order?.order_status
          )} px-3 py-2 text-sm`}
          title={t(order_status)}
        >
          {t(order_status)}
        </span>
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">
            {t('text-order-date')}
          </span>
          <span className="ltr:mr-auto rtl:ml-auto">:</span>
          <span className="ltr:ml-1 rtl:mr-1">
            {dayjs(created).format('MMMM D, YYYY')}
          </span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">
            {t('text-deliver-time')}
          </span>
          <span className="ltr:mr-auto rtl:ml-auto">:</span>
          <span className="truncate ltr:ml-1 rtl:mr-1">{delivery_time}</span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
          <span className="w-24 shrink-0 overflow-hidden">
            {t('text-amount')}
          </span>
          <span className="ltr:mr-auto rtl:ml-auto">:</span>
          <span className="ltr:ml-1 rtl:mr-1">{amount}</span>
        </p>
        <p className="mb-4 flex w-full items-center justify-between text-sm font-bold text-heading last:mb-0">
          <span className="w-24 flex-shrink-0 overflow-hidden">
            {t('text-total-price')}
          </span>
          <span className="ltr:mr-auto rtl:ml-auto">:</span>
          <span className="ltr:ml-1 rtl:mr-1">{total}</span>
        </p>
      </div>
    </div> */}
    </>
  );
};

export default OrderCard;
