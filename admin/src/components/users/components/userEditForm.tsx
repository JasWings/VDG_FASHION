import React, { useState, useEffect } from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Select,Checkbox} from '@chakra-ui/react';


interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number:string;
    country:string;
    email: string;
    role: string;
    is_active:boolean
  }
  

interface UserEditFormProps {
  user: User | null;
  countries:any;
  roles:any;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
  setMessage:any
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSave, onCancel,roles,countries,setMessage }) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editedUser) {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleSave = async() => {
    if (editedUser) {
      onSave(editedUser);
    }
  };

  return (
    <Box>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >First Name</FormLabel>
      <Input w={"100%"} name="first_name" value={editedUser?.first_name || ''} onChange={handleInputChange} placeholder="First Name" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Last Name</FormLabel>
      <Input w={"100%"} name="last_name" value={editedUser?.last_name || ''} onChange={handleInputChange} placeholder="Last Name" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Email</FormLabel>
      <Input w={"100%"} name="email" value={editedUser?.email || ''} onChange={handleInputChange} placeholder="Email" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Phone Number</FormLabel>
      <Input w={"100%"} name="phone_number" value={editedUser?.phone_number || ''} onChange={handleInputChange} placeholder="Email" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Country</FormLabel>
      <Select name="country" value={editedUser?.country || ''} onChange={handleSelectChange}>
        {countries.map((country) => (
          <option key={country.id} value={country.identity}>
            {country.identity}
          </option>
        ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Role</FormLabel>
      <Select name="role" value={editedUser?.role || ''} onChange={handleSelectChange}>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.identity}
          </option>
        ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>is Active</FormLabel>
      <Box w={"100%"}>
      <Checkbox isChecked={editedUser?.is_active} onChange={()=>setEditedUser({...editedUser,is_active:!editedUser.is_active})}  />
      </Box>
      </Flex>
      </InputGroup>
      </FormControl>

      <Button colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Button colorScheme="gray" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default UserEditForm;
