"use client"
import { useEffect,useState } from "react"
import { get } from "@/utils/url/api"
import { GetFAQ} from "@/utils/url/url"
import FaqListTable from "@/components/Faq/FaqList"


const Contacts=()=>{
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [FaqList,setFaqList]=useState([])

    const totalPages = Math.ceil(FaqList.length / itemsPerPage);

    const onPageChange = (page: number) => {
      setCurrentPage(page);
    };

    const getAllFaqList=async()=>{
          const contacts:any=await get(GetFAQ,{})
          setFaqList(contacts?.results)
    }
    useEffect(()=>{
       if(FaqList?.length===0){
          getAllFaqList()
       }
    },[FaqList])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = FaqList.slice(startIndex, endIndex);

      return(
        <>
        <FaqListTable
        faqList={FaqList} 
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        updateFaqList={getAllFaqList}
        />
        </>
      )
}

export default Contacts