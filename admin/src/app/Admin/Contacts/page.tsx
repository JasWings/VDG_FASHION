"use client"
import { useEffect,useState } from "react"
import { get } from "@/utils/url/api"
import { GetAllContacts } from "@/utils/url/url"
import ContactTable from "@/components/Contacts/ContactTable"
import ContactListTable from "@/components/Contacts/ContactListTable"


const Contacts=()=>{
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [ContactList,setContactList]=useState([])

    const totalPages = Math.ceil(ContactList.length / itemsPerPage);

    const onPageChange = (page: number) => {
      setCurrentPage(page);
    };

    const getAllContactList=async()=>{
          const contacts:any=await get(GetAllContacts,{})
          setContactList(contacts?.results)
    }
    useEffect(()=>{
       if(ContactList?.length===0){
          getAllContactList()
       }
    },[ContactList])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = ContactList.slice(startIndex, endIndex);

      return(
        <>
        <ContactListTable 
        Contacts={ContactList} 
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        updateContactList={getAllContactList}
        />
        </>
      )
}

export default Contacts