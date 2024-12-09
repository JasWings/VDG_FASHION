import { PaymentStatus } from '@/types';

export const ORDER_STATUS = [
  { name: 'Order Initiated', status: 'initiated', serial: 1 },
  { name: 'Order Placed', status: 'placed ', serial: 2 },
  {
    name: 'Order Shipped',
    status: 'shipped',
    serial: 3,
  },
  {
    name: 'Order Delivered',
    status: 'delivered ',
    serial: 4,
  },
  
];

export const filterOrderStatus = (
  orderStatus: any[],
  paymentStatus: PaymentStatus,
  currentStatusIndex: number
) => {
  if ([PaymentStatus.SUCCESS, PaymentStatus.COD].includes(paymentStatus)) {
    return currentStatusIndex > 4
      ? [...orderStatus.slice(0, 4), orderStatus[currentStatusIndex]]
      : orderStatus.slice(0, 5);
  }

  return currentStatusIndex > 4
    ? [...orderStatus.slice(0, 2), orderStatus[currentStatusIndex]]
    : orderStatus.slice(0, 5);
};
