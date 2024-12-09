import {
    Flex,
    Link,
    List,
    ListItem,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function Footer(props: { [x: string]: any }) {
    let textColor = useColorModeValue('gray.400', 'white');
    let linkColor = useColorModeValue({ base: 'gray.400', lg: 'white' }, 'white');
    return (
      <Flex
        zIndex="3"
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        alignItems={{
          base: 'center',
          xl: 'start',
        }}
        justifyContent="space-between"
        px={{ base: '30px', md: '0px' }}
        pb="30px"
        {...props}
      >
        <Text
          color={textColor}
          textAlign={{
            base: 'center',
            xl: 'start',
          }}
          mb={{ base: '20px', lg: '0px' }}
        >
          {' '}
          &copy; {new Date().getFullYear()}
          <Text as="span" fontWeight="400" lineHeight={"24px"} fontSize={"16px"} ms="4px" color={"A3AED0"}>
            SLR Export. All Rights Reserved.
          </Text>
        </Text>
        <List display="flex">
          <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
          >
            <Link
              fontWeight="500"
              color={linkColor}
              href="/"
            >
              Support
            </Link>
          </ListItem>
          <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
          >
            <Link
              fontWeight="500"
              color={linkColor}
              href="/"
            >
              Privacy Policy
            </Link>
          </ListItem>
          <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
          >
            <Link
              fontWeight="500"
              color={linkColor}
              href="/"
            >
              Terms of Use
            </Link>
          </ListItem>
        </List>
      </Flex>
    );
  }
  