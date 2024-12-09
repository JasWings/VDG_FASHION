
import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useColorMode ,Tooltip} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CustomPagination from '../pagination/customPagination';
import BrandEditForm from './components/brandEditForm';
import {Update,Delete,post} from "@/utils/url/api"
import { getAllProductEndPoint, updateBrandEndPoint,createNewBrandEndPoint} from '@/utils/url/url';
import ConfirmationModal from '../modal/deleteModal';
import CreateNewBrandForm from './components/createNewBrand';
import CustomModal from '../modal/customModal';
import { useCustomToast } from '../toast/Toast';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    country: string;
    email: string;
    role: string;
    is_active:boolean;
    uuid:string
  }
  

interface UserListTableProps {
    BrandList:any,
    countries:any,
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    updateBrandList:()=>void,
    users:any;
    userRoles:any;
  }
  

const BrandTable: React.FC<UserListTableProps> = ({  BrandList,currentPage, onPageChange, totalPages,countries,updateBrandList }) => {
  const [editedBrand, setEditedBrand] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [deletingBrand, setDeletingBrand] = useState(null);
  const [addNewBrand,setAddNewBrand]=useState(false)
  const [message,setMessage]=useState({show:false,state:"",message:""})
  const [newBrand,setNewBrand]=useState({
    identity:"",
    description:"",
    slug:"",
    is_active:true,
    brand_image:{

    }
  })
  const toast=useCustomToast()



  const { colorMode } = useColorMode();

  const handleEditBrand = (brand) => {
    setEditedBrand(brand);
    setIsEditing(true);
  };

  const handleDeleteBrand=async(brand)=>{
    setDeletingBrand(brand)
  }

  
  const handleSaveBrand = async(updatedbrand) => {
    const newBrand= {
      identity:updatedbrand?.identity,
      description:updatedbrand?.description,
      slug:updatedbrand?.identity?.toLowerCase(),
      is_active:true,
      brand_image:updatedbrand?.brand_image
    }

    try {
      const response:any=await Update(updateBrandEndPoint,updatedbrand.uuid,newBrand)
      toast({title:"Brand Updated Successfully",status:"success",position:"top"})
      updateBrandList()
      setIsEditing(false);
      setEditedBrand(null);
    } catch (error) {
      console.log(error,"error")
      toast({title:"something wrong try again",status:'error',position:"top"})
    }
  };

  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBrand(null);
  };

  const handleNewForm=()=>{
        setAddNewBrand(true)
  }

  const handleFormCancel=async()=>{
      setAddNewBrand(false)
  }

  const handleCreateNewForm=async(newbrand)=>{
        const header={
          "Content-Type": "application/json",
        }
       const newBrand= {
          identity:newbrand?.identity,
          description:newbrand?.description,
          slug:newbrand?.identity?.toLowerCase(),
          is_active:true,
          brand_image:newbrand?.brand_image
        }
        try {
          await post(createNewBrandEndPoint,newBrand,header)
          toast({title:"Brand Created Successfully",status:"success",position:"top"})
          updateBrandList()
          setAddNewBrand(false) 
        } catch (error) {
          console.log(error,"error")
          toast({title:"something wrong try again",status:'error',position:"top"})
        }
  } 



  return (
    <Box p={4}>
      {message.show&&<CustomModal message={message.message} state={message.state} isOpen={message.show} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize={"2.5rem"} as='h1' fontWeight="bold" color="gray.700">
          Brand Mangagement
        </Box>
        {!addNewBrand&&<Button bg={"#399f7f"} _hover={{bg:"#399f7f"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={handleNewForm}>
          Add New
        </Button>}
      </Box>
      {isEditing || addNewBrand ? (
        isEditing?
        <BrandEditForm Brand={editedBrand} setEditBrand={setEditedBrand} updateBrand={updateBrandList} imagePreview={imagePreview} setImagePreview={setImagePreview} countries={countries} brands={BrandList} onSave={handleSaveBrand} onCancel={handleCancelEdit} />
        :<CreateNewBrandForm Brand={addNewBrand} setAddNewBrand={setAddNewBrand} onCancel={handleFormCancel} onSave={handleCreateNewForm} updateBrand={updateBrandList} />
        
      ) : (
        <Table variant="simple" bg={colorMode === 'light' ? '#4F5D73' : 'gray.200'}>
         <Thead color={"white"}>
           <Tr color={"white"}>
             <Th color={"white"}>id</Th>
             <Th color={"white"}>name</Th>
             <Th color={"white"}>Action</Th>
           </Tr>
         </Thead>
          <Tbody bg={colorMode === 'light' ? 'white' : 'gray.300'}>
            {BrandList.map((brand) => (
              <Tr key={brand.id}>
                <Td>{brand.id}</Td>
                <Td>{brand.identity}</Td>
                <Td>
                  <Box display={"flex"} gap={"8px"}>
                  <Tooltip label={"edit"}>
                  <Button size="sm" mr={"20px"} color={"white"} bg="#399f7f" _hover={{bg:"#399f7f"}} onClick={() => handleEditBrand(brand)}>
                    <FiEdit />
                  </Button>
                  </Tooltip>
                  <Tooltip label={"delete"}>
                  <Button size="sm" colorScheme={"red"} onClick={() => handleDeleteBrand(brand)}>
                    <RiDeleteBin6Fill />
                  </Button>
                  </Tooltip>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {deletingBrand && (
      <ConfirmationModal
      isOpen={!!deletingBrand}
		  onConfirm={async()=>{
      await Delete(updateBrandEndPoint,deletingBrand.uuid+"/")
      toast({title:"Brand Deleted Successfully",status:"success",position:"top"})
			updateBrandList()
		  }}
      onClose={() => setDeletingBrand(null)}
      message={`Are you sure you want to delete ${deletingBrand.identity}?`}
      />
      )}
      {!isEditing&&!addNewBrand&&<CustomPagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />}
    </Box>
  );
};

export default BrandTable;

