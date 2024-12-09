import { Table, Thead, Tbody, Tr, Th, Td, IconButton, ButtonGroup ,Box ,Button,Heading, Tooltip} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import CustomPagination from '@/components/pagination/customPagination';
import { useState } from 'react';
import { Delete } from '@/utils/url/api';
import { CreateTagEndPoint } from '@/utils/url/url';
import ConfirmationModal from '@/components/modal/deleteModal';
import CustomModal from '@/components/modal/customModal';
import TagEditForm from '../forms/tagEditForm';
import CreateTagForm from '../forms/createTagForm';
import { useCustomToast } from '@/components/toast/Toast';

const TagTable = ({ tags,currentPage,onPageChange,totalPages,updateTags,calculateSerialNumber }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewTagCreate,setIsNewCreate]=useState(false)
  const [selectedTag, setSelectedTag] = useState(null);
  const [message,setMessage]=useState({show:false,message:"",state:""})
  const toast=useCustomToast()

  const handleCreateNewClick=()=>{
        setIsNewCreate(true)
  }

  const handleEditClick = (category) => {
    setSelectedTag(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedTag(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTag=async()=>{
        const response:any=await Delete(CreateTagEndPoint,selectedTag.uuid+"/")
        toast({position:"top",title:"Tag Deleted Successfully",status:"success"})
       // setMessage({show:true,message:"Tag Deleted Successfully",state:"Delete"})
        updateTags()
  }
  
  
  
  return (
    <>
    {message.show&&<CustomModal isOpen={message.show} onClose={()=>setMessage({show:false,message:"",state:""})} message={message.message} state={message.state} />}
    {isDeleteModalOpen&&<ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false);setSelectedTag(null)}} message={`Are You sure want to delete ${selectedTag.identity}?`} onConfirm={handleDeleteTag} />}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box fontSize="xl" fontWeight="bold" color="gray.700">
        <Heading as="h1" size="xl">
         Tags
        </Heading>
        </Box>
        {
        !isNewTagCreate&&<Button bg={"brand.500"} _hover={{bg:"brand.500"}} color={"white"} borderRadius={"8px"} size={"md"} onClick={()=>handleCreateNewClick()}>
          Add New
        </Button>
        }
      </Box>
      {
        isEditModalOpen || isNewTagCreate ?(
           isEditModalOpen?
          <TagEditForm Tag={selectedTag} updateTags={updateTags} onCancel={()=>{setIsEditModalOpen(false)}} setMessage={setMessage} setEditModalOpen={setIsEditModalOpen} setSelectedTag={setSelectedTag} />
          :
          <CreateTagForm updateTags={updateTags} onCancel={()=>{setIsNewCreate(false)}} setMessage={setMessage} setNewFormCreate={setIsNewCreate} />
        ):(
          <>
          <Table  variant='simple' mt={"10px"}>
          <Thead bg={"#4F5D73"}>
            <Tr >
            <Th color={"white"}   fontSize={14} fontWeight={700}>S No</Th>
              <Th color={"white"} fontSize={14} fontWeight={700}>Identity</Th>
              <Th color={"white"} fontSize={14} fontWeight={700}>Slug</Th>
              <Th color={"white"} fontSize={14} fontWeight={700}>Action</Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            {tags.map((tag,index) => (
              <Tr key={tag.id} borderTop={"1px solid gray"}>
                <Td fontWeight={500}>{calculateSerialNumber(index)}</Td>
                <Td fontWeight={500} borderTop={"1px solid gray"}>{tag.identity}</Td>
                <Td fontWeight={500} borderTop={"1px solid gray"}>{tag.slug}</Td>
                <Td fontWeight={500} borderTop={"1px solid gray"}>
                  <ButtonGroup>
                    <Tooltip label={"edit"}><IconButton icon={<EditIcon />} color={"white"} borderRadius={"8px"} size={"sm"} bg='#399f7f' aria-label="Edit" onClick={()=>handleEditClick(tag)}/></Tooltip>
                    <Tooltip label={"delete"}><IconButton icon={<DeleteIcon />} aria-label="Delete" size={"sm"} borderRadius={"8px"} bg={"red.500"} color={"white"} _hover={{bg:"red.400"}} onClick={()=>handleDeleteClick(tag)} /></Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <CustomPagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage} />
        </>
        )
      }
    </>
  );
};

export default TagTable;
