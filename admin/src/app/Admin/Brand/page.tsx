"use client"
import React, { useState } from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import UserListTable from '@/components/users/userList';
import { UseUserContext } from '@/context/UserContext';
import { get } from '@/utils/url/api';
import { getAllBrandEndPoint } from '@/utils/url/url';
import { useGlobalContext } from '@/context/productContext/productContext';
import BrandTable from '@/components/users/brand';


export default function Brands() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {userList,setUserList,userRoles,countryList}=UseUserContext()
  const {brand,updateBrands}=useGlobalContext()

  const totalPages = Math.ceil(brand.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateBrandList=async()=>{
    const AllBrands:any=await get(getAllBrandEndPoint,{})
    updateBrands(AllBrands.results)
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBrands = brand.slice(startIndex, endIndex);

  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <CSSReset />
        <BrandTable
          users={userList}
          currentPage={currentPage}
          userRoles={userRoles}
          onPageChange={onPageChange}
          totalPages={totalPages}
          countries={countryList}
          updateBrandList={updateBrandList}
          BrandList={paginatedBrands}
        />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
