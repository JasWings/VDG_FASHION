import { Button, ButtonGroup, Icon,Box,useColorModeValue } from "@chakra-ui/react";
import { FiUpload, FiDownload, FiPlus } from "react-icons/fi"; // Example icons from react-icons library

const TopBar = () => {
    const bg = useColorModeValue('white', 'navy.900')
    const textColor=useColorModeValue("gray.200","white")
    const buttonbg=useColorModeValue("gray.200","white")

  const handleImportClick = () => {
  };

  const handleExportClick = () => {
  };

  const handleAddProductClick = () => {
    window.location.href="/Admin/AddProducts"
  };

  return (
    <Box  display={"flex"} ml={"25px"} mr={"2px"} >
    <Box  w={"100%"} display={"flex"} flexDirection={{sm:"column","2sm":"column",lg:"row"}}  justifyContent={"flex-end"} bg={bg} 
    style={{boxShadow:"14px 17px 40px 4px rgba(112, 144, 176, 0.08)"}} borderRadius={"20px"} p={"16px"}>
      {/* <Box gap={"20px"} display={"flex"}>
      <Button
        leftIcon={<Icon as={FiUpload} />}
        colorScheme="gray"
        onClick={handleImportClick}
        bg={"#F4F7FE"}
        pt={"8px"}
        pb={"8px"}
        pl={"30px"}
        pr={"30px"}
        borderRadius={"8px"}
      >
        Import
      </Button>
      <Button
        leftIcon={<Icon as={FiDownload} />}
        colorScheme="gray"
        onClick={handleExportClick}
        bg={"#F4F7FE"}
        pt={"8px"}
        pb={"8px"}
        pl={"30px"}
        pr={"30px"}
        borderRadius={"8px"}
      >
        Export
      </Button>
      </Box> */}
      <Box>
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme="blue"
        onClick={handleAddProductClick}
        bg={"brand.500"}
        _hover={{bg:"brand.500"}}
        py={"8px"}
        px={"10px"}
        borderRadius={"8px"}
        display={window.location.pathname==="/Admin/Products/AddProducts"&&"none"}
      >
        Add Product
      </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default TopBar;
