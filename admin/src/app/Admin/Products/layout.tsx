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
import { getTagEndPoint,getAllProductEndPoint,getCategoryEndPoint,getAllBrandEndPoint ,getUserInfoEndPoint} from '@/utils/url/url';
import { useRouter ,usePathname} from 'next/navigation';


export default function ProductsLayout(props: any) {
  const { children, ...rest } = props;
  const {allProducts,updateAllProducts,updateBrands,updateCategories,updateTags,categories}=useGlobalContext()
  const {userContext,setUserContext}=UseUserContext()
  const router=useRouter()
  
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  
  const { onOpen } = useDisclosure();


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
    <Box h="100vh" w="100%" bg={bg}>
      {/* <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      > */}
        {/* <Sidebar routes={routes} display="none" {...rest} /> */}
        <Box
        w={"100%"}>
        <Box
          // float="right"
          minHeight="100vh"
          height="100%"
          // overflow="auto"
          // position="relative"
          maxHeight="100%"
          // w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          // maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {/* <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                user={userContext}
                UpdateUser={UpdateUser}
                {...rest}
              />
            </Box>
          </Portal> */}
          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            <TopBar></TopBar>
            {/* <SearchBar Categories={categories}></SearchBar> */}
            {children}
          </Box>
        </Box>
        </Box>
        <Box>
          <Footer />
        </Box>
      {/* </SidebarContext.Provider> */}
    </Box>
  );
}
