import React from 'react';
import { Box, Checkbox, Flex, Image, VStack,Grid, Button } from '@chakra-ui/react';

function VariantUploadedImages({ images, selectedImages, onSelectImage,onDelete }) {
         
  return (
    <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={"20px"} >
      {selectedImages.map((image, index) => (
        <Flex key={index} position='relative' gap={"10px"} flexDirection={"column"} justifyContent={"center"}>
          <Image src={"https://api.slrexports.com/"+image.file} key={index} w={"100%"} alt={`Uploaded Image ${index + 1}`} h={"full"} maxH='100px' maxW='100px' />
          <Button colorScheme='red' size={"md"} borderRadius={"8px"} onClick={()=>onDelete(image)}>Delete</Button>
        </Flex>
      ))}
    </Grid>
  );
}

export default VariantUploadedImages;
