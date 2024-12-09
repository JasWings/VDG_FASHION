import { Table, Thead, Tbody, Tr, Th, Td, IconButton, ButtonGroup ,Box,Button,Heading,Tooltip} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import CustomPagination from '@/components/pagination/customPagination';
import { useState } from 'react';
import { Delete } from '@/utils/url/api';
import { getCategoryEndPoint } from '@/utils/url/url';
import CustomModal from '@/components/modal/customModal';
import ConfirmationModal from '@/components/modal/deleteModal';
import CreateNewCategoryForm from '../forms/createCategoryForm';
import EditCategoryForm from '../forms/categoryEditTable';
import { useCustomToast } from '@/components/toast/Toast';

const CategoryTable = ({ categories,onPageChange,currentPage,totalPages,UpdateCategoryList}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewTagCreate,setIsNewCreate]=useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message,setMessage]=useState({show:false,message:"",state:""})
  const toast=useCustomToast()

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleAddNew=()=>{
        setIsNewCreate(true)
  }

  const handleDeleteTag=async()=>{
        try {
          const response:any=await Delete(getCategoryEndPoint,selectedCategory.uuid+"/")
          toast({title:"Category Deleted Successfully",position:"top",status:"success"})
          UpdateCategoryList()  
        } catch (error) {
          toast({title:error,status:"error",position:"top"})
        }

  }

  const handleEditSave=()=>{

  }

  return (
    <>
    {message.show&&<CustomModal isOpen={message.show} onClose={()=>setMessage({show:false,message:"",state:""})} message={message.message} state={message.state} />}
    {isDeleteModalOpen&&<ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false);setSelectedCategory(null)}} message={`Are You sure want to delete ${selectedCategory.identity}?`} onConfirm={handleDeleteTag} />}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
        <Heading as="h1" size="xl">
        Categories
       </Heading>
        </Box>
        {
          !isNewTagCreate&&
          <Button bg={"brand.500"} _hover={{bg:"brand.500"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={()=>handleAddNew()} >
          Add New
        </Button>
        }

      </Box>
    {
      isEditModalOpen || isNewTagCreate?(
        isEditModalOpen?
        <EditCategoryForm categories={categories} category={selectedCategory} onCancel={()=>{setIsEditModalOpen(false);setSelectedCategory(null)}} onSave={()=>handleEditSave()} updateCategory={UpdateCategoryList} setIsEditModalOpen={setIsEditModalOpen} setSelectedCategory={setSelectedCategory} setMessage={setMessage} />
        :
        <CreateNewCategoryForm category={categories} onCancel={()=>{setIsNewCreate(false)}} onSave={()=>{}} updateCategories={UpdateCategoryList} setIsNewCreate={setIsNewCreate} setMessage={setMessage} />
        ):(
              <>
               <Table  variant='simple' mt={"20px"}>
          <Thead bg={"#4F5D73"}>
            <Tr color={"white"}>
              <Th color={"white"} fontWeight={700} fontSize={14}>Identity</Th>
              <Th color={"white"} fontWeight={700} fontSize={14}>Slug</Th>
              <Th color={"white"} fontWeight={700} fontSize={14}>Action</Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            {categories.map((category) => (
              <Tr   fontWeight={500} key={category.id}>
                <Td fontWeight={500}>{category.identity}</Td>
                <Td fontWeight={500}>{category.slug}</Td>
                <Td>
                  <ButtonGroup gap={"8px"}>
                    <Tooltip label={"edit"}><IconButton   size={"sm"} borderRadius={"8px"} color={"white"} bg={"#399f7f"} icon={<EditIcon />} aria-label="Edit" onClick={()=>handleEditClick(category)}  /></Tooltip>
                    <Tooltip label={"delete"}><IconButton size={"sm"} borderRadius={"8px"} color={"white"} bg={"red.500"} icon={<DeleteIcon />} aria-label="Delete" onClick={()=>handleDeleteClick(category)} /></Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
          </Table>
          <CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
          </>
        )
    }
    </>
  );
};

export default CategoryTable;
