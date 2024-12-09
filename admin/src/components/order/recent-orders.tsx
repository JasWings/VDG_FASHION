import dayjs from 'dayjs';
import { Table } from '@/components/ui/table';
import usePrice from '@/utils/use-price';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Order, OrderStatus } from '@/types';
import Badge from '@/components/ui/badge/badge';
import StatusColor from '@/components/order/status-color';
import { Box,Text } from '@chakra-ui/react';
import { formatAddress } from '@/utils/format-address';
import ConvertToKilograms from '@/utils/convertGmToKg';


type IProps = {
  orders: Order[];
  title?: string;
};

const RecentOrders = ({ orders, title }: IProps) => {

  const rowExpandable = (record: any) => record.children?.length;

  // const columns = [
  //   {
  //     title: 'tracking number',
  //     dataIndex: 'tracking_number',
  //     key: 'tracking_number',
  //     align: 'center',
  //     width: 150,
  //   },
  //   {
  //     title: 'order date',
  //     dataIndex: 'created_at',
  //     key: 'created_at',
  //     align: 'center',
  //     render: (date: string) => {
  //       dayjs.extend(relativeTime);
  //       dayjs.extend(utc);
  //       dayjs.extend(timezone);
  //       return (
  //         <span className="whitespace-nowrap">
  //           {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     title: 'item status',
  //     dataIndex: 'order_status',
  //     key: 'order_status',
  //     align: 'center',
  //     render: (order_status: OrderStatus) => (
  //       <Badge text={order_status} colorScheme={StatusColor(order_status)} />
  //     ),
  //   },
  // ];



  const columns = [
    {
      title: "Order No",
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: "Name",
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      width: 100,
      render:(user:any)=>(
        <span>{user?user?.first_name+user?.last_name:"-"}</span>
      )
    },
    {
      title:"Shipping Address",
      dataIndex: 'data',
      key: 'data',
      render: (shipping_address: any) => (
        <div>{formatAddress(shipping_address.shipping_address)}</div>
      ),
    },
    {
      title:"Billing Address",
      dataIndex: 'data',
      key: 'data',
      render: (shipping_address: any) => (
        <div>{formatAddress(shipping_address.billing_address)}</div>
      ),
    },
        {
      title: "Total Price",
      dataIndex: 'data',
      key: 'data',
      align: 'center',
      width:100,
      render: (data: any) => (
     <span>{data?.country?.currency_symbol+data?.price_details?.total_current_price}</span>
    ),
    },
    {
      title: "Total Weight",
      dataIndex: 'data',
      key: 'data',
      align: 'center',
      width:100,
      render: (data: any) => (
     <span>{ConvertToKilograms(data?.price_details?.total_quantity*data?.price_details?.total_weight_in_grams)}</span>
    ),
    },
    {
      title: "status",
      dataIndex: '',
      key: 'status',
      align: 'center',
      width:100,
      render: (data: any) => (
        <Box>
          <Text as={"span"} >{data?.status}</Text>
        </Box>
      ),
    },
    {
      title: "Tracking Code",
      dataIndex: 'shipment_tracking_number',
      key: 'shipment_tracking_number',
      align: 'center',
      width:100,
      render: (shipment_tracking_number: string) => (
        <span>{shipment_tracking_number}</span>
      ),
    }
  ];

  return (
    <>
      <Box overflow={"hidden"} borderRadius={"4px"} shadow={"base"} >
        <Text as={"h3"}  
         borderBottom="1px"
         borderColor="whiteAlpha.100"
         backgroundColor="gray.100"
         paddingLeft="1rem"
         paddingRight="1rem"
         paddingTop="0.75rem"
         paddingBottom="0.75rem"
         textAlign="center"
         fontWeight="semibold"
         color="heading"
         >
          {title}
        </Text>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={'table data'}
          data={orders}
          rowKey="id"
          scroll={{ x: 200 }}
          // expandable={{
          //   expandedRowRender: () => '',
          //   rowExpandable: rowExpandable,
          // }}
        />
      </Box>
    </>
  );
};

export default RecentOrders;
