
import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useColorMode, Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CustomPagination from '../pagination/customPagination';
import UserEditForm from './components/userEditForm';
import {Update,Delete} from "@/utils/url/api"
import { updateUserEndPoint } from '@/utils/url/url';
import CustomModal from '../modal/customModal';
import CreateNewUser from './components/createNewUser';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import ConfirmationModal from '../modal/deleteModal';
import { useCustomToast } from '../toast/Toast';


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
    users: User[];
    userRoles:any,
    countries:any,
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    updateUserList:()=>void
  }
  

const UserListTable: React.FC<UserListTableProps> = ({ users, userRoles,currentPage, onPageChange, totalPages,countries,updateUserList }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message,setMessage]=useState({show:false,state:"",message:""})
  const [createNewUser,setCreateNewUser]=useState(false)
  const [deleteModal,setDeleteModal]=useState(false)
  const toast=useCustomToast()

  const { colorMode } = useColorMode();

  const handleEditUser = (user: User) => {
    setEditedUser(user);
    setIsEditing(true);
  };

  
  const handleSaveUser = async(updatedUser: User) => {
    await Update(updateUserEndPoint,updatedUser.uuid,updatedUser)
    setMessage({show:true,message:"User Updated Successfully",state:"User Update"})
    updateUserList()
    setIsEditing(false);
    setEditedUser(null);
  };

  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleCreateUser=(user)=>{
  }

  const handleCalcelCreate=()=>{
       setCreateNewUser(false)
  }

  const handleAddNewUser=()=>{
        setCreateNewUser(true)
  }

  const getRole=(id:any)=>{
        const role=userRoles?.filter((i)=>i?.id===id)
        return role[0]?.identity
  }

  const DeleteUser=async()=>{
        try {
          await Delete(updateUserEndPoint,editedUser?.uuid)
          toast({title:"user deleted successfully",status:"success",position:"top"})
          updateUserList()      
        } catch (error) {
          console.log(error,"error")
        }
  }


  return (
    <>
    {deleteModal&&<ConfirmationModal isOpen={deleteModal} onClose={()=>setDeleteModal(false)} onConfirm={()=>{DeleteUser()}} message={`Are You sure want to delete?`} />}
    <Box p={4}>
      {message.show&&<CustomModal message={message.message} isOpen={message.show} state={message.state} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
          Users
        </Box>
        {!createNewUser&&<Button bg={"#399f7f"} _hover={{bg:"brand.500"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={handleAddNewUser}>
          Add New
        </Button>}
      </Box>
      {isEditing || createNewUser ? (
          isEditing?
          <UserEditForm setMessage={setMessage} user={editedUser} countries={countries} roles={userRoles} onSave={handleSaveUser} onCancel={handleCancelEdit} />
          :
          <CreateNewUser updateUserList={updateUserList} setMessage={setMessage} countries={countries} onCancel={handleCalcelCreate} onSave={handleCreateUser} roles={userRoles} />
      ) : (
        <Table variant="simple" bg={colorMode === 'light' ? '#4F5D73' : 'gray.200'}>
         <Thead color={"white"}>
           <Tr color={"white"}>
             <Th color={"white"} fontSize={14} fontWeight={500}>Name</Th>
             <Th color={"white"} fontSize={14} fontWeight={500}>Email</Th>
             <Th color={"white"} fontSize={14} fontWeight={500}>Role</Th>
             <Th color={"white"} fontSize={14} fontWeight={500}>Action</Th>
           </Tr>
         </Thead>
          <Tbody bg={colorMode === 'light' ? 'white' : 'gray.300'}>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td fontWeight={500}>{user.first_name + ' ' + user.last_name}</Td>
                <Td fontWeight={500}>{user.email}</Td>
                <Td fontWeight={500}>{getRole(user.role)}</Td>
                <Td>
                <Box display={"flex"} gap={"8px"}>
                  <Tooltip label={"edit"}>
                  <Button size="sm" bg={"#399f7f"} color={"white"} onClick={() => handleEditUser(user)}>
                    <FiEdit />
                  </Button>
                  </Tooltip>
                  <Tooltip label={"delete"}>
                  <Button size="sm" colorScheme='red' onClick={()=>{setDeleteModal(true);setEditedUser(user)}}>
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
      {!isEditing&&!createNewUser&&<CustomPagination  currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />}
    </Box>
    </>
  );
};

export default UserListTable;

