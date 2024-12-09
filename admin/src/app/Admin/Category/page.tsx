'use client'
import { Box, Heading, Spinner, useFocusEffect } from '@chakra-ui/react';
import CategoryTable from '@/components/products/components/CategoryTable';
import { useGlobalContext } from '@/context/productContext/productContext';
import { useState ,useEffect} from 'react';
import { get } from '@/utils/url/api';
import { getCategoryEndPoint } from '@/utils/url/url';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { selectCategories, selectLoading, selectError } from '@/features/Admin/category/redux/selectors';
import { getAllCategoriesList } from '@/features/Admin/category/redux/categoryThunks';


const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const categories =  useSelector(selectCategories) 
  const loading = useSelector(selectLoading)
  const itemsPerPage=10
  const [currentPage,setCurrentPage]=useState(1)

    // useEffect(()=>{
    //     const updateCategorieList=async()=>{
    //       const response:any =await get(getCategoryEndPoint,{})
    //       console.log(response,"response")
    //       updateCategories(response.data)
    //     }
    //     if(categories.length===0){
    //       updateCategorieList()
    //     }
    // })

    useEffect(() => {
      const data = { }
      dispatch(getAllCategoriesList(data))
    },[dispatch])
    
    const totalPages = categories ? Math.ceil(categories.length / itemsPerPage) : 0;
    
    const onPageChange=(page:number)=>{
          setCurrentPage(page)
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories=categories?.slice(startIndex,endIndex)


    // if(categories?.length===0){
    //   UpdateCategoryList()
    // }

    if(loading){
      return <Spinner />
    }

  return (
    <Box p={4}>
      <CategoryTable 
      categories={paginatedCategories} 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      UpdateCategoryList={() =>{}}
      />
    </Box>
  );
};

export default CategoryPage;
