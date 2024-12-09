'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import Sidebar from '@/components/sidebar/sidebar';
import { SidebarContext } from '@/context/SidebarContext';
import {  useEffect, useState } from 'react';
import routes from "@/routes"
import TopBar from '@/components/products/topBar';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from "@/utils/navigation"
import SearchBar from '@/components/products/searchBar';
import { useGlobalContext } from '@/context/productContext/productContext';
import { UseUserContext } from '@/context/UserContext';
import { get } from '@/utils/url/api';
import { getTagEndPoint,getAllProductEndPoint,getCategoryEndPoint,getAllBrandEndPoint ,getUserInfoEndPoint,GetAllOrders} from '@/utils/url/url';
import { usePathname ,useRouter,useSearchParams} from 'next/navigation';



export default function ProductsLayout(props: any) {
  const { children, ...rest } = props;
  const {allProducts,updateAllProducts,updateBrands,updateCategories,updateTags}=useGlobalContext()
  const {userContext,setUserContext}=UseUserContext()
  const [searchText,setSearchText]=useState({name:"identity",value:'Idly Rice'})

  
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [orderList,setOrderList]=useState([])
  const pathname=usePathname()
  const router=useRouter()
  const search=useSearchParams()

  const { onOpen } = useDisclosure();

  const getAllOrdersList=async()=>{
    const listData:any=await get(GetAllOrders,{})
    const currentTimestamp = new Date().getTime();
    const oneHourAgoTimestamp = currentTimestamp - (60 * 60 * 1000);
    const ordersWithinLastHour = listData?.results.filter(order => {
      const orderCreationTimestamp = new Date(order.created).getTime();
      return orderCreationTimestamp >= oneHourAgoTimestamp && orderCreationTimestamp <= currentTimestamp;
    });
    setOrderList(ordersWithinLastHour)

}

  useEffect(() => {
    const getTages = async () => {
      try {
        const AllTags: any = await get(getTagEndPoint,{});
        const AllCategories:any =await get(getCategoryEndPoint,{})
        const AllBrands:any=await get(getAllBrandEndPoint,{})
        const response:any =await get(getAllProductEndPoint,{})
        if(response){
           updateAllProducts(response.results)
        }
        updateCategories(AllCategories.results)
        updateTags(AllTags.results)
        updateBrands(AllBrands.results)
        if(orderList.length===0){
          getAllOrdersList()
         }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    getTages();
  },[]);

  const UpdateUser=async()=>{
    const response:any=await get(getUserInfoEndPoint,{})
    setUserContext(response.data)
  }

  
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  return (
    <Box  h="100vh" w="100vw" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
          flex={1}
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'SLR'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                user={userContext}
                UpdateUser={UpdateUser}
                orderList={orderList}
                {...rest}
              />
            </Box>
          </Portal>
          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
            mt={"110px"}
          >
            {children}
          </Box>
          {pathname.toLowerCase()!=="/Admin/Products/productListing".toLowerCase()&&<Box bottom={"0px"}>
            <Footer />
          </Box>
          }
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
