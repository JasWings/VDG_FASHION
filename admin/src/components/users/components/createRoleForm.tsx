import React, { useState, useEffect ,useRef} from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    InputLeftAddon,
    InputRightElement,
    Text,
    Img,
    CheckboxGroup,
    GridItem,Grid,
    Select,Checkbox} from '@chakra-ui/react';
import { post} from '@/utils/url/api';
import { updateUserRolesEndPoint,getRolesPermissionEndPoint} from '@/utils/url/url';
  


const initialPermissions = {
  product: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  order: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  customer: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  invoice: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  user_management: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  payment: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  meta: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  cart: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
  wishlist: {
    create: false,
    update: false,
    retrieve: false,
    delete: false,
  },
};

interface UserEditFormProps {
  newRoleObject:any,
  setNewRoleObject:any,
  onSave: (updatedUser) => void;
  onCancel: () => void;
  updateUserRoles:any,
  setAddNewRole:any,
  setMessage:any
}

const CreateNewRoleForm: React.FC<UserEditFormProps> = ({ newRoleObject,setNewRoleObject, onSave, onCancel,updateUserRoles,setAddNewRole,setMessage}) => {
  const [NewRole, setNewRole] = useState({identity:"",permission:{
    product: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    order: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    customer: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    invoice: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    user_management: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    payment: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    meta: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    cart: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
    wishlist: {
      create: false,
      update: false,
      retrieve: false,
      delete: false,
    },
  }});
  const [permissions, setPermissions] = useState(initialPermissions);

  const handlePermissionChange = (module, operation, value) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module]: {
        ...prevPermissions[module],
        [operation]: value,
      },
    }));
  };


  useEffect(() => {
    setNewRole(newRoleObject);
  }, [newRoleObject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NewRole) {
      const { name, value } = e.target;
      setNewRole({ ...NewRole, [name]: value });
    }
  };


  const handleSave = async() => {
       //onSave(NewRole);
       setNewRole({...NewRole,permission:permissions})
       const header={"Content-type":"application/json"}
       const response:any=await post(updateUserRolesEndPoint,NewRole,header)
       const update:any=await post(getRolesPermissionEndPoint+response.uuid+"/update_permissions/",JSON.stringify(permissions),header)
       setMessage({show:true,message:"Role & Permisson Created Successfully",state:"Create Role"})
       setAddNewRole(false)
       
  };


  return (
    <Box>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Role Name</FormLabel>
      <Input w={"100%"} name="identity" value={NewRole?.identity || ''} onChange={handleInputChange} placeholder="Role Name" />
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
        Back
      </Button>
    </Box>
  );
};

export default CreateNewRoleForm;
