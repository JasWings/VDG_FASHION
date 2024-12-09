
import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useColorMode ,Tooltip} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CustomPagination from '../pagination/customPagination';
import {Update,UpdateWithId} from "@/utils/url/api"
import { updateUserEndPoint ,GetAllContacts} from '@/utils/url/url';
import CustomModal from '../modal/customModal';
import ContactEditForm from './Components/ContactEditForm';
import ConfirmationModal from '../modal/deleteModal';
import { Delete } from '@/utils/url/api';
import { useCustomToast } from '../toast/Toast';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';


export interface Contact {
    id: number;
    description: string;
    name: string;
    phone_number: string;
    email: string;
    identity: string;
    is_active:boolean;
    uuid:string
  }
  

interface ContactListTableProps {
    Contacts: Contact[];
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    updateContactList:()=>void
  }
  

const ContactListTable: React.FC<ContactListTableProps> = ({ Contacts, currentPage, onPageChange, totalPages,updateContactList }) => {
  const [editedContact, setEditedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message,setMessage]=useState({show:false,state:"",message:""})
  const [createNewUser,setCreateNewUser]=useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast=useCustomToast()

  const { colorMode } = useColorMode();

  const handleEditUser = (user: Contact) => {
    setEditedContact(user);
    setIsDeleteModalOpen(true)
  };

  
  const handleSaveContact = async(updatedUser: Contact) => {
    await UpdateWithId(GetAllContacts,updatedUser)
    setMessage({show:true,message:"User Updated Successfully",state:"User Update"})
    updateContactList()
    setIsEditing(false);
    setEditedContact(null);
  };

  
  const handleCancelEdit = () => {
    setIsDeleteModalOpen(false)
    setIsEditing(false)
    setEditedContact(null);
  };

  const handleDelete=async()=>{
    try {
      const response:any=await Delete(GetAllContacts,editedContact.uuid+"/")
      toast({position:"top",status:"success",title:"deleted successfully"})
      updateContactList()
      setCreateNewUser(false)
    } catch (error) {
      console.log(error,"error")
    }
}




  return (
    <Box p={4}>
      {<ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false);}} message={`Are You sure want to delete?`} onConfirm={()=>{handleDelete()}} />}
      {message.show&&<CustomModal message={message.message} isOpen={message.show} state={message.state} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
          Contacts
        </Box>
      </Box>
      {isEditing || createNewUser ? (
          isEditing&&
          <ContactEditForm  contact={editedContact}  onSave={handleSaveContact} onCancel={handleCancelEdit} />
      ) : (
        <Table variant="simple" bg={colorMode === 'light' ? '#4F5D73' : 'gray.200'}>
         <Thead color={"white"}>
           <Tr color={"white"}>
             <Th fontWeight={700} fontSize={14} color={"white"}>Name</Th>
             <Th fontWeight={700} fontSize={14} color={"white"}>Email</Th>
             <Th fontWeight={700} fontSize={14} color={"white"}>Subject</Th>
             <Th fontWeight={700} fontSize={14} color={"white"}>Action</Th>
           </Tr>
         </Thead>
          <Tbody bg={colorMode === 'light' ? 'white' : 'gray.300'}>
            {Contacts.map((contact) => (
              <Tr key={contact?.id}>
                <Td fontWeight={500}>{contact?.name}</Td>
                <Td fontWeight={500}>{contact?.email}</Td>
                <Td fontWeight={500}>{contact?.identity}</Td>
                <Td >
                <Box display={"flex"} gap={"8px"}>
                  <Tooltip label={"delete"}>
                  <Button size="sm" borderRadius={"8px"} colorScheme="red" onClick={() => handleEditUser(contact)}>
                    <RiDeleteBin6Fill />
                  </Button>
                  </Tooltip>
                  <Tooltip label={"view"} >
                    <Button size="sm" borderRadius={"8px"} colorScheme='green'  onClick={()=>{setIsEditing(true);setEditedContact(contact)}}>
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
      {!isEditing&&<CustomPagination  currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />}
    </Box>
  );
};

export default ContactListTable;

