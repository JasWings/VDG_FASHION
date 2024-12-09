import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import StatusColor from '@/components/orders/status-color';
import Badge from '@/components/ui/badge';
import PayNowButton from '@/components/payment/pay-now-button';
import { isPaymentPending } from '@/lib/is-payment-pending';
import { SpinnerLoader } from '@/components/ui/loaders/spinner/spinner';
import ChangeGateway from '@/components/payment/gateway-control/change-gateway';
import { useSettings } from '@/framework/settings';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useModalState } from '@/components/ui/modal/modal.context';

interface OrderViewHeaderProps {
  order: any;
  wrapperClassName?: string;
  buttonSize?: 'big' | 'medium' | 'small';
  loading?: boolean;
}

export default function OrderViewHeader({
  order,
  wrapperClassName = 'lg:px-11 lg:py-5 p-6',
  buttonSize = 'medium',
  loading = false,
}: OrderViewHeaderProps) {
  // const { settings, isLoading } = useSettings();
  const { t } = useTranslation('common');
  const isPaymentActionPending = isPaymentPending(
    order?.payment_gateway,
    order?.order_status,
    order?.payment_status
  );
  // const { paymentGateway } = settings;
 
  return (
    <div className={cn(`bg-[#F7F8FA] px-3 py-3 md:px-7 md:py-6`)}>
      <div className="mb-0 flex flex-col flex-wrap items-center justify-between gap-x-8 text-base font-bold text-heading sm:flex-row lg:flex-nowrap">
        <div
          className={`order-2 flex w-full flex-col md:flex-row gap-6 xs:flex-nowrap sm:order-1 ${
            !isPaymentActionPending
              ? 'max-w-full basis-full justify-between'
              : 'max-w-full basis-full justify-between lg:ltr:mr-auto'
          }`}
        >
          <div className="flex flex-nowrap md:flex-wrap items-center">
            <div className='w-[50%] md:w-auto'>
            <span className="mb-2 block text-xs xs:text-base lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
              Order Status :
            </span>
            </div>
            <div className="w-full lg:w-auto">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <Badge
                  // text={t(order?.status)}
                  text={
            order?.status==="initiated"? "Order pending":
            order?.status==="placed"?"Order processing":
            order?.status==="shipped"?"Order shipped":
            order?.status==="cancelled"?"Order Cancelled":
            order?.status==="delivered"&&"Order delivered"
                  }
                  color={StatusColor(order?.status)}
                  className="min-h-[2rem] items-center justify-center text-[9px] !leading-none xs:text-sm"
                />
              )}
            </div>
          </div>
          <div className="flex flex-nowrap md:flex-wrap items-center">
            <div className=' w-[60%] md:w-auto'>
            <span className="mb-2 block text-xs xs:text-base lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
              Payment Status :
            </span>
            </div>
            <div className="w-full lg:w-auto">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <Badge
                  // text={t(order?.status)}
                  text={
                    order?.status==="initiated"? "Payment pending":
                    order?.status==="placed"?"Payment completed":
                    order?.status==="shipped"?"Payment completed":
                    order?.status==="cancelled"?"Order cancelled":
                    order?.status==="delivered"&&"Payment completed"
                    }
                  color={
                    order?.status==="initiated"? "text-[#C9A116] bg-[#C9A116]":
                    order?.status==="placed"?"text-[#026E01] bg-[#026E01]":
                    order?.status==="shipped"?"text[#026E01]  bg-[#026E01]":
                    order?.status==="cancelled"?"text-[#E36E01]  bg-[#E36E01]":
                    order?.status==="delivered"&&"text-[#026E01]  bg-[#026E01]"
                    }
                  className="min-h-[2rem] items-center justify-center text-[9px] !leading-none xs:text-sm"
                />
              )}
            </div>
          </div>
        </div>
        {true ? (
          <>
            {order?.status==="initiated" && (
              <span className="order-2 mt-5 w-full max-w-full shrink-0 basis-full sm:order-1 lg:mt-0 lg:w-auto lg:max-w-none lg:basis-auto lg:ltr:ml-auto lg:rtl:mr-auto">
                <PayNowButton trackingNumber={order?.uuid} order={order} />
                {/* <PayNowButton
                  trackingNumber={order?.tracking_number}
                  order={order}
                /> */}
              </span>
            )}
            {/* @ts-ignore */}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
