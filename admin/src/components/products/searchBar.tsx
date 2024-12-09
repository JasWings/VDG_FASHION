import { Box,FormControl,FormLabel,Select,Input ,useColorModeValue,InputGroup,InputRightAddon,Text} from "@chakra-ui/react";
import { AiOutlineSearch,AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useRouter,usePathname } from "next/navigation";


const SearchBar = ({Categories, productName,
  setProductName,
  setCategoryName,
  CategoryName,
  handleSearchByName,
  setMathcesName,
  handleSearchByCategory,NameMathces,
  handleSearchClick,isSearch,handleClearSearch}) => {
    const placeholderText=useColorModeValue("gray.200","white")
    const borderColor=useColorModeValue("gray.200","white")
    const bg = useColorModeValue('white', 'navy.900')
    const router=useRouter()
    const pathname=usePathname()

  

  return (
    <Box  display={"flex"} ml={"25px"} mr={"2px"} mt={{sm:"80px",lg:"20px"}}>
    <Box  w={"100%"} display={"flex"} gap={"20px"} flexDirection={{sm:"column","2sm":"column",lg:"row"}}  justifyContent={"space-between"} bg={bg} 
    style={{boxShadow:"14px 17px 40px 4px rgba(112, 144, 176, 0.08)"}} borderRadius={"20px"} p={"16px"}>
    <FormControl>
    <InputGroup>
    <Input 
    placeholder='Search Product by name' 
    _placeholder={{color:borderColor}} borderColor={borderColor} 
    value={productName} 
    onChange={(e)=>handleSearchByName(e.target.value)} 
    focusBorderColor="#E9ECEF" 
    borderRadius={"12px"}  
    />
    {
    isSearch?
    <InputRightAddon onClick={()=>handleClearSearch()} cursor={"pointer"}>
    <AiOutlineClose />
    </InputRightAddon>
    :
    <InputRightAddon onClick={()=>handleSearchClick()} cursor={"pointer"}>
    <AiOutlineSearch />
    </InputRightAddon>
    }
    </InputGroup>
    <>
    {NameMathces?.length!==0&&<Box  shadow={"xl"} position={"absolute"} top={"74px"} h={"200px"} overflowY={"auto"} zIndex={"100"} bg={"white"} w={"100%"} borderRadius={"5px"}>
          {NameMathces?.map((name) => (
            <Text
              key={name.id}
              onClick={()=>{handleSearchByName(name.identity);setMathcesName([])}}
              cursor="pointer"
              color="#6B7280"
              p={"20px"}
              borderBottom={"1px solid #00000029"}
              _hover={{ bg:"blackAlpha.50" }}
            >
              {name.identity}
            </Text>
          ))}
        </Box>
  }
        </>
    </FormControl>
    <FormControl>
        <Select placeholder='Category' onChange={(e)=>handleSearchByCategory(e.target.value)} borderColor={borderColor} value={CategoryName} focusBorderColor="#E9ECEF" color={placeholderText} borderRadius={"12px"} _placeholder={{textStyle:"fs4",color:placeholderText}} >
        {
          Categories?.map((i)=>(
            <option>{i.identity}</option>
          ))
        }
        </Select>
    </FormControl>
    {/* <FormControl>
        <Select placeholder='Price' borderColor={borderColor} focusBorderColor="#E9ECEF" color={placeholderText} borderRadius={"12px"} _placeholder={{textStyle:"fs4",color:placeholderText}} >
        <option>United Arab Emirates</option>
        <option>Nigeria</option>
        </Select>
    </FormControl>
   <FormControl>
        <Select placeholder='Status' borderColor={borderColor} focusBorderColor="#E9ECEF" _placeholder={{textStyle:"fs4",color:placeholderText}} color={placeholderText} borderRadius={"12px"}  >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
   </FormControl> */}
    </Box>
    </Box>
  );
};

export default SearchBar;
