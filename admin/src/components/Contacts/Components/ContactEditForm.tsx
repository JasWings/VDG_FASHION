import React, { useState, useEffect } from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Select,Checkbox} from '@chakra-ui/react';



interface Contact {
        id: number;
        description: string;
        name: string;
        phone_number: string;
        email: string;
        identity: string;
        is_active:boolean;
        uuid:string
      }
  

interface UserEditFormProps {
  contact: Contact | null;
  onSave: (updatedUser: Contact) => void;
  onCancel: () => void;
}

const ContactEditForm: React.FC<UserEditFormProps> = ({ contact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState<Contact | null>(contact);

  useEffect(() => {
    setEditedContact(contact);
  }, [contact]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedContact) {
      const { name, value } = e.target;
      setEditedContact({ ...editedContact, [name]: value });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editedContact) {
      const { name, value } = e.target;
      setEditedContact({ ...editedContact, [name]: value });
    }
  };

  const handleSave = async() => {
    if (editedContact) {
      onSave(editedContact);
    }
  };

  return (
    <Box>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Name</FormLabel>
      <Input readOnly w={"100%"} name="name" value={editedContact?.name || ''} onChange={handleInputChange} placeholder="First Name" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Email</FormLabel>
      <Input w={"100%"} readOnly name="email" value={editedContact?.email || ''} onChange={handleInputChange} placeholder="Email" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Phone Number</FormLabel>
      <Input w={"100%"} readOnly name="phone_number" value={editedContact?.phone_number || ''} onChange={handleInputChange} placeholder="Phone Number" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Subject</FormLabel>
      <Input w={"100%"} readOnly name="identity" value={editedContact?.identity || ''} onChange={handleInputChange} placeholder="Subject" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Description</FormLabel>
      <Input w={"100%"} readOnly name="identity" value={editedContact?.description || ''} onChange={handleInputChange} placeholder="Description" />
      </Flex>
      </InputGroup>
      </FormControl>


      {/* <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>is Active</FormLabel>
      <Box w={"100%"}>
      <Checkbox isChecked={editedContact?.is_active} onChange={()=>setEditedContact({...editedContact,is_active:!editedContact.is_active})}  />
      </Box>
      </Flex>
      </InputGroup>
      </FormControl> */}
      <Flex gap={"10px"}>
      {/* <Button borderRadius={"8px"} _hover={{bg:"brand"}} colorScheme="brand" onClick={handleSave}>
        Save
      </Button> */}
      <Button borderRadius={"8px"} color={"white"}  bg={"gray.500"} onClick={onCancel}>
        Close
      </Button>
      </Flex>
    </Box>
  );
};

export default ContactEditForm;
