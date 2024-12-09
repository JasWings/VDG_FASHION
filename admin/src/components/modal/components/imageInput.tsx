import React, { useState, useRef } from 'react';
import { Input, InputGroup, InputRightElement, Button,Text, Box, InputLeftAddon,Img, Flex,FormControl,FormLabel} from '@chakra-ui/react';
import { UploadFiles,get } from '@/utils/url/api';
import { UploadFileEndPoint,getFileUrlEndPoint } from '@/utils/url/url';

const ImageInput = ({title,id,productDetails,setProductDetails,imagePreview,setImagePreview,label,images}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [imagePreview, setImagePreview] = useState(null);


  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file)
    const formData=new FormData()
    formData.append("file",file)
    const header={"Content-Type":"multipart/form-data"}
    const response:any = await UploadFiles(UploadFileEndPoint,  formData, header);
    const response1:any =await get(getFileUrlEndPoint+response.data.id+"/",{})
    setProductDetails({...productDetails,[id]:response.data})
    setImagePreview({...images,[title]:"https://api.slrexports.com"+response1.data.file})
  };
  
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = () => {
    setProductDetails({...productDetails,[id]:null})
    setImagePreview({...images,[title]:null})
  };
  
  return (
    <>
    <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{sm:"column",md:"row"}} justifyContent={"space-between"} >
            <FormLabel w={{sm:"100%","2xl":"50%"}} textStyle={"fs6"}>{label}</FormLabel>
            <Flex w={"100%"} flexDirection={"column"}>
            <Box w={"100%"} key={title}>
            <InputGroup borderColor={selectedFile&&selectedFile.name&&"brand.500"}>
              <InputLeftAddon>
               <Text as={"span"} >{selectedFile&&selectedFile.name?"selected":"choose file"}</Text>
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
          {imagePreview?.image?.length!==0 && imagePreview?.image!==null ? (
             <Flex>
             <Box mt="10px">
               <Img src={imagePreview.image} alt="Preview" maxH="200px" />
             </Box>
             <Button
              colorScheme="red"
              onClick={clearFile}
              ml={"10px"}
              borderRadius={"8px"}
              mt={"10px"}
            >
            Clear
            </Button>
             </Flex>
             ):(
                <Text as={"span"}>No image found</Text>
             )
            }
            </Flex>
          </FormControl>
      </>
  );
};

export default ImageInput;
