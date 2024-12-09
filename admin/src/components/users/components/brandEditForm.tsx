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
  

interface UserEditFormProps {
  Brand:any;
  brands:any;
  countries:any;
  onSave: (updatedUser) => void;
  onCancel: () => void;
  imagePreview:any,
  setImagePreview:any,
  updateBrand,
  setEditBrand
}

const BrandEditForm: React.FC<UserEditFormProps> = ({ Brand, onSave, onCancel,countries,imagePreview,setImagePreview,updateBrand,setEditBrand}) => {
  const [editedBrand, setEditedBrand] = useState(Brand);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUploaded,setFileUpload]=useState(null)

  useEffect(() => {
    setEditedBrand(Brand);
  }, [Brand]);

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData=new FormData()
    formData.append("file",file)
    const header={"Content-Type":"multipart/form-data"}
    const response:any = await UploadFiles(UploadFileEndPoint,  formData ,header);
    const response1:any =await get(getFileUrlEndPoint+response.data.id+"/",{})
    setFileUpload(response.data)
    const brand_image={id:response.data.id,uuid:response.data.uuid,file:"https://api.slrexports.com/"+response.data.file}
    setEditedBrand({...editedBrand,brand_image:brand_image})
    await Update(updateBrandEndPoint,editedBrand.uuid,editedBrand.brand_image)
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedBrand) {
      const { name, value } = e.target;
      setEditedBrand({ ...editedBrand, [name]: value });
    }
  };


  const handleSave = async() => {
    setEditBrand(null)
       onSave(editedBrand);
       setFileUpload(null)
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Brand Name</FormLabel>
      <Input w={"100%"} name="identity" value={editedBrand?.identity || ''} onChange={handleInputChange} placeholder="Brand Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Slug</FormLabel>
      <Input w={"100%"} name="slug" readOnly value={editedBrand?.identity || ''} onChange={handleInputChange} placeholder="Slug" />
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
    <Box py={"10px"}>
        <Img src={fileUploaded?"https://api.slrexports.com"+fileUploaded.file:editedBrand&&editedBrand.brand_image&&editedBrand.brand_image.file} w={"100px"} h={"100px"}/>
    </Box>
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Description</FormLabel>
      <Input w={"100%"} h={"60px"} name="description" value={editedBrand?.description || ''} onChange={handleInputChange} placeholder="description" />
      </Flex>
      </InputGroup>
      </FormControl>
      <Button mr={"20px"} size={"md"} bg="#399f7f" colorScheme="brand.500" _hover={{bg:"#399f7f"}} onClick={handleSave}>
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} onClick={onCancel}>
        Back
      </Button>
    </Box>
  );
};

export default BrandEditForm;
