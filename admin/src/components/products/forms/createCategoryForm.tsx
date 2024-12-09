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
import { UploadFiles ,get,post} from '@/utils/url/api';
import { UploadFileEndPoint,getFileUrlEndPoint,getCategoryEndPoint } from '@/utils/url/url';
import { useCustomToast } from '@/components/toast/Toast';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import FileInput from '../components/fileUpload';

interface UserEditFormProps {
  category:any
  onSave: (updatedUser) => void;
  onCancel: () => void;
  updateCategories:any,
  setIsNewCreate:any,
  setMessage:any
}

const CreateNewCategoryForm: React.FC<UserEditFormProps> = ({  onSave, onCancel,updateCategories,category,setIsNewCreate,setMessage}) => {
  const [NewCategory, setNewCategory] = useState({identity:'',description:'',slug:"",base_category:'',image:null});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);
  const [fileUploaded,setFileUpload]=useState(null)
  const toast=useCustomToast()

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
       onSave(NewCategory);
       const header={"Content-Type":"application/json"}
       const cateObject={identity:NewCategory.identity,description:NewCategory?.description,slug:NewCategory.identity.toLowerCase(),base_category:NewCategory.base_category,image:NewCategory?.image}
       try {
        const response:any=await post(getCategoryEndPoint,cateObject,header)
        //setMessage({show:true,message:`Category Created Successfully`,state:"Create Category"})
        toast({title:response?.message,status:"success",position:"top"})
        updateCategories()
        setIsNewCreate(false)
        setFileUpload(null)
       } catch (error) {
         toast({position:"top",title:error,status:"error"})
       }

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
    <>
    <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={"Image"}
          details={"Upload your category image here"}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>
    <Box>
      <form onSubmit={handleSave}>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Category Name</FormLabel>
      <Input w={"100%"} name="identity" value={NewCategory?.identity || ''} onChange={handleInputChange} placeholder="Category Name" />
      </Flex>
      </InputGroup>
      </FormControl>
      <FormControl w={"100%"} isRequired>
      <InputGroup>
      <Flex flexDirection={"column"} w={"100%"} pb={"20px"}>
      <FormLabel w={"100%"} >Slug</FormLabel>
      <Input w={"100%"} readOnly name="slug" value={NewCategory?.identity || ''} onChange={handleInputChange} placeholder="Slug" />
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
    fileUploaded&&
    <Box py={"10px"}>
         <Img src={"https://api.slrexports.com"+fileUploaded.file} w={"100px"} h={"100px"}/>
     </Box>
    }
      </Flex>
      </InputGroup>
      </FormControl>

      <FormControl w={"100%"} >
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

      <Select name="role" value={NewCategory?.base_category || ''} onChange={handleSelectChange}>
        {category.map((cat) => (
          <option key={cat.id} value={cat.identity}>
            {cat.identity}
          </option>
        ))}
      </Select>
      </Flex>
      </InputGroup>
      </FormControl>

      <Button mr={"20px"} size={"md"} colorScheme="teal" type='submit' >
        Save
      </Button>
      <Button size={"md"} bg={"#9DA5B1"} onClick={onCancel}>
        Cancel
      </Button>
      </form>
    </Box>
    </>
  );
};

export default CreateNewCategoryForm;
