import React, { useState,useEffect } from 'react';
import {
  Input,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Text,
  Flex,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { CreateTagEndPoint } from '@/utils/url/url';
import { CreateNewTag } from '@/utils/url/api';
import { useCustomToast } from '@/components/toast/Toast';

function EditTagInput({ allTags ,setInputValue,setMatchedTags,selectedTags,setSelectedTags,inputValue,matchedTags,handleUpdateTags,productDetails,setProductDetails}) {
    const showToast=useCustomToast()
    const [showMatches,setShowMatches]=useState(false)


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const matchingTags = allTags.filter((tag) =>
      tag.identity.toLowerCase().includes(value.toLowerCase())
    );
    const matchedTagIdentities = matchingTags.map((tag) => tag);

    setMatchedTags(matchedTagIdentities);
  };

  const handleTagSelect = (tag) => {
    setSelectedTags([...selectedTags, {identity:tag.identity,id:tag.id}]);
    productDetails.tags.push(tag.id)
    console.log(productDetails,tag)
    setInputValue('');
    setMatchedTags([]);
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };
  const handleAddTagToDatabase = async(newTag) => {
    console.log(allTags)
    const updatedAllTags = [...allTags, { id: newTag, identity: newTag }];
    const header={
      "Content-Type": "application/json",
    }
    const response:any=await CreateNewTag(CreateTagEndPoint,{identity:newTag,slug:newTag},header)
    showToast({title:`Add New Tag successfully`,status:"success",position:"top"})
    handleUpdateTags()
    setInputValue("")
    setMatchedTags([]);
    setSelectedTags([...selectedTags, {identity:newTag,id:response?.id}]);
    productDetails?.tags.push(response?.id)
    console.log(updatedAllTags,allTags,newTag,selectedTags,productDetails)

  };


  return (
    <Box w={'100%'}>
      <VStack align="start" spacing={2}>
        <Flex flexDirection={'row'} gap={'5px'}>
          {selectedTags.map((tag,index) => (
            <Tag key={index} size="md" variant="solid" colorScheme="teal">
              <TagLabel>{tag.identity}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
        </Flex>
        <InputGroup>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add tags..."
          height={'46px'}
          focusBorderColor="#D2D2D2"
          onFocus={()=>setShowMatches(true)}
          onBlur={()=>matchedTags?.length===0&&setShowMatches(false)}
        />
        {inputValue.trim() && !allTags.some((tag) => tag.identity === inputValue) && (
        <InputRightElement mr={"3px"} pt={"7px"} w={"10%"}>
          <Button
            onClick={() => handleAddTagToDatabase(inputValue)}
            colorScheme="whatsapp"
            size={"xs"}
            p={"20px"}
            borderRadius={"5px"}
          >
            Add Tag
          </Button>
        </InputRightElement>
        )}
        </InputGroup>
        {
          matchedTags.length!==0&&matchedTags?.length!==allTags?.length&&showMatches&&<Box display={!showMatches&&"none"} shadow={"xl"} position={"absolute"} top={"74px"} h={"200px"} overflowY={"auto"} zIndex={"100"} bg={"white"} w={"64.2%"} borderRadius={"5px"}>
            {matchedTags.map((tag) => (
              <Text
                key={tag.id}
                onClick={() => handleTagSelect(tag)}
                cursor="pointer"
                color="#6B7280"
                p={"20px"}
                borderBottom={"1px solid #00000029"}
                _hover={{ bg:"blackAlpha.50" }}
              >
                {tag.identity}
              </Text>
            ))}
          </Box>
        }
      </VStack>
    </Box>
  );
}

export default EditTagInput;

