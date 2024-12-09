"use client"
import Loader from '@/components/ui/loader/loader';
import { usePathname} from "next/navigation"
import { useEffect, useState } from 'react';
import { get } from '@/utils/url/api';
import { GetAllOrders } from '@/utils/url/url';
import { Box, Flex ,Text} from '@chakra-ui/react';
import OrderDetails from '@/components/order/order-details';
import { ArrowLeftIcon } from '@chakra-ui/icons';


export default function OrderDetailsPage() {
  const pathName = usePathname()
  const [order,setOrderList]:any=useState([])
  const [isLoading,setIsLoading]=useState(true)

  const getAllOrdersList=async()=>{
    const listData:any=await get(GetAllOrders,{})
    const getParticularData=listData?.results?.filter((i)=>i.id===Number(pathName.split("/").pop()))
    setOrderList(getParticularData[0])    
  }
   console.log(order,"order")
   useEffect(()=>{
    if(order.length===0){
     getAllOrdersList()
     setIsLoading(false)
    }
   })

  if (isLoading || order?.length===0) return <Box w={"100%"} h={"100vh"} display={"flex"} flexDirection={"row"} justifyContent={"center"}><Loader text={('Loading')} /></Box>;


  return (
    <>
    <Flex onClick={()=>{window.location.href="/Admin/Orders/"}} ml={"20px"}>
      <Box display={"flex"} flexDirection={"row"} color={"brand.500"} alignItems={"center"} gap={"10px"} cursor={"pointer"}>
      <ArrowLeftIcon  />
      <Text color={"brand.500"}>
       Back to Order
      </Text>
      </Box>
    </Flex>
    {order&&<OrderDetails order={order} setIsLoading={setIsLoading} updateOrderList={getAllOrdersList} />}
    </>
  );
}

