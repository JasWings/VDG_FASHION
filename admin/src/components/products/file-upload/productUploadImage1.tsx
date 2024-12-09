import React from 'react';
import { Box, Checkbox, Flex, Image, VStack,Grid, Button } from '@chakra-ui/react';

function ProductEditUploadedImages({ images, selectedImages, onSelectImage,onDelete }) {
  return (
    <>
    {selectedImages&&selectedImages[0]&&selectedImages[0].length!==0&&<Grid gridTemplateColumns={"repeat(4,1fr)"} gap={"20px"} >
      {selectedImages.map((image, index) => (
        image!==undefined&&<Flex key={index} position='relative'  gap={"10px"} flexDirection={"column"} justifyContent={"center"}>
          <Image src={"https://api.slrexports.com"+image?.file} display={image?.file===undefined&&"none"} key={index} w={"100%"} alt={`Uploaded Image ${index + 1}`} h={"full"} maxH='100px' maxW='100px' />
          <Button colorScheme='red' size={"md"} borderRadius={"8px"} display={image?.file===undefined&&"none"} onClick={()=>onDelete(image)}>Delete</Button>
        </Flex>
      ))}
    </Grid>
    }
    </>
  );
}

export default ProductEditUploadedImages;
