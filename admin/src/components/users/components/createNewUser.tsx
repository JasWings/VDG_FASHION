import React, { useState, useEffect } from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Select,Checkbox} from '@chakra-ui/react';
import { post } from '@/utils/url/api';
import { register } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';
import { CreateUserEndPoint } from '@/utils/url/url';

interface UserEditFormProps {
  countries:any;
  roles:any;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
  setMessage:any,
  updateUserList:any
}

const CreateNewUser: React.FC<UserEditFormProps> = ({  onSave, onCancel,roles,countries,setMessage,updateUserList }) => {
  const [editedUser, setEditedUser] = useState({
    first_name: '',
    last_name: '',
    phone_number:'',
    password:'',
    country:'',
    email: '',
    confirm_password:'',
    role:""
  });
  const toast=useCustomToast()


  console.log(countries,"countries")
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
    event.preventDefault()
    if(editedUser?.country.length===0){
      toast({position:"top",title:"Please select the country",status:"warning"})
      return
    }
    // await setEditedUser({...editedUser,phone_number:"+91"+editedUser.phone_number})
    const header={
        "Content-Type": "application/json",
    }
    const data={
      first_name: editedUser?.first_name,
      last_name: editedUser?.last_name,
      phone_number:"+91"+editedUser?.phone_number,
      password:editedUser?.password,
      country:editedUser?.country,
      email: editedUser?.email,
      confirm_password:editedUser.confirm_password,
      role:editedUser?.role
    }
    try {
      const response:any=await post(CreateUserEndPoint,data,header)
      // const response:any=await register(editedUser,header)
      console.log(response,"response",Object.values(response.data))
      if(response.status==="failed"){
        if(response.data){
          toast({position:"top",title:Object.values(response.data),status:"warning"})
        }
        toast({position:"top",title:response.message,status:"warning"})
      }
      toast({title:"User Created Successfully",position:"top",status:"success"})
      setMessage({show:true,message:"User Created Successfully",state:"Create User"})
      updateUserList()
    } catch (error) {
      setEditedUser({...editedUser,phone_number:""})
      if(error.data!==null&&error.data!==undefined){
        toast({position:"top",title:Object.values(error.data)[0],status:"warning"})
        return
      }
      toast({position:"top",title:error.message,status:"warning"})

    }

  };

  return (
    <Box>
      <form onSubmit={handleSave} method='post'>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >First Name</FormLabel>
      <Input w={"100%"} name="first_name" value={editedUser?.first_name || ''} onChange={handleInputChange} placeholder="First Name" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Last Name</FormLabel>
      <Input w={"100%"} name="last_name" value={editedUser?.last_name || ''} onChange={handleInputChange} placeholder="Last Name" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Email</FormLabel>
      <Input w={"100%"} name="email" type={"email"} value={editedUser?.email || ''} onChange={handleInputChange} placeholder="Email" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Phone Number</FormLabel>
      <Input w={"100%"} name="phone_number"  value={editedUser?.phone_number || ''} onChange={handleInputChange} placeholder="Phone Number" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Password</FormLabel>
      <Input w={"100%"} type={"password"} name="password" value={editedUser?.password || ''} onChange={handleInputChange} placeholder="Password" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Confirm Password</FormLabel>
      <Input w={"100%"} type={"password"} name="confirm_password" value={editedUser?.confirm_password || ''} onChange={handleInputChange} placeholder="Password" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Country</FormLabel>
      <Select name="country" value={editedUser?.country || ''} onChange={handleSelectChange}>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.identity}
          </option>
        ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Role</FormLabel>
      <Select name="role" value={editedUser?.role || ''} onChange={handleSelectChange}>
        {roles.map((country) => (
          <option key={country.uuid} value={country.id}>
            {country.identity}
          </option>
        ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      {/* <FormControl w={"100%"} isRequired>
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
      </FormControl> */}

      {/* <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>is Active</FormLabel>
      <Box w={"100%"}>
      <Checkbox isChecked={editedUser?.is_active} onChange={()=>setEditedUser({...editedUser,is_active:!editedUser.is_active})} />
      </Box>
      </Flex>
      </InputGroup>
      </FormControl> */}

      <Button type={"submit"} colorScheme="teal">
        Save
      </Button>
      <Button colorScheme="gray" onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
  );
};

export default CreateNewUser;
