import React, { useState, useEffect, use } from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
    Textarea,
    Select,Checkbox} from '@chakra-ui/react';
import { getAllUserListEndPoint,RegisteruserEndPoint,GetFAQ } from '@/utils/url/url';
import { register,post } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';

interface Faq {
    id: number;
    identity: string;
    description: string;
    is_active:boolean;
    uuid:string
  }

interface FaqEditFormProps {
  onCancel: () => void;
  setMessage:any,
  updateFaqList:any
}

const CreateNewFaq: React.FC<FaqEditFormProps> = ({   onCancel,setMessage,updateFaqList }) => {
  const [editedFaq, setEditedFaq] = useState({
    identity: "",
    description: ""
  });
  const toast=useCustomToast()



  const handleInputChange = (e: any) => {
    if (editedFaq) {
      const { name, value } = e.target;
      setEditedFaq({ ...editedFaq, [name]: value });
    }
  };


  const handleSave = async() => {
    event.preventDefault()
    const header={
        "Content-Type": "application/json",
    }
    try {
      const response=await post(GetFAQ,editedFaq,header)   
      toast({title:"Faq Created Successfully",status:"success",position:"top"})
      onCancel()
    } catch (error) {
      console.log(error,"error")
    }
    
   // setMessage({show:true,message:"Faq Created Successfully",state:"Create Faq"})
    updateFaqList()
  };

  return (
    <Box shadow={"sm"} p={"20px"} bg={"white"}>
      <form onSubmit={handleSave} method='post'>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Title</FormLabel>
      <Input w={"100%"} name="identity" value={editedFaq?.identity || ''} onChange={handleInputChange} type='text'  placeholder="Title" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Description</FormLabel>
      <Textarea w={"100%"} name="description" value={editedFaq?.description || ''} onChange={handleInputChange} placeholder="Description" />
      </Flex>
      </InputGroup>
      </FormControl>

      <Flex gap={"20px"}>
      <Button borderRadius={"8px"} type={"submit"} colorScheme="brand">
        Save
      </Button>
      <Button borderRadius={"8px"} bg={"gray.500"} onClick={onCancel}>
        Cancel
      </Button>
      </Flex>
      </form>
    </Box>
  );
};

export default CreateNewFaq;
