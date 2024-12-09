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
    Select,Checkbox} from '@chakra-ui/react';
import { UploadFiles ,get} from '@/utils/url/api';
import { UploadFileEndPoint,getFileUrlEndPoint,updateBrandEndPoint } from '@/utils/url/url';
import { Update } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';
  

interface UserEditFormProps {
  Brand:any;
  onSave: (updatedUser) => void;
  onCancel: () => void;
  updateBrand,
  setAddNewBrand:any
}

const CreateNewBrandForm: React.FC<UserEditFormProps> = ({ Brand, onSave, onCancel,updateBrand}) => {
  const [NewBrand, setNewBrand] = useState(Brand);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUploaded,setFileUpload]=useState(null)
  const toast=useCustomToast()

  useEffect(() => {
    setNewBrand(Brand);
  }, [Brand]);

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData=new FormData()
    formData.append("file",file)
    const header={"Content-Type":"multipart/form-data"}
    const response:any = await UploadFiles(UploadFileEndPoint,  formData, header);
    const response1:any =await get(getFileUrlEndPoint+response.data.id+"/",{})
    setFileUpload(response.data)
    const brand_image={id:response.data.id,uuid:response.data.uuid,file:"https://api.slrexports.com/"+response.data.file}
    setNewBrand({...NewBrand,brand_image:brand_image})
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NewBrand) {
      const { name, value } = e.target;
      setNewBrand({ ...NewBrand, [name]: value });
    }
  };


  const handleSave = async(e) => {
       e.preventDefault()
       onSave(NewBrand);
       setFileUpload(null)
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <form onSubmit={handleSave}>
      <FormControl w={"100%"} isRequired>
      <InputGroup >
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Brand Name</FormLabel>
      <Input w={"100%"} name="identity" value={NewBrand?.identity || ''} onChange={handleInputChange} placeholder="Brand Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Slug</FormLabel>
      <Input w={"100%"} name="slug" value={NewBrand?.identity || ''} onChange={handleInputChange} placeholder="Slug" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Brand Image</FormLabel>
      <Box w={"100%"} >
      <InputGroup>
        <InputLeftAddon>
         <Text as={"span"} >choose file</Text>
        </InputLeftAddon>
        <Input
          type="text"
          placeholder={selectedFile ? selectedFile.name : 'Choose a file'}
          isReadOnly
          onClick={openFileInput}
          cursor={"pointer"}
        />
        <InputRightElement width="5rem">
        </InputRightElement>
      </InputGroup>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </Box>
    {
    fileUploaded&&
    <Box py={"10px"}>
         <Img src={"https://api.slrexports.com"+fileUploaded.file} w={"100px"} h={"100px"}/>
     </Box>
    }
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Description</FormLabel>
      <Input w={"100%"} h={"60px"} name="description" value={NewBrand?.description || ''} onChange={handleInputChange} placeholder="description" />
      </Flex>
      </InputGroup>
      </FormControl>
      <Button mr={"20px"} size={"md"} colorScheme="teal" type='submit'>
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
  );
};

export default CreateNewBrandForm;
