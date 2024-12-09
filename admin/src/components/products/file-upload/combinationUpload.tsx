import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useColorModeValue ,Grid,FormControl,FormLabel} from '@chakra-ui/react';
import Card from "@/components/card/Card"
import { RiUploadCloud2Line } from 'react-icons/ri';
import CombinationDropzone from './combinationDropzone';
import CombinationUploadedImages from './CombinationUploadImage';
import { UploadFileEndPoint, updateBrandEndPoint } from '@/utils/url/url';
import { UploadFiles } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';


export default function CombinationUpload(props: { used?: number; total?: number; [x: string]: any,productDetails:any,setProductDetails:any}) {
	const { used, total,productDetails,setProductDetails, ...rest } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const brandColor = useColorModeValue('black', 'white');
  const useToast=useCustomToast()

  useEffect(()=>{
    const updateProductImages = (newImages: any[]) => {
      setProductDetails((prevProductDetails) => ({
        ...prevProductDetails,
        images: newImages,
      }));
    };
    updateProductImages(uploadedImages)
  },[])


  const handleFilesSelected =async(files) => {
    setSelectedFiles(files)
   try {
     const formData = new FormData();
     files.forEach((file, index) => {
     formData.append(`file`, file);
     });
     const header={
       'Content-Type': 'multipart/form-data', 
     }
     const response:any = await UploadFiles(UploadFileEndPoint,  formData,header );
     if (response.status==="success") {
      useToast({title:`Image Upload successfully!`,position:"top",status:response.status})
      const ImageObject={id:response.data.id,uuid:response.data.uuid,is_acitve:response.data.is_acitve,is_deleted:response.data.is_deleted,file:"https://api.slrexports.com"+response.data.file}
     setUploadedImages([...uploadedImages,ImageObject])
     const updateProductImages = (newImages: {}) => {
      setProductDetails((prevProductDetails) => ({
        ...prevProductDetails,
        images: newImages,
      }));
    };
    // updateProductImages(response.data)
     updateProductImages(ImageObject)

     } else {
     console.error('Upload failed:', response.status, response.statusText);
     useToast({title:"Failed Try Again",status:response.status,position:"top"})
     }
   } catch (error) {
     console.error('Error:', error);
     useToast({title:"Failed Try Again",status:"error",position:"top"})

   }
  };

  const handleDelete=(data)=>{
       const response:any= uploadedImages.map((i)=>i.id!==data.id)
       setUploadedImages(response)
  }
  

  return (
	<>
    <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}> 
    <FormLabel w={"50%"} textStyle={"fs6"} id='proimageid' htmlFor='dropzoneid231'>Product Images</FormLabel>
    <Flex w={"100%"} flexDirection={"column"}>
    <Card {...rest} mb='20px' p='5px' alignItems='center'>
      <Flex h='100%' w='100%' direction={{ base: 'column', '2xl': 'row' }}>
        <Box  w={{ base: '100%', '2xl': '100%' }} maxH={{ base: '60%', lg: '50%', '2xl': '100%' }} minH={{ base: '60%', lg: '50%', '2xl': '100%' }}>
          <CombinationDropzone
            content={
              <Box display={'flex'} flexDirection={"column"} alignItems={"center"}>
                <RiUploadCloud2Line size={46}   w='46px' h='46px' color={brandColor} />
                <Flex justify='center' mx='auto' mb='12px'>
                  <Text fontSize='xl' fontWeight='700' color='#747171'>
                    Drag your images here
                  </Text>
                </Flex>
                <Text fontSize='sm' fontWeight='500' color='#BDBDBD'>
                  PNG, JPG and GIF files are allowed
                </Text>
              </Box>
            }
            onFilesSelected={handleFilesSelected}
          />
        </Box>
      </Flex>
    </Card>
	<Flex>
	  <CombinationUploadedImages images={selectedFiles} selectedImages={uploadedImages} onSelectImage={(image) => {}} onDelete={handleDelete} />
	</Flex>
  </Flex>
  </FormControl>
	</>
  );
}

