import React, { useState, useEffect } from 'react';
import { Box, 
    Button, 
    Input, 
    Text,
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Grid,
    Select,Checkbox, CheckboxGroup, GridItem} from '@chakra-ui/react';
import { post} from "@/utils/url/api"
import {getRolesPermissionEndPoint} from '@/utils/url/url';
    

interface UserEditFormProps {
  role: any
  countries:any;
  roles:any;
  onSave: (updatedUser) => void;
  onCancel: () => void;
  initialPermissions:any
}

const RolesEditForm: React.FC<UserEditFormProps> = ({ role, onSave, onCancel,roles,countries ,initialPermissions}) => {
  const [editedUserRole, setEditedUserRole] = useState(role);
  const [permissions, setPermissions] = useState(initialPermissions);

  useEffect(() => {
    setEditedUserRole(role);
  }, [role]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUserRole) {
      const { name, value } = e.target;
      setEditedUserRole({ ...editedUserRole, [name]: value });
    }
  };


  const handleSave = async() => {
    const header={
      "Content-Type": "application/json",
    }
    const update:any=await post(getRolesPermissionEndPoint+editedUserRole.uuid+"/update_permissions/",JSON.stringify(permissions),header)
    if (editedUserRole) {
     onSave(editedUserRole);
    }
  };

  const handlePermissionChange = (module, operation, value) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module]: {
        ...prevPermissions[module],
        [operation]: value,
      },
    }));
  };

  return (
    <Box>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Role Name</FormLabel>
      <Input w={"100%"} name="identity" value={editedUserRole?.identity || ''} onChange={handleInputChange} placeholder="First Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl mb={"20px"}>
      <FormLabel w={"100%"} >Permissions</FormLabel>
        <CheckboxGroup>
        <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={"20px"}>
        {Object.keys(permissions).map((module) => (
        <GridItem key={module}  border={"1px solid black"} p={"20px"}>
          <Text as={"span"} fontSize={"1.25rem"}>{module}</Text>
          {Object.keys(permissions[module]).map((operation) => (
            <Flex key={operation} justifyContent={"space-between"} px={"70px"} >
              <CheckboxGroup>
              <FormLabel>{operation}</FormLabel>
              <input
              type="checkbox"
              checked={permissions[module][operation]}
              onChange={(e) => handlePermissionChange(module, operation, e.target.checked)}
              />
              </CheckboxGroup>
            </Flex>
          ))}
        </GridItem>
      ))}
              </Grid>
        </CheckboxGroup>
      </FormControl>
      <Button mr={"20px"} size={"md"} colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default RolesEditForm;
