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
import { UploadFileEndPoint,getFileUrlEndPoint,getCategoryEndPoint } from '@/utils/url/url';
import { Update } from '@/utils/url/api';
  

interface UserEditFormProps {
  category:any,
  categories:any,
  onSave: (updatedUser) => void;
  onCancel: () => void;
  updateCategory:any,
  setIsEditModalOpen:any,
  setSelectedCategory:any,
  setMessage:any,
}

const EditCategoryForm: React.FC<UserEditFormProps> = ({  onSave, onCancel,updateCategory,category,categories,setIsEditModalOpen,setSelectedCategory,setMessage}) => {
  const [NewCategory, setNewCategory] = useState(category);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUploaded,setFileUpload]=useState(null)
  const [previewImage,setpreviewImage]=useState(null)

  useEffect(()=>{
     setNewCategory(category)
     const getImageDetails=async()=>{
      const response:any=await get(getFileUrlEndPoint+category.image+"/",{})
      setpreviewImage(response.data.file)
     }
     getImageDetails()
  },[category])

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData=new FormData()
    formData.append("file",file)
    const header={"Content-Type":"multipart/form-data"}
    const response:any = await UploadFiles(UploadFileEndPoint,  formData, header);
    const response1:any =await get(getFileUrlEndPoint+response.data.id+"/",{})
    setFileUpload(response.data)
    const brand_image=response.data.id
    setNewCategory({...NewCategory,image:brand_image})
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NewCategory) {
      const { name, value } = e.target;
      setNewCategory({ ...NewCategory, [name]: value });
    }
  };


  const handleSave = async(e) => {
    e?.preventDefault()

      //  onSave(NewCategory);
      const cateObject={identity:NewCategory.identity,description:NewCategory?.description,slug:NewCategory.identity.toLowerCase(),base_category:NewCategory.base_category,image:NewCategory?.image}
       await Update(getCategoryEndPoint,NewCategory.uuid,cateObject)
       setMessage({show:true,message:`Category Updated Successfully`,state:"Category Update"})
       updateCategory()
       setIsEditModalOpen(false)
       setFileUpload(null)
       setSelectedCategory(null)
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (NewCategory) {
      const { name, value } = e.target;
      setNewCategory({ ...NewCategory, [name]: value });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSave}>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Category Name</FormLabel>
      <Input w={"100%"} name="identity" value={NewCategory?.identity || ''} onChange={handleInputChange} placeholder="Brand Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Slug</FormLabel>
      <Input w={"100%"} readOnly name="slug" value={NewCategory?.slug || ''} onChange={handleInputChange} placeholder="Slug" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Category Image</FormLabel>
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
    previewImage&&
    <Box py={"10px"}>
         <Img src={"https://api.slrexports.com"+previewImage} w={"100px"} h={"100px"}/>
     </Box>
    }
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Description</FormLabel>
      <Input w={"100%"} h={"60px"} name="description" value={NewCategory?.description || ''} onChange={handleInputChange} placeholder="description" />
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"}>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"}>Base Category</FormLabel>

      <Select name="role" value={NewCategory?.id || ''} onChange={handleSelectChange}>
        {categories.map((cat) => (
            cat.identity!==NewCategory.identity&&<option key={cat.id} value={cat.id}>
            {cat.identity}
          </option>
            ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      <Button mr={"20px"} borderRadius={"8px"} size={"md"} colorScheme="teal" type='submit'>
        Save
      </Button>
      <Button size={"md"} borderRadius={"8px"} bg={"#9DA5B1"} onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
  );
};

export default EditCategoryForm;
