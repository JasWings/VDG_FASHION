import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Tooltip
} from "@chakra-ui/react";
import CustomPagination from "../pagination/customPagination";
import AddCountryForm from "./components/AddCountryForm";
import EditCountryForm from "./components/EditCountryForm"
import CustomModal from "../modal/customModal";
import { Update,post ,Delete} from "@/utils/url/api";
import { getAllCountriesEndPoint } from "@/utils/url/url";
import { useCustomToast } from "../toast/Toast";
import { FiEdit} from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import ConfirmationModal from "../modal/deleteModal";


const CountryTable = ({ countries,currentPage,onPageChange,totalPages ,updateCountries}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [message,setMessage]=useState({show:false,state:"",message:""})
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false)
    const toast=useCustomToast()


    const handleEditClick = (country) => {
        setSelectedCountry(country);
        setIsEditModalOpen(true);
      };
    
      const handleAddClick = () => {
        setIsAddModalOpen(true);
      };

    
      const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedCountry(null);
      };
    
      const handleAddModalClose = () => {
        setIsAddModalOpen(false);
      };
    
    
      const handleAddNewCountry = async(newCountry) => {
        const header={"Content-Type":"application/json"}
        await post(getAllCountriesEndPoint,newCountry,header)
        toast({title:"Country Created Successfully",status:"success",position:"top"})
        //setMessage({message:"Country Created Successfully",state:"Create Country",show:true})
        updateCountries()
        setIsAddModalOpen(false)
      };

      const handleUpdate=async(country)=>{
        await Update(getAllCountriesEndPoint,country.uuid,country)
        toast({title:"Country Updated Successfully",status:"success",position:"top"})
        // setMessage({show:true,message:"Country Updated Successfully",state:"Country Update"})
        updateCountries()
        setIsEditModalOpen(false)
        setSelectedCountry(null)
      }

      const handleDelete=async()=>{
            try {
              await Delete(getAllCountriesEndPoint,selectedCountry?.uuid)
              updateCountries()
              toast({title:"Country Deleted Successfully",status:"success",position:"top"}) 
            } catch (error) {
              console.log(error,"error")
              toast({title:error?.response?.message,status:"error",position:"top"})
            }
      }

  return (
    <>
      {isDeleteModalOpen&&<ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false);setSelectedCountry(null)}} onConfirm={()=>{handleDelete()}} message={`Are You sure want to delete?`} />}
      {message.show&&<CustomModal state={message.state} message={message.message} isOpen={message.show} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
          Countries
        </Box>
        {!isAddModalOpen&&<Button bg={"#399f7f"} _hover={{bg:"#399f7f"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={handleAddClick}>
          Add New
        </Button>
        }
      </Box>
      {
        isEditModalOpen || isAddModalOpen ?(
           isEditModalOpen?
           <EditCountryForm  country={selectedCountry} onUpdate={handleUpdate} onClose={handleEditModalClose}/>
           :
           <AddCountryForm onAdd={handleAddNewCountry} onClose={handleAddModalClose} />
        ):(
            <>
        <Table variant="simple">
        <Thead bg={"#4F5D73"}>
          <Tr>
            <Th color={"white"} fontWeight={700} fontSize={14}>S NO</Th>
            <Th color={"white"} fontWeight={700} fontSize={14}>Country</Th>
            <Th color={"white"} fontWeight={700} fontSize={14}>Currency</Th>
            <Th color={"white"} fontWeight={700} fontSize={14}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody bg={"white"}>
          {countries.map((country,index) => (
            <Tr key={country.id}>
              <Td fontWeight={500}>{index+1}</Td>
              <Td fontWeight={500}>{country.identity}</Td>
              <Td fontWeight={500}>{country.currency_name}</Td>
              <Td>
                <Box>
                <Tooltip label={"edit"}>
                <Button
                  colorScheme="brand"
                  _hover={{bg:"#399f7f"}}
                  mr={2}
                  onClick={() => handleEditClick(country)}
                  size={"sm"}
                  borderRadius={"8px"}
                >
                <FiEdit />
                </Button>
                </Tooltip>
                <Tooltip label={"delete"}>
                   <Button size={"sm"} colorScheme="red" borderRadius={"8px"} onClick={()=>{setIsDeleteModalOpen(true);setSelectedCountry(country)}}>
                     <RiDeleteBin6Fill />
                   </Button>
                </Tooltip>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
        )
      }
    </>
  );
};

export default CountryTable;
