
import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useColorMode,Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CustomPagination from '../pagination/customPagination';
import UserEditForm from './components/userEditForm';
import RolesEditForm from './components/rolesEditForm';
import {Update,get, post} from "@/utils/url/api"
import { updateUserEndPoint ,getUserRolesEndPoint, updateUserRolesEndPoint} from '@/utils/url/url';
import CreateNewRoleForm from './components/createRoleForm';
import CustomModal from '../modal/customModal';
import { FiEdit, } from 'react-icons/fi';


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
    userRoles:any,
    countries:any,
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    updateUserRoles:()=>void
  }
  

const UserRolesTable: React.FC<UserListTableProps> = ({  userRoles,currentPage, onPageChange, totalPages,countries,updateUserRoles }) => {
  const [editedRole, setEditedRole] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [permission,setPermission]=useState(null)
  const [addNewRole,setAddNewRole]=useState(false)
  const [newRoleObject,setNewRoleObject]=useState({})
  const [message,setMessage]=useState({show:false,state:"",message:""})


  const { colorMode } = useColorMode();

  const handleEditUser = async(user) => {
    const permissions:any=await get(getUserRolesEndPoint+user.uuid+"/permissions/",{})
    setPermission(permissions)
    setEditedRole(user);
    setIsEditing(true);

  };

  
  const handleSaveUser = async(updatedUser) => {
    const response:any=await Update(updateUserRolesEndPoint,updatedUser.uuid,updatedUser)
    setMessage({show:true,message:"Role & Permissions Updated Successfully",state:"Role Update"})
    updateUserRoles()
    setIsEditing(false);
    setEditedRole(null);
  };

  const handleAddNew=()=>{
        setAddNewRole(true)
  }

  const handleAddRole=(addrole)=>{
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRole(null);
  };

  const handleCancelNew=()=>{
        setAddNewRole(false)
        setNewRoleObject(null)
  }



  return (
    <Box p={4}>
      {message.show&&<CustomModal state={message.state} message={message.message} isOpen={message.show} onClose={()=>setMessage({show:false,message:"",state:""})} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize={"2.5rem"} fontWeight="bold" color="gray.700">
          Roles & Permissions
        </Box>
        {!addNewRole&&<Button bg={"#399f7f"} _hover={{bg:"#399f7f"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={handleAddNew}>
          Add New
        </Button>
        }
      </Box>
      {isEditing || addNewRole ? (
        isEditing?
        <RolesEditForm initialPermissions={permission} role={editedRole} countries={countries} roles={userRoles} onSave={handleSaveUser} onCancel={handleCancelEdit} />
         :
         <CreateNewRoleForm setMessage={setMessage} newRoleObject={newRoleObject} setAddNewRole={setAddNewRole} setNewRoleObject={(setNewRoleObject)} onCancel={handleCancelNew} onSave={handleAddRole} updateUserRoles={updateUserRoles} />
        ) : (
        <Table variant="simple" bg={colorMode === 'light' ? '#4F5D73' : 'gray.200'}>
         <Thead color={"white"}>
           <Tr color={"white"}>
             <Th color={"white"} fontSize={14} fontWeight={700}>id</Th>
             <Th color={"white"} fontSize={14} fontWeight={700}>name</Th>
             <Th color={"white"} fontSize={14} fontWeight={700}>Action</Th>
           </Tr>
         </Thead>
          <Tbody bg={colorMode === 'light' ? 'white' : 'gray.300'}>
            {userRoles.map((role) => (
              <Tr key={role.id}>
                <Td fontWeight={500}>{role.id}</Td>
                <Td fontWeight={500}>{role.identity}</Td>
                <Td>
                  <Tooltip label={"edit"}>
                  <Button size="sm" colorScheme="teal" onClick={() => handleEditUser(role)}>
                    <FiEdit />
                  </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {!isEditing&&!addNewRole&&<CustomPagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />}
    </Box>
  );
};

export default UserRolesTable;

