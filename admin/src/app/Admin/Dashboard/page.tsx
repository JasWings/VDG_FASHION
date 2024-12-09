"use client"
import { Box, Flex, Grid } from '@chakra-ui/react';
import { CartIconBig } from '@/components/icons/cart-icon-bag';
import { CoinIcon } from '@/components/icons/coin-icon';
import BarChart from '@/components/dashboard/column-chart';
import StickerCard from '@/components/dashboard/sticker-card';
import ErrorMessage from '@/components/ui/error-message';
import usePrice from '@/utils/use-price';
import Loader from '@/components/ui/loader/loader';
import RecentOrders from '@/components/order/recent-orders';
// import PopularProductList from '@/components/product/popular-product-list';
// import { useOrdersQuery } from '@/data/order';
// import { useTranslation } from 'next-i18next';
// import { useWithdrawsQuery } from '@/data/withdraw';
// import WithdrawTable from '@/components/withdraw/withdraw-table';
import { ShopIcon } from '@/components/icons/sidebar';
import { DollarIcon } from '@/components/icons/shops/dollar';
// import { useAnalyticsQuery, usePopularProductsQuery } from '@/data/dashboard';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useState ,useEffect} from 'react';
import { get,post } from '@/utils/url/api';
import { GetAllOrders ,GetReports} from '@/utils/url/url';
import OrderList from '@/components/order/order-list';

interface RevenueByCountry {
  total_revenue: number | null;
  currency_code: string;
  currency_symbol: string;
  currency_name: string;
}

interface RevenueReport {
  AE: RevenueByCountry;
  GB: RevenueByCountry;
  IN: RevenueByCountry;
  US: RevenueByCountry;
}

interface ReportData {
  from_date: string;
  to_date: string;
  report_type: string;
  total_orders: number;
  total_completed_orders: number;
  total_payment_pending_orders: number;
  total_pending_orders: number;
  revenue: RevenueReport;
}

export default function Dashboard() {
  // const { t } = useTranslation();
  const [orderList,setOrderList]=useState([])
  const [Reports,setReports]=useState<any>([])
  const [isLoading,setIsLoading]=useState(true)
  const [MonthlyReport,setMonthlyReport]=useState([])

  const getAllOrdersList=async()=>{
    const listData:any=await get(GetAllOrders,{})
    setOrderList(listData?.results)
  }

  const getReports=async()=>{
        const header={"Content-Type":"Application/json"}
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const data={
          from_date:"2021-01-01",
          to_date:formattedDate,
          report_type: "stats"
       }
        const reports:any=await post(GetReports,data,header)
        setReports(reports?.data)
  }
  console.log(Reports,"reports")
  const getMonthlyReports=async()=>{
    const header={"Content-Type":"Application/json"}
    const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
    const data={
      from_date:"2023-01-01",
      to_date:formattedDate,
      report_type: "monthly",
      countries: [ "USA"]
    }
    const reports:any=await post(GetReports,data,header)
    const NewReports=[]
    const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const MonthList=Object.keys(reports?.data.report)
    MonthList.filter((i)=>{
      const month=new Date(i)
      const total= reports?.data?.report[i]?.revenue["USA"]?.total_revenue
      NewReports.push({total:total===null?0:total,month:months[month.getMonth()]})
    })
    setMonthlyReport(NewReports)
}
  useEffect(() => {
    if (orderList.length === 0 && isLoading&&Reports.length===0&&MonthlyReport.length===0) {
      getAllOrdersList();
      getReports()
      getMonthlyReports()
      .then(()=>{setIsLoading(false)})
    }
  }, []);
  
  

  console.log(MonthlyReport,"monthly Report")
  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);
  if (!!MonthlyReport?.length) {
    salesByYear = MonthlyReport.filter((item: any) =>
      item.total?.toFixed(2)
    );
  }

  if (isLoading) {
    return <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} h={"100vh"} alignItems={"center"}><Loader text={"Loading"} /></Box>;
  }

  // if (orderError || popularProductError) {
  //   return (
  //     <ErrorMessage
  //       message={orderError?.message || popularProductError?.message}
  //     />
  //   );
  // }
  interface Order {
    id: number;
    total_price: number;
    status_history: { status: string; created: string }[];
  }
  
  return (
    <>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={5} mb={6}>
        <StickerCard
          titleTransKey="Total Completed Order"
          subtitleTransKey=""
          icon={<CartIconBig/>}
          iconBgStyle={{ backgroundColor: '#A7F3D0' }}
          price={Reports.total_completed_orders}
        />
        <StickerCard
          titleTransKey="Total Payment Pending Order"
          subtitleTransKey=""
          icon={<DollarIcon  height={"28px"} width={"28px"} color="#047857" />}
          price={Reports?.total_payment_pending_orders}
        />
        <StickerCard
          titleTransKey="Total Revenue"
          icon={<CoinIcon />}
          price={Reports?.revenue["USA"]?.total_revenue===null?"0":"$"+Reports?.revenue["USA"]?.total_revenue}
          subtitleTransKey=''
        />
        <StickerCard
          titleTransKey="Total Order"
          icon={<ShopIcon width={"24px"} color="#1D4ED8" />}
          iconBgStyle={{ backgroundColor: '#93C5FD' }}
          price={Reports?.total_orders}
          subtitleTransKey=''
        />
      </Grid>

      <Flex wrap="wrap" mb={6}>
        <BarChart
          widgetTitle={'Sale History'}
          colors={['#399f7f']}
          series={salesByYear}
          categories={[
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
          ]}
        />
      </Flex>

      <Flex wrap={{ base: 'wrap', xl: 'nowrap' }} mb={6} gap={{ base: '6', xl: '5' }}>
        <Box w={{ base: 'full', xl: '100%' }}>
          <RecentOrders
            orders={orderList?.slice(0,10)}
            title={"Recent Orders"}
          />
        </Box>
      </Flex>
    </>
  );
}
