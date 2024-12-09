import { Table } from '@/components/ui/table';
import { Image } from '@/components/ui/image';
import { Flex, Text} from '@chakra-ui/react';

const PaymentList = (_: any, record: any) => {

  let name = record.product.identity;
  
  if (record?.pivot?.variation_option_id) {
    const variationTitle = record?.variation_options?.find(
      (vo: any) => vo?.id === record?.pivot?.variation_option_id
    )['title'];
    name = `${name} - ${variationTitle}`;
  }
  return (
<Flex alignItems="center" justifyContent={"space-around"}>
      <Flex
        pos="relative"
        display="flex"
        h="16"
        w="16"
        overflow="hidden"
        rounded="md"
      >
        <Image
          src={"https://api.slrexports.com" + record.product?.thumb_image.file}
          alt={name}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw"
          fill
        />
      </Flex>

      <Flex flexDir="column" overflow="hidden" ml={{ base: 4, rtl: 4, ltr: 4 }}>
        <Flex mb={1} gap={1} flexDirection={{ base: 'row', rtl: 'row-reverse' }}>
          <Text
            as="p"
            fontSize="sm"
            color="text.body"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            transition="color 0.3s"
            _hover={{ color: 'accent' }}
            // Add the link using Chakra's Link component
            // href={Routes.product(record?.slug)}
            // locale={record?.language}
          >
            {name}
          </Text>
          <Text
            fontSize="sm"
            color="text.body"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            x
          </Text>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="text.heading"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {record.quantity}
          </Text>
        </Flex>
        <Text
          mb={1}
          fontSize="sm"
          fontWeight="semibold"
          color="accent"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {record?.product?.product_prices[0].actual_price* record.quantity}
        </Text>
      </Flex>
    </Flex>
  );
};
export const PaymentHistoryTable = ({
  products,
  orderId,
}: {
  products: any;
  orderId: any;
}) => {

  const orderTableColumns = [
    {
      title: <Text as={"span"} pl={"20"}  >Item</Text>,
      dataIndex: '',
      key: 'items',
      align: "center",
      width: 250,
      ellipsis: true,
      render: PaymentList,
    },
    {
      title: "Quantity",
      dataIndex: 'quantity',
      key: 'pivot',
      align: 'center',
      width: 100,
      render: function renderQuantity(pivot: any) {
        return <Text fontSize={"16px"} lineHeight={"24p"} >{pivot}</Text>;
      },
    },
    {
      title: "Price",
      dataIndex: '',
      key: 'product',
      align: "center",
      width: 100,
      render: function RenderPrice(pivot: any) {
        // const { price } = usePrice({
        //   amount: pivot?.product?.product_prices?.[0]?.actual_price*pivot.quantity,
        // });
        return <div>{pivot?.product?.product_prices?.[0]?.actual_price*pivot.quantity}</div>;
      },
    },
  ];
  
  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products?.data?.items}
      rowKey={(record: any) =>
        record.id
          ? record.id
          : record.created_at
      }
      className="orderDetailsTable w-full"
      rowClassName="!cursor-auto"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
