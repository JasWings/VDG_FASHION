import { Box, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import theme from "@/theme/theme";
import { Update, UpdateWithId } from "@/utils/url/api";
import { GetAllOrders } from "@/utils/url/url";
import { useCustomToast } from "../toast/Toast";

const StatusBadgeWithDropdown = ({ currentStatus,updateOrderList,setIsLoading}) => {
  const Toast=useCustomToast()
  const statusOptions = [
    { value: 'initiated', label: 'Initiated', color: "#D69E2E"},
    { value: 'placed', label: 'Placed', color: '#48BB78' },
    { value: 'shipped', label: 'Shipped', color: '#B83280' },
    { value: 'delivered', label: 'Delivered', color: '#3399FF' },
    {value:"cancelled",label:"Cancelled",color:"#E3818A"}
  ];
  const onStatusChange=async(status)=>{
    // const Update=Update(GetAllOrders,)
    setIsLoading(true)
    const data={status:status}
    const update=await UpdateWithId(GetAllOrders+currentStatus.uuid+"/update-order/",data)
    updateOrderList()
    Toast({position:"top",title:"staus updated successfully",status:"success"})
    setIsLoading(false)
  }

  const selectedStatus = statusOptions.find((option) => option.value === currentStatus?.status);
  return (
    <Menu>
      <MenuButton
        as={Button}
        size={"sm"}
        rightIcon={<ChevronDownIcon />}
        bg={selectedStatus?.color}
        _hover={{bg:selectedStatus?.color}}
        color="white"
      >
        {selectedStatus?.label}
      </MenuButton>
      <MenuList>
        {statusOptions.map((status) => (
          <MenuItem
            key={status.value}
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusBadgeWithDropdown;
