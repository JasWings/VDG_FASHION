'use client'
import { Box} from '@chakra-ui/react';
import { UseUserContext } from '@/context/UserContext';
import CountryTable from '@/components/country/countryTable';
import { useState } from 'react';
import { get } from '@/utils/url/api';
import { getAllCountriesEndPoint } from '@/utils/url/url';

const TagPage = () => {
    const itemsPerPage=10;
    const {countryList,setCountryList}=UseUserContext()
    const [currentPage,setCurrentPage] = useState(1)

    const UpdateCountryList=async()=>{
        const allCountries:any=await get(getAllCountriesEndPoint,{})
        setCountryList(allCountries.results)
    }
    const totalPages=Math.ceil(countryList.length/itemsPerPage)

    const onPageChange=(page:number)=>{
          setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountry = countryList.slice(startIndex, endIndex);

  return (
    <Box p={4}>
      <CountryTable 
      countries={paginatedCountry}
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalPages={totalPages}
      updateCountries={UpdateCountryList}
      />
    </Box>
  );
};

export default TagPage;
