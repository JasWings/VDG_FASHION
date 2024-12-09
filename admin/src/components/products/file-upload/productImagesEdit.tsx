import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useColorModeValue ,Grid,FormControl,FormLabel} from '@chakra-ui/react';
import Card from "@/components/card/Card"
import { RiUploadCloud2Line } from 'react-icons/ri';
import ProductDropzone from './productDropzone';
import ProductUploadedImages from './productUploadImage';
import { UploadFileEndPoint, updateBrandEndPoint ,getAllProductEndPoint} from '@/utils/url/url';
import { UploadFiles,Update } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';
import ProductEditUploadedImages from './productUploadImage1';


export default function ProductEditUpload(props: { used?: number; total?: number; [x: string]: any,productDetails:any,setProductDetails:any}) {
	const { used, total,productDetails,setProductDetails, ...rest } = props;
  const [selectedFiles, setSelectedFiles] = useState([productDetails?.images[0]]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const brandColor = useColorModeValue('black', 'white');
  const useToast=useCustomToast()

//   useEffect(()=>{
//     const updateProductImages = (newImages: any[]) => {
//       setProductDetails((prevProductDetails) => ({
//         ...prevProductDetails,
//         images: newImages,
//       }));
//     };
//     updateProductImages(uploadedImages)
//   },[])

  useEffect(()=>{
    const updateImages=()=>{
          productDetails.images.map((i)=>{uploadedImages.push(i.image)})
    }
    if(uploadedImages.length===0){
        updateImages()
    }
  },[uploadedImages])


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
        const ImageObject={id:response.data.id,uuid:response.data.uuid,is_acitve:response.data.is_acitve,is_deleted:response.data.is_deleted,file:response.data.file}
        const allImages={}
        uploadedImages.map((i,index)=>Object.assign(allImages,{[index]:i.uuid}))
        const imageUpdate={[uploadedImages.length]:response.data.uuid}
        Object.assign(allImages,imageUpdate)
        await Update(getAllProductEndPoint,`${productDetails.uuid}/update_product_images`,allImages)
      useToast({title:`Image Upload successfully!`,position:"top",status:response.status})
     setUploadedImages([...uploadedImages,ImageObject])
     const updateProductImages = (newImages: {}) => {
      setProductDetails((prevProductDetails) => ({
        ...prevProductDetails,
        images: uploadedImages,
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

  const handleDelete=async(data)=>{
       const response:any= uploadedImages.filter((i)=>i.id!==data.id)

       const allImages={}
       setUploadedImages(response)
       response?.map((i,index)=>Object.assign(allImages,{[index]:i.uuid}))
       await Update(getAllProductEndPoint,`${productDetails.uuid}/update_product_images`,allImages)
       useToast({title:"successfully removed",status:"success",position:"top"})
  }
  

  return (
	<>
    <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}> 
    <FormLabel w={"50%"} textStyle={"fs6"} id='proimageid' htmlFor='productdropzoneid231'>Product Images</FormLabel>
    <Flex w={"100%"} flexDirection={"column"}>
    <Card {...rest} mb='20px' p='5px' alignItems='center'>
      <Flex h='100%' w='100%' direction={{ base: 'column', '2xl': 'row' }}>
        <Box  w={{ base: '100%', '2xl': '100%' }} maxH={{ base: '60%', lg: '50%', '2xl': '100%' }} minH={{ base: '60%', lg: '50%', '2xl': '100%' }}>
          <ProductDropzone
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
	  <ProductEditUploadedImages images={selectedFiles} selectedImages={uploadedImages} onSelectImage={(image) => {}} onDelete={handleDelete} />
	</Flex>
  </Flex>
  </FormControl>
	</>
  );
}

