'use client';
import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import CheckTable from '@/views/admin/default/components/CheckTable';
import tableDataCheck from '@/views/admin/default/variables/tableDataCheck';
import { useGlobalContext } from '@/context/productContext/productContext';
import { useLoading } from '@/context/loadingContext';
import { useObject } from '@/context/state/stateContext';
import { get ,getWithQuery} from '@/utils/url/api';
import { updateProductEndPoint,getTagEndPoint ,getAllCountriesEndPoint} from '@/utils/url/url';
import { useEffect, useState } from 'react';
import CustomPagination from '@/components/pagination/customPagination';
import { useProductDetails } from '@/context/productContext/productDetailsContext';
import { useSearchParams ,useRouter} from 'next/navigation';
import SearchBar from '@/components/products/searchBar';
import { useCustomToast } from '@/components/toast/Toast';
import { Spinner } from '@chakra-ui/react';
import { UseUserContext } from '@/context/UserContext';

export default  function Default() {
  const itemsPerPage=10
  const [currentPage,setCurrentPage]=useState(1)
  const {allProducts,updateAllProducts,subcategories,categories,tags,brand,updateTags,CurrentNewProduct,setCurrentNewProduct}=useGlobalContext()
  const {toastObject,updateToastObject}=useObject()
  const {startLoading,stopLoading}=useLoading()
  const [MainProducts,setMainProducts]=useState([])
  const [VariantProducts,setVariantProducts]=useState([])
  const {productDetails,setProductDetails}=useProductDetails()
  const [productName,setProductName]=useState("")
  const [CategoryName,setCategoryName]=useState({})
  const [isLoading,setIsLoading]=useState(false)
  const [NameMathches,setNameMathces]=useState([])
  const [isSearch,setIsSearch]=useState(false)
  const pathname=useSearchParams()
  const router=useRouter()
  const toast=useCustomToast()
  const {countryList,setCountryList}=UseUserContext()

  const totalPages=Math.ceil(MainProducts.length/itemsPerPage)
  
  const handleStartLoading=()=>{
    startLoading()
  }

  const handleStopLoading=()=>{
      stopLoading()
  }

  const onPageChange=(page:number)=>{
        setCurrentPage(page)
  }

  useEffect(()=>{
    const updateProduct=async()=>{
          if(allProducts.length===0){
            const resonse:any=await get(updateProductEndPoint+"page-size=1000",{})
              updateAllProducts(resonse.results)
          }
    }
    updateProduct()
    const fileterProducts=()=>{
      const filteredResults:any =allProducts.filter((product) => product.is_variant === false);
      const filteredVariants:any=allProducts.filter((product)=>product.is_variant === true)
      setMainProducts(filteredResults)
      setVariantProducts(filteredVariants)
    }
    if(allProducts.length!==0&&MainProducts.length===0){
       fileterProducts()
    }
  })

  const handleSearchByName=(e:any)=>{
        setProductName(e)
        const getMathces=allProducts.filter((i)=>i.identity.toLowerCase().includes(e.toLowerCase()))
        if(getMathces.length!==allProducts.length){
           setNameMathces(getMathces)
        }
  }

  const handleSearchByCategory=async(e:any)=>{
      setCategoryName(e)
      setIsLoading(true)
      const resonse:any=await get(updateProductEndPoint,{})
      const data:any=await resonse?.results?.filter((i)=>i?.category?.identity===e)
      const filteredResults:any =data.filter((product) => product.is_variant === false);
      const filteredVariants:any=data.filter((product)=>product.is_variant === true)
      updateAllProducts(resonse.results)
      setMainProducts(filteredResults)
      setVariantProducts(filteredVariants)
      setIsLoading(false)
  }

  const handleClickSearch=async()=>{
        setIsLoading(true)
        const response:any=await getWithQuery(updateProductEndPoint,`?identity=${productName}`)
        // router.push(`?identity=${productName}`)
        if(response?.results?.length===0){
          toast({position:"top",status:"warning",title:"No matches found"})
          setIsLoading(false)
          return ;
        }
        const filteredResults:any =response.results.filter((product) => product.is_variant === false);
        const filteredVariants:any=response.results.filter((product)=>product.is_variant === true)
        updateAllProducts(response.results)
        setMainProducts(filteredResults)
        setVariantProducts(filteredVariants)
        setIsLoading(false)
        setIsSearch(true)
  }

  const handleClearSearch=()=>{
        setIsSearch(false)
        setProductName("")
        updateAllProducts([])
  }

  const updateProduct=async()=>{
      setIsLoading(true)
      const resonse:any=await get(updateProductEndPoint+"?page-size=1000",{})
      const filteredResults:any =resonse.results.filter((product) => product.is_variant === false);
      const filteredVariants:any=resonse.results.filter((product)=>product.is_variant === true)
      updateAllProducts(resonse.results)
      setMainProducts(filteredResults)
      setVariantProducts(filteredVariants)
      setIsLoading(false)
  }

  if(allProducts.length===0){
    updateProduct()
  }

  const UpdateCountryList=async()=>{
    const allCountries:any=await get(getAllCountriesEndPoint,{})
    setCountryList(allCountries.results)
  }

  if(countryList.length===0){
    UpdateCountryList()
  }

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = MainProducts.slice(startIndex, endIndex);

  const handleUpdateTags=async()=>{
    const AllTags: any = await get(getTagEndPoint,{});
    updateTags(AllTags.results)
  }

  

  if(isLoading || allProducts?.length ===0){
     return <Box display={"flex"} flexDirection={"column"} height={"100vh"} alignItems={"center"} flexFlow={"row"} justifyContent={"center"}>
      <Spinner 
       thickness='4px'
       speed='0.65s'
       emptyColor='gray.200'
       color='brand.500'
       size='xl'
      />
      </Box>
  }

  return (
    <>
    <SearchBar 
    Categories={categories}
    NameMathces={NameMathches}
    setMathcesName={setNameMathces}
    productName={productName}
    setProductName={setProductName}
    CategoryName={CategoryName}
    setCategoryName={setCategoryName}
    handleSearchByName={handleSearchByName}
    handleSearchByCategory={handleSearchByCategory}
    handleSearchClick={handleClickSearch}
    isSearch={isSearch}
    handleClearSearch={handleClearSearch}
    ></SearchBar>
    <Box pt={{ base: '130px', md: '80px', xl: '40px' }} ml={"32px"}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <CheckTable 
        tableData={tableDataCheck} 
        proudctList={paginatedProducts} 
        VariantProducts={VariantProducts}
        startLoading={handleStartLoading} 
        stopLoading={handleStopLoading}
        toastObject={toastObject}
        updateToastObject={updateToastObject}
        updateProducts={updateProduct}
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        tags={tags} 
        categories={categories} 
        subCategories={subcategories} 
        brand={brand} 
        handleUpdateTags={handleUpdateTags}
        productDetails={productDetails}
        setProductDetails={setProductDetails}
        CurrentNewProduct={CurrentNewProduct}
        setCurrentNewProduct={setCurrentNewProduct}
        countryList={countryList}
        />
      </SimpleGrid>
    </Box>
    </>
  );
}
