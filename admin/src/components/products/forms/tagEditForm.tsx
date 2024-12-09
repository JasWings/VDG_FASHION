import React, { useState, useEffect ,useRef} from 'react';
import { Box, 
    Button, 
    Input, 
    InputGroup,
    FormControl, 
    FormLabel,Flex ,
} from '@chakra-ui/react';
import { getTagEndPoint } from '@/utils/url/url';
import { Update } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';
  

interface TagEditFormProps {
  Tag:any;
  onCancel: () => void;
  updateTags,
  setMessage:any,
  setEditModalOpen:any,
  setSelectedTag:any
}

const TagEditForm: React.FC<TagEditFormProps> = ({ Tag, onCancel,updateTags,setMessage,setEditModalOpen,setSelectedTag}) => {
  const [NewTag, setNewTag] = useState(Tag);
  const toast=useCustomToast()

  useEffect(() => {
    setNewTag(Tag);
  }, [Tag]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NewTag) {
      const { name, value } = e.target;
      setNewTag({ ...NewTag, [name]: value });
    }
  };


  const handleSave = async(e) => {
      e.preventDefault()
      const newTag={identity:NewTag?.identity,slug:NewTag?.identity?.toLowerCase(),description:NewTag?.description}
      if(NewTag?.identity?.length===0){
        toast({position:"top",title:"Tittle is Required",status:"warning"})
        return;
      }
      const update=await Update(getTagEndPoint,NewTag.uuid,newTag)
      toast({position:"top",title:"Tag Updated Successfully",status:"success"})
      //setMessage({show:true,message:`Tag Updated Successfully`,state:"Update Tag"})
      updateTags()
      setEditModalOpen(false)
      setSelectedTag(null)
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
      <Input w={"100%"} name="slug" value={NewTag?.identity || ''} onChange={handleInputChange} placeholder="Slug" />
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
      <Button mr={"20px"} size={"md"} colorScheme="teal" borderRadius={"8px"} type='submit' >
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} borderRadius={"8px"} onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
  );
};

export default TagEditForm;
