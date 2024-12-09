'use client'
import React,{useEffect} from 'react';
import {Box} from '@chakra-ui/react';
import Card from "@/components/card/Card"
import AddProductsTable from '@/components/products/addProducts';
import { useGlobalContext } from '@/context/productContext/productContext';
import { get } from '@/utils/url/api';
import { getCategoryEndPoint,getTagEndPoint ,getAllCountriesEndPoint} from '@/utils/url/url';
import { useObject } from '@/context/state/stateContext';
import { useProductDetails } from '@/context/productContext/productDetailsContext';
import { UseUserContext } from '@/context/UserContext';
import { Spinner } from '@chakra-ui/react';

const AddProducts: React.FC = () => {
  const {subcategories,categories,tags,brand,updateTags,CurrentNewProduct,setCurrentNewProduct}=useGlobalContext()
  const {countryList,setCountryList}=UseUserContext()
  const {toastObject,updateToastObject}=useObject()
  const {productDetails,setProductDetails}=useProductDetails()


  const handleUpdateTags=async()=>{
    const AllTags: any = await get(getTagEndPoint,{});
    updateTags(AllTags.results)
  }

  const UpdateCountryList=async()=>{
    const allCountries:any=await get(getAllCountriesEndPoint,{})
    setCountryList(allCountries.results)
  }

  useEffect(()=>{
    if(countryList?.length===0){
      UpdateCountryList()
    }
  },[countryList])

  const handleUpdateCategory=async()=>{
    const AllCategories:any =await get(getCategoryEndPoint,{})
  }

  // if(countryList?.length===0){
  //   return <Box display={"flex"} flexDirection={"column"} height={"100vh"} alignItems={"center"} flexFlow={"row"} justifyContent={"center"}>
  //     <Spinner 
  //      thickness='4px'
  //      speed='0.65s'
  //      emptyColor='gray.200'
  //      color='brand.500'
  //      size='xl'
  //     />
  //     </Box>
  // }

  return (
    <Box ml={"30px"}>
    <Card mt={"50px"} >
       <AddProductsTable 
       tags={tags} 
       categories={categories} 
       subCategories={subcategories} 
       brand={brand} 
       handleUpdateTags={handleUpdateTags}
       toastObject={toastObject}
       updateToastObject={updateToastObject}
       productDetails={productDetails}
       setProductDetails={setProductDetails}
       CurrentNewProduct={CurrentNewProduct}
       setCurrentNewProduct={setCurrentNewProduct}
       countryList={countryList}
       />
    </Card>
    </Box>
    
  );
};

export default AddProducts;
