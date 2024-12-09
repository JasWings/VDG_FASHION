import { Box,FormControl,FormLabel,Select,Input ,useColorModeValue,InputGroup,InputRightAddon,Text,Button, Flex} from "@chakra-ui/react";
import { useState } from "react";

const OrderSearchBar = ({selectedStatus,handleOnChangeStatus,handleDateFilter,isSearch,setIsSearch,setOrderList}) => {
    const placeholderText=useColorModeValue("gray.200","white")
    const borderColor=useColorModeValue("gray.200","white")
    const bg = useColorModeValue('white', 'navy.900')
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState(''); 

    const statusOptions = [
        { value: 'initiated', label: 'Initiated' },
        { value: 'placed', label: 'Placed' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        {value:"cancelled",label:"Cancelled"}
      ];

      const handleFilterByDate = () => {
        handleDateFilter( startDate, endDate);
      };

      const handleClearSearch=()=>{
            setIsSearch(false)
            setStartDate("")
            setEndDate("")
            setOrderList([])
      }
  

  return (
    <Box  display={"flex"} mr={"2px"} mt={{sm:"80px",lg:"20px"}}>
    <Box  w={"100%"} display={"flex"} gap={"20px"} flexDirection={{sm:"column","2sm":"column",lg:"row"}}  justifyContent={"space-between"} bg={bg} 
    style={{boxShadow:"14px 17px 40px 4px rgba(112, 144, 176, 0.08)"}} borderRadius={"20px"} p={"16px"}>
   <FormControl>
        <Select placeholder='Status' borderColor={borderColor} value={selectedStatus} onChange={(e)=>handleOnChangeStatus(e.target.value)} focusBorderColor="#E9ECEF" _placeholder={{textStyle:"fs4",color:placeholderText}} color={placeholderText} borderRadius={"12px"}  >
            {
              statusOptions?.map((i)=>(
                <option value={i.value} key={i.value}>{i.label}</option>
              ))
            }
        </Select>
   </FormControl>
   <FormControl>
    <Flex gap={"10px"}>
   <InputGroup>
        <Input
          type="date"
          placeholder="Start Date"
          borderColor={borderColor}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          focusBorderColor="#E9ECEF"
          color={placeholderText}
          borderRadius={"12px"}
          cursor={"pointer"}
          _hover={{
            cursor: "pointer"
          }}
        />
    </InputGroup>
    <InputGroup>
        <Input
          type="date"
          placeholder="End Date"
          borderColor={borderColor}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          focusBorderColor="#E9ECEF"
          color={placeholderText}
          borderRadius={"12px"}
          cursor={"pointer"}
        />
        {
         !isSearch?(
            <InputRightAddon cursor={"pointer"}>
            <Text onClick={handleFilterByDate} >Filter</Text>
          </InputRightAddon>
         ):
         <InputRightAddon cursor={"pointer"}>
         <Text onClick={handleClearSearch}>clear</Text>
       </InputRightAddon>

        }

      </InputGroup>
      </Flex>
      </FormControl>
    </Box>
    </Box>
  );
};

export default OrderSearchBar;
