interface Props {
  order: any;
  loadingStatus?: boolean;
  setIsLoading:any;
  updateOrderList:any
}

import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Button
} from '@chakra-ui/react';
import usePrice from '@/lib/use-price';
import { formatAddress } from '@/utils/format-address';
import { OrderItems } from './order-items';
import { useModalAction } from '@/components/ui/modal/modal.context';
import OrderViewHeader from './order-view-header';
import OrderStatusProgressBox from './order-status-progress-box1';
import { OrderStatus, PaymentStatus } from '@/types';
import StatusBadgeWithDropdown from './statusBadgeWithDropDown';


const OrderDetails = ({ order, loadingStatus ,setIsLoading,updateOrderList}: Props) => {
  const {
    id,
    products,
    status,
    tracking_number,
    refund,
  }: any = order ?? {};

  const {    shipping_address,
    billing_address,price_details,items}:any=order.data?? ""
  
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
  

  return (
    <Box borderWidth="1px" borderColor={"#E5E7EB"} borderRadius="md" bg="white" w="full" m={"20px"}>
      <Flex justify="space-between" align="center" p={5} direction={["column", "row"]}>
        <Heading as="h2" fontSize={["lg", "2xl"]} mb={2} fontWeight="semibold">
          Order Details
          {tracking_number}
        </Heading>
        <Box>
        <StatusBadgeWithDropdown currentStatus={order} setIsLoading={setIsLoading} updateOrderList={updateOrderList} />
        </Box>
      </Flex>
      <Box mx={5} mb={6} overflow="hidden" rounded="lg">
      <OrderViewHeader
          order={order}
          wrapperClassName="px-7 py-4"
          buttonSize="small"
        //   loading={loadingStatus}
        />
      </Box>

      {order?.status !== "initiated" && (
        <Flex
          justifyContent="flex-start"
          px={[5, 5]}
          py={4}
          borderBottomWidth="1px"
          borderColor="#E5E7EB"
        >
          <Text
            mb={[2, 0]}
            fontWeight="semibold"
            fontSize={["base", "lg"]}
            mr={[0, 4]}
          >
            Payment Id:
          </Text>
          <Text fontSize={["sm", "base"]}>
            {order?.completed_payment?.payment_id}
          </Text>
        </Flex>
      )}

      <Flex direction={["column", "row"]} borderBottomWidth="1px" w={"full"} borderColor="#E5E7EB">
        <Box w={"50%"} borderRight={"1px"} borderRightColor={"#E5E7EB"}>
        <Box flex={["1 1", "3 5"]} borderBottomWidth={["1px", "0"]} p={4}>
          <Text mb={2} fontSize="bold">
            Shipping Address
          </Text>
          <Text fontSize="sm">{formatAddress(shipping_address)}</Text>
        </Box>

        <Box flex={["1 1", "2 5"]} p={4}>
          <Text mb={2} fontSize="bold">
            Billing Address
          </Text>
          <Text fontSize="sm">{formatAddress(billing_address)}</Text>
        </Box>
        </Box>
        <Box p={4} w={"50%"}>
        <Flex justifyContent="space-between">
          <Text fontSize="sm">Sub Total</Text>
          <Text fontSize="lg" fontWeight="bold">
            {amount}
          </Text>
        </Flex>

        <Flex justifyContent="space-between" mt={3}>
          <Text fontSize="lg" fontWeight="bold">
            Total
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {total}
          </Text>
        </Flex>
      </Box>
      </Flex>



      <Box p={6}>
        <Flex justify="center">
        {
         order?.status!=="cancelled"&&(
          <OrderStatusProgressBox
          orderStatus={order?.status}
          paymentStatus={order?.payment_status as PaymentStatus}
        />
         )
        }
        </Flex>
        <OrderItems products={order} orderId={order?.id} />
      </Box>
    </Box>
  );
};

export default OrderDetails