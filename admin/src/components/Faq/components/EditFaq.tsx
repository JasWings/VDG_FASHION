import React, { useState, useEffect } from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Select,Checkbox} from '@chakra-ui/react';


 interface Faq {
    id: number;
    identity: string;
    description: string;
    is_active:boolean;
    uuid:string
}
  

interface FaqEditFormProps {
  faq: Faq| null;
  onSave: (updatedUser: Faq) => void;
  onCancel: () => void;
  setMessage:any
}

const FaqEditForm: React.FC<FaqEditFormProps> = ({ faq, onSave, onCancel,setMessage }) => {
  const [editedFaq, setEditedFaq] = useState<Faq | null>(faq);

  useEffect(() => {
    setEditedFaq(faq);
  }, [faq]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedFaq) {
      const { name, value } = e.target;
      setEditedFaq({ ...editedFaq, [name]: value });
    }
  };


  const handleSave = async() => {
    if (editedFaq) {
      onSave(editedFaq);
    }
  };

  return (
    <Box bg={"white"} shadow={"sm"} p={"20px"}>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Title</FormLabel>
      <Input w={"100%"} name="identity" value={editedFaq?.identity || ''} onChange={handleInputChange} placeholder="Title" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Description</FormLabel>
      <Input w={"100%"} name="description" value={editedFaq?.description || ''} onChange={handleInputChange} placeholder="description" />
      </Flex>
      </InputGroup>
      </FormControl>


      <Flex gap={"8px"}>
      <Button borderRadius={"8px"} colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Button borderRadius={"8px"} bg={"gray.500"} colorScheme="gray" onClick={onCancel}>
        Cancel
      </Button>
      </Flex>
    </Box>
  );
};

export default FaqEditForm;
