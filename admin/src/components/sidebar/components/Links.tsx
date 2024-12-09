import React ,{useState,useEffect}from 'react';
import { useCallback } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from '@/types/navigation';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionButton, AccordionPanel, AccordionItem } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { HStack } from '@chakra-ui/react';

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;
  const [showNested,setShowNested]=useState(false)

  
  
  const pathname = usePathname();


  let activeColor = useColorModeValue('brand.500', 'white');
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600',
  );
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');
   

  

  const createLinks = (routes: IRoute[]) => {


     
    
    const activeRoute = useCallback(
      (routeName: string) => {
        return pathname.toLocaleLowerCase()?.includes(routeName);
      },
      [pathname],
    );





    return routes.map((route, index: number) => {
      if (
        route.layout === '/Admin' ||
        route.layout === '/auth' 
      ) {
        return (
          <Link key={index} href={route.layout + route.path} passHref>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? 'bold'
                          : 'normal'
                      }
                    >
                      {route.name.toUpperCase()}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : 'transparent'
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </Link>
        );
      }
    });
  };

  
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;

