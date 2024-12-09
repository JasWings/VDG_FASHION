
import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useColorMode,Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CustomPagination from '../pagination/customPagination';
import {Update} from "@/utils/url/api"
import { updateUserEndPoint,GetFAQ } from '@/utils/url/url';
import CustomModal from '../modal/customModal';
import CreateNewFaq from './components/CreateFaq';
import FaqEditForm from './components/EditFaq';
import { FiEdit, } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Delete } from '@/utils/url/api';
import { useCustomToast } from '../toast/Toast';
import ConfirmationModal from '../modal/deleteModal';
import {AiOutlineEye} from  "react-icons/ai"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';


export interface Faq {
    id: number;
    identity: string;
    description: string;
    is_active:boolean;
    uuid:string
  }
  

interface FaqListTableProps {
    faqList: Faq[];
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    updateFaqList:()=>void
  }
  

const FaqListTable: React.FC<FaqListTableProps> = ({ faqList,currentPage, onPageChange, totalPages,updateFaqList }) => {
  const [editedFaq, setEditedFaq] = useState<Faq | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message,setMessage]=useState({show:false,state:"",message:""})
  const [createNewUser,setCreateNewUser]=useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaq,setSelectedFaq]=useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedFaqForView, setSelectedFaqForView] = useState<Faq | null>(null);

  const handleViewDetails = (faq: Faq) => {
    setSelectedFaqForView(faq);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedFaqForView(null);
  };

  const toast=useCustomToast()
  const { colorMode } = useColorMode();

  const handleEditUser = (user: Faq) => {
    setEditedFaq(user);
    setIsEditing(true);
  };

  
  const handleSaveUser = async(updatedUser: Faq) => {
    await Update(GetFAQ,updatedUser.uuid,updatedUser)
    setMessage({show:true,message:"User Updated Successfully",state:"User Update"})
    updateFaqList()
    setIsEditing(false);
    setEditedFaq(null);
  };

  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedFaq(null);
  };



  const handleCalcelCreate=()=>{
       setCreateNewUser(false)
  }

  const handleAddNewUser=()=>{
        setCreateNewUser(true)
  }

  const handleDelete=async(product)=>{
        try {
          const response:any=await Delete(GetFAQ,product.uuid+"/")
          toast({position:"top",status:"success",title:"deleted successfully"})
          updateFaqList()
          setCreateNewUser(false)
        } catch (error) {
          console.log(error,"error")
        }
  }

  return (
    <>
    {<ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false);}} message={`Are You sure want to delete?`} onConfirm={()=>handleDelete(selectedFaq)} />}
    <Box p={4}>
      {message.show&&<CustomModal message={message.message} isOpen={message.show} state={message.state} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
          FAQ
        </Box>
        {
        !createNewUser&&<Button bg={"#399f7f"} _hover={{bg:"brand.500"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={handleAddNewUser}>
          Add New
        </Button>
        }
      </Box>
      {isEditing || createNewUser ? (
          isEditing?
          <FaqEditForm setMessage={setMessage} faq={editedFaq}  onSave={handleSaveUser} onCancel={handleCancelEdit} />
          :
          <CreateNewFaq updateFaqList={updateFaqList} setMessage={setMessage}  onCancel={handleCalcelCreate}   />
      ) : (
        <Table variant="simple" bg={colorMode === 'light' ? '#4F5D73' : 'gray.200'}>
         <Thead color={"white"}>
           <Tr color={"white"}>
             <Th color={"white"} fontWeight={700} fontSize={14}>Id</Th>
             <Th color={"white"} fontWeight={700} fontSize={14}>Title</Th>
             <Th color={"white"} fontWeight={700} fontSize={14}>Subject</Th>
             <Th color={"white"} fontWeight={700} fontSize={14}>Action</Th>
           </Tr>
         </Thead>
          <Tbody bg={colorMode === 'light' ? 'white' : 'gray.300'}>
            {faqList.map((faq) => (
              <Tr key={faq?.id}>
                <Td fontWeight={500}>{faq?.id}</Td>
                <Td fontWeight={500}>{faq?.identity?.slice(0,50)}{faq?.identity?.length>50&&"..."}</Td>
                <Td fontWeight={500}>{faq?.description.slice(0,50)}{faq?.description?.length>50&&"..."}</Td>
                <Td>
                  <Box display={"flex"} gap={"8px"}>
                  <Tooltip label={"Edit"}>
                  <Button  size="sm" borderRadius={"8px"} _hover={{bg:"brand"}}  colorScheme="brand" onClick={() => handleEditUser(faq)}>
                    <FiEdit />
                  </Button>
                  </Tooltip>
                  <Tooltip label={"Delete"}>
                  <Button size="sm" borderRadius={"8px"} _hover={{bg:"red"}}  colorScheme="red" onClick={() => {setSelectedFaq(faq);setIsDeleteModalOpen(true)}}>
                    <RiDeleteBin6Fill />
                  </Button>
                  </Tooltip>
                  <Tooltip label={"view"}>
                  <Button size="sm" borderRadius={"8px"} _hover={{bg:"green.400"}}  colorScheme="green" onClick={()=>handleViewDetails(faq)}>
                    <AiOutlineEye />
                  </Button>
                  </Tooltip>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {!isEditing&&!createNewUser&&<CustomPagination  currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />}
    </Box>
    {selectedFaqForView && (
        <Modal isOpen={viewModalOpen} onClose={handleCloseViewModal} size={"4xl"} >
          <ModalOverlay />
          <ModalContent p={"20px"}>
            <ModalHeader>{selectedFaqForView.identity}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedFaqForView.description}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FaqListTable;

