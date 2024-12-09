import React ,{useState} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Button, Flex, FormControl, Select, Switch, Textarea } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { Skeleton } from '@chakra-ui/react';
import Truncate from '@/components/ui/truncate';
import { scroller} from 'react-scroll';
import { Table,Thead,Tr,Td,Tbody,Th } from '@chakra-ui/react';
import WeightBadges from './weightBadges';
import CategoryBadges from './categoryBadge';
import { productPlaceholder } from '@/utils/placeholders';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any; // Replace 'any' with the specific type/interface of your product data
}

const ProductViewModal: React.FC<ProductModalProps> = ({ isOpen, onClose,  productData }) => {
  if (!isOpen || !productData) return null;
  const [isImageLoad,setImageLoad]=useState(true)


  const handleModalClose = () => {
    onClose();
  };

  const handleSave = () => {
    onClose();
  };

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size={"6xl"}>
      <ModalOverlay  />
      <ModalContent >
        <ModalHeader>{'Product Details'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
          <Box className="rounded-lg bg-light">
      <Flex flexDir={{ base: 'column', md: 'row' }} >
        {productData?.thumb_image!==null||productData?.main_image!==null?<Box p={{ base: 6, md: 10 }} pt={{ base: 10, md: 0 }} w={{ base: 'full', md: '1/2' }}>
          {(
            <Box display="flex" flexDir="column" justifyContent="center">
              {isImageLoad && (
                // <Box className="bg-gray-300 animate-pulse" w="118px" h="300px"></Box>
                <Skeleton w={"448px"} h={"759px"} isLoaded={true}></Skeleton>
              )}
             <Image
                width={isImageLoad?0:448}
                height={isImageLoad?0:759}
                src={productData?.main_image===null?"https://api.slrexports.com"+productData?.thumb_image?.file:"https://api.slrexports.com"+productData?.main_image?.file}
                alt={productData?.identity}
                onLoad={() => setImageLoad(false)}
                style={{ opacity: isImageLoad ? '0' : '1' }}
              />
            </Box>
             
          )}
        </Box>
        :
        <Box p={{ base: 6, md: 10 }} pt={{ base: 10, md: 0 }} w={{ base: 'full', md: '1/2' }}>
        <Box display="flex" flexDir="column" justifyContent="center">
       <Image
          width={448}
          height={759}
          src={productPlaceholder}
          alt={productData?.identity}
        />
      </Box>
      </Box>
       }

        <Box p={{ base: 5, md: 10 }} pt={{ base: 10, md: 0 }} w={{ base: 'full', md: '1/2' }}>
          <Box w="full" >
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                fontWeight={600}
                fontSize={"18px"}
                lineHeight={"28px"}
                _hover={{ color: 'accent' }}
                // onClick={() => isModal && navigate(Routes.product(slug))}
              >
                {productData?.identity}
              </Text>
              {/* <FavoriteButton productId={id} className={isModal ? 'mr-1' : ''} /> */}
            </Flex>
            <Flex justifyContent="start" alignItems="center"  >
              <Text fontWeight={500}                 fontSize={"18px"}
                lineHeight={"28px"}  >SKU: {productData?.product_code}</Text>
            </Flex>
            <Flex alignItems="center" >
            {
              productData?.description&&(
                <Box marginTop={"12px"} fontWeight={400} fontSize={"16px"} lineHeight={"24px"}>
                </Box>
              )
            }
            {productData?.description && (
              <div className="mt-3 font-normal text-base leading-6 text-body md:mt-4">
                <Truncate
                  character={productData?.description?.length}
                  onClick={() => scrollDetails()}
                  compressText='Read More'
                >
                  {productData?.description}
                </Truncate>
              </div>
            )}
            </Flex>
            {productData?.weight_in_grams&&<WeightBadges weight={productData?.weight_in_grams} />}
            {productData?.category&&<CategoryBadges category={productData?.category?.identity} />}
            {
              productData?.product_prices&&(
                <Table variant="simple" colorScheme={"twitter"} mt={"12px"} borderTop={"1px"} borderColor={"#E5E7EB"}>
                <Thead>
                  <Tr>
                    <Th>Country</Th>
                    <Th>Actual Price</Th>
                    <Th>Current Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productData?.product_prices.map((price, index) => (
                    <Tr key={index}>
                      <Td>{price?.product_country?.identity}</Td>
                      <Td>{price?.product_country?.currency_symbol+price.actual_price}</Td>
                      <Td>{price?.product_country?.currency_symbol+price.current_price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              )
            }
          </Box>
        </Box>
      </Flex>
    </Box>
          </Flex>
        </ModalBody>
        { (
          <ModalFooter>
            <Button colorScheme="brand" _hover={{bg:"brand"}} borderRadius={"8px"} mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductViewModal;

