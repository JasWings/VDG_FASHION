import React, { useState, useEffect ,useRef} from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
} from '@chakra-ui/react';
import { getTagEndPoint } from '@/utils/url/url';
import { post} from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';
  

interface TagEditFormProps {
  onCancel: () => void;
  updateTags,
  setMessage:any,
  setNewFormCreate:any,
}

const CreateTagForm: React.FC<TagEditFormProps> = ({ onCancel,updateTags,setMessage,setNewFormCreate}) => {
  const [NewTag, setNewTag] = useState({identity:'',slug:'',description:''});
  const toast=useCustomToast()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NewTag) {
      const { name, value } = e.target;
      setNewTag({ ...NewTag, [name]: value });
    }
  };


  const handleSave = async() => {
      const header={
        "Content-Type":"application/json"
      }
      const Tag={identity:NewTag?.identity,slug:NewTag?.identity?.toLowerCase(),description:NewTag?.description}
      try {
        const update=await post(getTagEndPoint,Tag,header)
        toast({title:`Tag Created Successfully`,status:"success",position:"top"})
        // setMessage({show:true,message:`Tag Created Successfully`,state:"Create Tag"})
        updateTags()
        setNewFormCreate(false)
      } catch (error) {
        
      }
  };


  return (
    <Box>
      <form onSubmit={handleSave}>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Tag Name</FormLabel>
      <Input w={"100%"} name="identity" value={NewTag?.identity || ''} onChange={handleInputChange} placeholder="Tag Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Slug</FormLabel>
      <Input w={"100%"} readOnly name="slug" value={NewTag?.identity || ''} onChange={handleInputChange} placeholder="Slug" />
      </Flex>
      </InputGroup>
      </FormControl>
    
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Description</FormLabel>
      <Input w={"100%"} h={"60px"} name="description" value={NewTag?.description || ''} onChange={handleInputChange} placeholder="description" />
      </Flex>
      </InputGroup>
      </FormControl>
      <Button mr={"20px"} size={"md"} colorScheme="teal" borderRadius={"8px"} type='submit'>
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} borderRadius={"8px"} onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
  );
};

export default CreateTagForm;
