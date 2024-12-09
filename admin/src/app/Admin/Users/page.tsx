"use client"
import React, { useState } from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import UserListTable from '@/components/users/userList';
import { UseUserContext } from '@/context/UserContext';
import { get } from '@/utils/url/api';
import { getAllUserListEndPoint } from '@/utils/url/url';


export default function Users() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {userList,setUserList,userRoles,countryList}=UseUserContext()

  const totalPages = Math.ceil(userList.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateUserList=async()=>{
    const allUser:any=await get(getAllUserListEndPoint,{})
    setUserList(allUser.results)
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = userList.slice(startIndex, endIndex);

  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <>
        <CSSReset />
        <UserListTable
          users={paginatedUsers}
          currentPage={currentPage}
          userRoles={userRoles}
          onPageChange={onPageChange}
          totalPages={totalPages}
          countries={countryList}
          updateUserList={updateUserList}
        />
        </>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
