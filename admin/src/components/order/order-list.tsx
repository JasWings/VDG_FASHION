import Pagination from "@/components/ui/pagination";
import dayjs from 'dayjs';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import usePrice from '@/utils/use-price';
import { formatAddress } from '@/utils/format-address';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { SortOrder, UserAddress } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Order, MappedPaginatorInfo } from '@/types';
// import { useRouter } from 'next/router';
import StatusColor from '@/components/order/status-color';
import Badge from '@/components/ui/badge/badge';
import Button from '@/components/ui/button';
import { ChatIcon } from '@/components/icons/chat';
import { SUPER_ADMIN } from '@/utils/constants';
import { getAuthCredentials } from '@/utils/auth-utils';
import { Box ,Td,Tr,Skeleton, SkeletonText, Thead,Text} from "@chakra-ui/react";
import StatusSelect from "./statusSelect";
import StatusBadgeWithDropdown from "./statusBadgeWithDropDown";
import { Eye } from "../icons/eye-icon";
import ConvertToKilograms from "@/utils/convertGmToKg";

type IProps = {
  orders: any | undefined;
  paginatorInfo: any | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isLoading:boolean;
  updateOrderList:()=>void;
  handleDetailsPage:(id:any)=>void;
  setIsLoading:any
};

const OrderList = ({
  orders,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
  isLoading,
  updateOrderList,
  handleDetailsPage,
  setIsLoading
}: IProps) => {
  // const { data, paginatorInfo } = orders! ?? {};
  // const router = useRouter();
  const rowExpandable = (record: any) => record?.children?.length;
  const { alignLeft } = useIsRTL();
  const { permissions } = getAuthCredentials();
  // const { mutate: createConversations, isLoading: creating } =
  //   useCreateConversations();
  const [loading, setLoading] = useState<boolean | string | undefined>(false);
  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  if(isLoading){
    return (
        <Box padding='1' boxShadow='lg' bg='white' height={"450px"}>
          <SkeletonText noOfLines={10}  skeletonHeight='9' />
        </Box>
    )
  }
  

  const onSubmit = async (shop_id: string | undefined) => {
    setLoading(shop_id);
    // createConversations({
    //   // @ts-ignore
    //   shop_id,
    //   via: 'admin',
    // });
  };

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const getPaymentStatus=(status)=>{
    status==="initiated"?"Payment Pending":
    status==="placed"?"Payment Complete":
    status==="shipped"?"Payment Complete":
    status==="delivered"?"Payment Complete":
    status==="cancelled"&&"Order Cancelled"
  }

  const columns = [
    {
      title: "Order No",
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
      render:(id)=>(
        <span style={{fontSize:"15px"}}>{id}</span>
      )
    },
    {
      title: "Name",
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      width: 100,
      render:(user:any)=>(
        <span style={{fontSize:"15px"}} >{user?user?.first_name+user?.last_name:"-"}</span>
      )
    },
    {
      title:"Shipping Address",
      dataIndex: 'data',
      key: 'data',
      align: alignLeft,
      render: (shipping_address: any) => (
        <div style={{fontSize:"15px"}}>{formatAddress(shipping_address.shipping_address)}</div>
      ),
    },
    {
      title:"Billing Address",
      dataIndex: 'data',
      key: 'data',
      align: alignLeft,
      render: (shipping_address: any) => (
        <div style={{fontSize:"15px",padding:"5px"}}>{formatAddress(shipping_address.billing_address)}</div>
      ),
    },
        {
      title: "Total Price",
      dataIndex: 'data',
      key: 'data',
      align: 'center',
      width:100,
      render: (data: any) => (
     <span style={{fontSize:"15px"}}>{data?.country?.currency_symbol+data?.price_details?.total_current_price}</span>
    ),
    },
    {
      title: "Total Weight",
      dataIndex: 'data',
      key: 'data',
      align: 'center',
      width:100,
      render: (data: any) => (
     <span style={{fontSize:"15px"}}>{ConvertToKilograms(data?.price_details?.total_quantity*data?.price_details?.total_weight_in_grams)}</span>
    ),
    },
    {
      title: "Status",
      dataIndex: '',
      key: 'status',
      align: 'center',
      width:100,
      render: (data: string) => (
        <Box>
        <StatusBadgeWithDropdown currentStatus={data} updateOrderList={updateOrderList} setIsLoading={setIsLoading} />
        </Box>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width:150,
      render: (status: string) => (
        <Text 
        color="white"
        borderRadius={"16px"}
        fontWeight={600}
        fontSize={"14px"}
        style={{margin:"8px 16px"}}
        bg={status==="initiated"?"#D69E2E":status==="placed"?"#48BB78":status==="shipped"?"#48BB78":status==="delivered"?"#48BB78":status==="cancelled"&&"#E3818A"}
        >{
          status==="initiated"?"Pending":
          status==="placed"?"Complete":
          status==="shipped"?"Complete":
          status==="delivered"?"Complete":
          status==="cancelled"&&"Cancelled"
          }</Text>
      ),
    },
    {
      title: "View Order",
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 220,
      render: (id: string, order: Order) => {
        const currentButtonLoading = !!loading && loading === order?.shop_id;
        return (
          <>
            {/* @ts-ignore */}
            {order?.children?.length ? (
              ''
            ) : (
              <>
                {permissions?.includes(SUPER_ADMIN) && order?.shop_id ? (
                  <button
                    onClick={() => onSubmit(order?.shop_id)}
                    disabled={currentButtonLoading}
                    className="cursor-pointer text-accent transition-colors duration-300 hover:text-accent-hover"
                  >
                    <ChatIcon width="19" height="20" />
                  </button>
                ) : (
                  ''
                )}
              </>
            )}
            <Box gap={"32px"} onClick={()=>{setIsLoading(true);handleDetailsPage(id)}} display={"inline-flex"} w={"auto"} alignItems={"center"} className="gap-8 inline-flex w-auto items-center">
            <Box
            alignItems={"center"}
            display={"flex"}
            w={"full"}
            cursor={"pointer"}
            className="ml-2 text-base transition duration-200 hover:text-heading "
            title={"view"}
            >
            <Box w={"full"}>
            <Eye width={24} />
            </Box>
            </Box>
        </Box>
          </>
        );
      },
    },
  ];


  return (
    <>
      <Box mb={"24px"} overflow={"hidden"} rounded={"sm"} shadow={"sm"} >
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={"Empty"}
          data={orders}
          rowKey="id"
          scroll={{ x: 1000 }}
          // expandable={{
          //   expandedRowRender: () => '',
          //   rowExpandable: rowExpandable,
          // }}
        />
      </Box>

      {!!paginatorInfo?.total && (
        <Box display={"flex"} alignItems={"center"} justifyContent={"end"} >
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </Box>
      )}
    </>
  );
};

export default OrderList;
