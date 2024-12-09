// import { useModalAction } from '@/components/ui/modal/modal.context';
// import { OrderStatus, PaymentGateway, PaymentStatus } from '@/types';
// import Button from '@/components/ui/button';
// import cn from 'classnames';
// import StatusColor from '@/components/order/status-color';
// import Badge from '@/components/ui/badge/badge';

// interface OrderViewHeaderProps {
//   order: any;
//   wrapperClassName?: string;
//   buttonSize?: 'big' | 'medium' | 'small';
// }

// export default function OrderViewHeader({
//   order,
//   wrapperClassName = 'px-11 py-5',
//   buttonSize = 'medium',
// }: OrderViewHeaderProps) {
//   const isPaymentCOD = [PaymentGateway.COD, PaymentGateway.CASH].includes(order?.payment_gateway);
//   const isOrderPending = ![OrderStatus.CANCELLED, OrderStatus.FAILED].includes(order?.order_status);
//   const isPaymentActionPending = !isPaymentCOD && isOrderPending && order?.payment_status !== PaymentStatus.SUCCESS;

//   return (
//     <div className={cn(`bg-[#F7F8FA] ${wrapperClassName}`)}>
//       <div className="mb-0 flex flex-col flex-wrap items-center justify-between gap-x-8 text-base font-bold text-heading sm:flex-row lg:flex-nowrap">
//         <div
//           className={`order-2 flex  w-full gap-6 sm:order-1 ${
//             !isPaymentActionPending
//               ? 'max-w-full basis-full justify-between'
//               : 'max-w-full basis-full justify-between lg:ltr:mr-auto'
//           }`}
//         >
//           <div>
//             <span className="mb-2 block lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
//               {'order status'} :
//             </span>
//             <Badge
//               text={order?.status}
//               colorScheme={StatusColor(order?.status)}
//             />
//           </div>
//           <div>
//             <span className="mb-2 block lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
//               {'payment status'} :
//             </span>
//             <Badge
//               text={order?.status}
//               colorScheme={StatusColor(order?.status)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Badge, Flex ,Text} from '@chakra-ui/react';
import { OrderStatus, PaymentGateway, PaymentStatus } from '@/types';
import Button from '@/components/ui/button';
import cn from 'classnames';
import StatusColor from '@/components/order/status-color';

interface OrderViewHeaderProps {
  order: any;
  wrapperClassName?: string;
  buttonSize?: 'big' | 'medium' | 'small';
}

export default function OrderViewHeader({
  order,
  wrapperClassName = 'px-11 py-5',
  buttonSize = 'medium',
}: OrderViewHeaderProps) {
  const isPaymentCOD = [PaymentGateway.COD, PaymentGateway.CASH].includes(order?.payment_gateway);
  const isOrderPending = ![OrderStatus.CANCELLED, OrderStatus.FAILED].includes(order?.order_status);
  const isPaymentActionPending = !isPaymentCOD && isOrderPending && order?.payment_status !== PaymentStatus.SUCCESS;

  return (
    <Flex bg="#F7F8FA" px={"36px"} py={"16px"} className={wrapperClassName} flexDir={{ base: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
      <Flex order={{ base: 2, sm: 1 }} width="full" gap={6} flexBasis="full" justifyContent="space-between" marginRight={{ lg: isPaymentActionPending ? 'auto' : '0' }}>
        <Flex flexDir="row">
          <Text as={"span"} color={"black"} fontWeight={"700"} fontSize={"1rem"} lineHeight={"1.5rem"} mb={{ base: 2, lg: 0 }} display={{ base: 'block', lg: 'inline-block' }} mr={ {start: 4, end: 4 }}>order status : </Text>
          <Badge ml={"1"} bg={StatusColor(order?.status)} color={"white"}>
           {order?.status}
          </Badge>
        </Flex>
        {/* <Flex flexDir="column">
          <Text as={"span"} marginBottom={{ base: 2, lg: 0 }} display={{ base: 'block', lg: 'inline-block' }} mr={{ start: 4, end: 4 }}>payment status:</Text>
          <Badge colorScheme={StatusColor(order?.status)}>
            {order?.status}
          </Badge>
        </Flex> */}
      </Flex>
    </Flex>
  );
}

