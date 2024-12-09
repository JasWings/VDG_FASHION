"use client"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import { useState,useEffect } from "react";
import { SortOrder } from "@/types";
import OrderList from "@/components/order/order-list";
import { Flex ,Box,Heading,Spinner} from "@chakra-ui/react";
import { get ,getWithQuery} from "@/utils/url/api";
import { GetAllOrders } from "@/utils/url/url";
import OrderSearchBar from "@/components/order/orderSearch";
import { useCustomToast } from "@/components/toast/Toast";


const Orders=()=>{
    const itemsPerPage=10
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('created_at');
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    const [orderList,setOrderList]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [selectedStatus,setSelectedStatus]=useState("")
    const [isSearch,setIsSearch]=useState(false)
    const toast=useCustomToast()


    const getAllOrdersList=async()=>{
          const listData:any=await get(GetAllOrders+"?page-size=1000",{})
          setOrderList(listData?.results)
    }

    useEffect(()=>{
       if(orderList.length===0){
        getAllOrdersList()
        setIsLoading(false)
       }
    })

    const handleOnChangeStatus=async(value:any)=>{
         setSelectedStatus(value)
         setIsLoading(true)
         const response:any=await getWithQuery(GetAllOrders,`?status=${value}`)
         setOrderList(response?.results)
         setIsLoading(false)
    }

    const handleDateFilter = (selectedStatus, startDate, endDate) => {
      setIsLoading(true)
      const filteredOrders = orderList.filter(order => {
      const orderDate = new Date(order.created);
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;
  
        if (
          (!startDateObj || orderDate >= startDateObj) &&
          (!endDateObj || orderDate <= endDateObj)
        ) {
          return true;
        }
        return false;
      });
      if(filteredOrders?.length===0){
        setIsLoading(false)
        toast({position:"top",title:"No matches found",status:"warning"})
        return;
      }
      setOrderList(filteredOrders)
      setIsLoading(false)
      setIsSearch(true)
    };
    



    function handlePagination(current: any) {
        setPage(current);
    }

    const handleOrderDetailsPage=(id)=>{
        if(typeof window !== undefined){
            window.location.href=`/Admin/Orders/${id}`
        }
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = orderList?.slice(startIndex, endIndex);

    const paginatorInfo={
        total: orderList.length,
        currentPage: page,
        count: orderList.length,
        lastPage: 1,
        firstItem: 0,
        lastItem: 6,
        perPage: "10",
        nextPageUrl: null,
        prevPageUrl: null,
        hasMorePages: false
    }

    if(isLoading){
      return <Box display={"flex"} flexDirection={"column"} height={"100vh"} alignItems={"center"} flexFlow={"row"} justifyContent={"center"}>
       <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='brand.500'
        size='xl'
       />
       </Box>
   }

      return(
        <>
         <OrderSearchBar
         selectedStatus={selectedStatus}
         handleOnChangeStatus={handleOnChangeStatus} 
         handleDateFilter={handleDateFilter}
         isSearch={isSearch}
         setIsSearch={setIsSearch}
         setOrderList={setOrderList}
         />
         <Flex 
         p={{sm:"5px",md:"8px"}}
         bg={"white"}
         mt={"20px"}
         shadow={"sm"}
         rounded={"sm"}
         display={"flex"} flexDir={{sm:"column",md:"row"}} alignContent={"center"} style={{justifyContent:"space-between"}} mb={"8px"} alignItems={"center"}  >
          <Box mb={{sm:"16px",md:"0px"}}  >
           <Heading fontSize={"18px"} lineHeight={"28px"} fontWeight={"600"} >
             Orders
           </Heading>
          </Box>

          {/* <Box display={"flex"} flexDirection={{sm:"column",md:"row"}} alignItems={"center"} marginInlineStart={"auto"} w={{sm:"full",md:"50%"}} className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
          <Search
            onSearch={handleSearch}
            placeholderText={"Search by Tracking Number"}
          />
        </Box> */}

         </Flex>
         <OrderList
        isLoading={isLoading}
        orders={paginatedOrders}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
        updateOrderList={getAllOrdersList}
        setIsLoading={setIsLoading}
        handleDetailsPage={handleOrderDetailsPage}
      />
        </>
      )
}
export default Orders