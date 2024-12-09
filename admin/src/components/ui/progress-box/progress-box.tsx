import { CheckMark } from '@/components/icons/checkmark';
import cn from 'classnames';
import Scrollbar from '@/components/ui/scrollbar';
import styles from './progress-box.module.css';
import { Box, Flex, Text } from "@chakra-ui/react";

type ProgressProps = {
  data: any[] | undefined;
  status: string;
  filledIndex: number;
};

const ProgressBox: React.FC<ProgressProps> = ({
  status,
  data,
  filledIndex,
}) => {
  return (
    <Scrollbar
      style={{width:"100%",height:"100%"}}
      options={{
        scrollbars: {
          autoHide: 'never',
        },
      }}
    >
<Flex width="100%" direction={"row"} py={7} alignItems={["start", "start"]} justifyContent={["center"]}>
      {data?.map((item: any, index: number) => (
        <Flex key={`order-status-${index}`} className="progress_container"
        width={["100%", "33.333%", "25%", "20%"]}  marginBottom={{sm:7, md: 0 }} flexDir={{ base: "column", md: "column" }} alignItems="center">
          <Flex
            className={index <= filledIndex ? "progress_wrapper checked" : "progress_wrapper"}
            position="relative"
            alignItems="center"
            justifyContent="center"
            w="100%"
            mb={4}
            width="100%"
            marginBottom={4}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bg="light"
              borderRadius="full"
              w="9"
              h="9"
              borderWidth="1px"
              pr={index<=filledIndex&&"8px"}
              borderColor="accent"
              fontWeight="bold"
              color={index <= filledIndex ? "white" : "accent"}
              fontSize="sm"
              width="9"
              height="9"
              display="flex"
              backgroundColor={index<= filledIndex?"#009F7F":"#FFFFFF"}
              border={!(index<= filledIndex)?"1px dashed":"none"}
              zIndex={10}
            >
              {index <= filledIndex ? (
                <Box w="3" h="4" >
                    <CheckMark  className="w-full" />
                </Box>
              ) : (
                item.serial
              )}
            </Flex>
            <Box 
             position="absolute"
             backgroundColor="gray.100"
             left={{ base: "50%", md: 0, rtl: "auto" }}
             right={{ rtl: "50%", md: "auto" }}
             marginLeft={{ base: "-1px", md: 0, rtl: "1px" }}
             marginRight={{ rtl: "-1px" }}
             width={{ base: "full", md: "1", rtl: "1" }}
             height={{ base: "1", md: "1", rtl: "1" }}
             top={{ base: "50%", md: 0, rtl: "50%" }}
             marginTop={{ base: "-1px", md: 0, rtl: "1px" }}
             ></Box>
              {/* <Box
                w="50%"
                left="50%"
                bg={index <= filledIndex ? "#009F7F" : "gray.200"}
                position="absolute"
                height="2px"
              ></Box>
              <Box
                bg="#009F7F"
                position="absolute"
                height="2px"
                left={`${(index / data.length) * 100}%`}
                width={`${(1 / data.length) * 100}%`}
              ></Box> */}
             <Box w={index!==3&&"100%"} left={"50%"} bg={index<= filledIndex?"#009F7F":"gray.200"} position={"absolute"} height={"5px"}>

             </Box>

          </Flex>

          <Flex
            direction={["column", "column", "row"]}
            alignItems={["start", "center"]}
            ml={["5", "0"]}
            mr={["5", "0"]}
          >
            {item && (
              <Text
                fontSize="base"
                fontWeight="semibold"
                textTransform="capitalize"
                color="text-body-dark"
                textAlign={["left", "center"]}
                px={["2", "2"]}
              >
                {item?.name}
              </Text>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
    </Scrollbar>
  );
};

export default ProgressBox;
