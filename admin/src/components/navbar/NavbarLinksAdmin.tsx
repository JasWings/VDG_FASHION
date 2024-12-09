'use client';
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { get } from '@/utils/url/api';
import { GetAllOrders } from '@/utils/url/url';

import { SearchBar } from '@/components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from "@/components/sidebar/sidebar";

import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdInfoOutline, MdNotificationsNone } from 'react-icons/md';
import routes from '@/routes';
import { useEffect,useState } from 'react';

export default function HeaderLinks(props: { secondary: boolean;onOpen:()=>void;fixed:any,user:{[x:string]:any},UpdateUser:()=>void,orderList:any}) {
  const { secondary ,user,UpdateUser,orderList} = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  const [unReadCount,setUnReadCount]=useState(0)
  const ids = localStorage.getItem("ids");

  useEffect(()=>{
     const checkUser=()=>{
       if(user.length===undefined){
         UpdateUser()
       }
     }
     checkUser()
  },[])

  const handleLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("loaded")
        localStorage.removeItem("userId")
        window.location.href="/"
  }

  const handleNotifiClick=(id)=>{
        localStorage.setItem("ids",`[${id}]`)
  }
  useEffect(() => {
    let count = 0;

    if (ids === null && unReadCount === 0) {
      setUnReadCount(orderList?.length);
    } else if (ids !== null) {
      orderList?.forEach((order) => {
        if (!ids?.includes(order?.id)) {
          count++;
        }
      });
      setUnReadCount(count);
    }
   }, [ids, orderList]);

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
      justifyContent={"space-between"}
    >
      {/* <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      /> */}
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="25px"
            h="25px"
            me="10px"
          />
          {orderList.length > 0 &&unReadCount!==0&& (
            <Box
              bg="red"
              color="white"
              fontSize="10px"
              fontWeight="bold"
              borderRadius="50%"
              w="15px"
              h="15px"
              position="absolute"
              top="20px"
              right="70px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {unReadCount}
            </Box>
          )}
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            {/* <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text> */}
          </Flex>
         {orderList?.length!==0? <Flex flexDirection="column">
          {orderList.map((order) => (
              <Link key={order.id} w="100%" display={ids?.includes(order?.id)&&"none"} href={`/Admin/Orders/${order.id}`}>
               <Box w="100%" display={"flex"} h="44px" mb="10px" color={"black"} onClick={()=>handleNotifiClick(order?.id)} >
           <Text w={"100%"} border={"1px"} borderColor={"#E5E7EB"} borderRadius={"8px"} padding={"20px"} display={"flex"} justifyContent={"space-between"} flexDirection={"row"} alignItems={"center"}>
             <Text fontWeight="bold">{`Order Id: ${order?.id}`}</Text>
             {/* <Text color="white" borderRadius={"8px"} p={"8px"} bg={order?.status==="initiated"?"#D69E2E":order?.status==="placed"?"#48BB78":order?.status==="shipped"?"#48BB78":order?.status==="delivered"?"#48BB78":order?.status==="cancelled"&&"#E3818A"}>{`${order?.status}`}</Text> */}
           </Text>
         </Box>
              </Link>
            ))}
          </Flex> : (
    <MenuItem>
      <Text fontSize="sm">No recent orders</Text>
    </MenuItem>
  )}
        </MenuList>
      </Menu>
      

      <Menu>
        {/* <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdInfoOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton> */}
        
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: '30px', md: 'unset' }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: 'unset' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex flexDirection="column">
            <Link w="100%" href="/">
              <Button w="100%" h="44px" mb="10px" variant="brand">
                SLR 
              </Button>
            </Link>
            <Link
              w="100%"
              href="/"
            >
              <Button
                w="100%"
                h="44px"
                mb="10px"
                border="1px solid"
                bg="transparent"
                borderColor={borderButton}
              >
                see products
              </Button>
            </Link>
            <Link
              w="100%"
              href="/"
            >
              <Button
                w="100%"
                h="44px"
                variant="no-hover"
                color={textColor}
                bg="transparent"
              >
                check out products
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      {/* <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button> */}
      <Menu>
        <MenuButton p="0px" style={{ position: 'relative' }}>
          <Box
            _hover={{ cursor: 'pointer' }}
            color="white"
            bg="#399f7f"
            w="40px"
            h="40px"
            borderRadius={'50%'}
          />
          <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
            <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
            {user && user.first_name && user.last_name
            ? `${user.first_name.slice(0, 1)}${user.last_name.slice(0, 1)}`
            : "user"}
            </Text>
          </Center>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {user.first_name+user.last_name}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm" onClick={()=>handleLogout()}>Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
