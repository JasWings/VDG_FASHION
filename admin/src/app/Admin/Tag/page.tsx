'use client'
import { Box, Heading, useFocusEffect } from '@chakra-ui/react';
import TagTable from '@/components/products/components/TagTable';
import { useGlobalContext } from '@/context/productContext/productContext';
import { useState } from 'react';
import { get } from '@/utils/url/api';
import { getTagEndPoint } from '@/utils/url/url';

const TagPage = () => {
    const itemsPerPage=10;
    const {tags,updateTags}=useGlobalContext()
    const [currentPage,setCurrentPage] = useState(1)

    const UpdateTagList=async()=>{
      const AllTags: any = await get(getTagEndPoint,{});
      console.log(AllTags,"allTags")
      updateTags(AllTags.data)
    }

    const totalPages=Math.ceil(tags.length/itemsPerPage)

    const onPageChange=(page:number)=>{
          setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTags = tags.slice(startIndex, endIndex);

    const calculateSerialNumber = (index: number) => {
      return (currentPage - 1) * itemsPerPage + index + 1;
    };

  return (
    <Box p={4}>
      <TagTable 
      tags={paginatedTags} 
      onPageChange={onPageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      updateTags={UpdateTagList}
      calculateSerialNumber={calculateSerialNumber}
      />
    </Box>
  );
};

export default TagPage;
