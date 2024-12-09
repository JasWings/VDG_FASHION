"use client"
import React, { useState } from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import UserRolesTable from '@/components/users/userRoles';
import { UseUserContext } from '@/context/UserContext';
import { get } from '@/utils/url/api';
import {  getUserRolesEndPoint} from '@/utils/url/url';


export default function UserRoles() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {userList,setUserList,userRoles,countryList,setUserRoles}=UseUserContext()

  const totalPages = Math.ceil(userRoles.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateUserRoles=async()=>{
    const UserRoles:any=await get(getUserRolesEndPoint,{})
    setUserRoles(UserRoles.results)
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = userRoles.slice(startIndex, endIndex);

  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <CSSReset />
        <UserRolesTable
          currentPage={currentPage}
          userRoles={userRoles}
          onPageChange={onPageChange}
          totalPages={totalPages}
          countries={countryList}
          updateUserRoles={updateUserRoles}
        />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
