import React,{useState,useContext,createContext,useEffect} from "react"
import { get} from "@/utils/url/api"
import { getUserInfoEndPoint,getAllUserListEndPoint,getUserRolesEndPoint,getAllCountriesEndPoint } from "@/utils/url/url"

const defaultContextValue={
      userContext:{},
      setUserContext:(user)=>{},
      userList:[],
      setUserList:(user)=>{},
      userRoles:[],
      setUserRoles:(role)=>{},
      countryList:[],
      setCountryList:(country)=>{}
}

export const UserContext=createContext(defaultContextValue)

export const UseUserContext=()=>useContext(UserContext)

export const UserProvider=({children})=>{
       const [userContext,setUser]=useState({})
       const [userList,setUserList]=useState([])
       const [userRoles,setUserRoles]=useState([])
       const [countryList,setCountryList]=useState([])
      
       const setUserContext=(user)=>{
             setUser(user)
       }

       const getAllUserList=(user)=>{
            setUserList(user)
       }

       const getAllUserRoles=(role)=>{
            setUserRoles(role)
       }

       const getAllCountryList=(country)=>{
             setCountryList(country)
       }

       useEffect(()=>{
            const getUserDetails=async()=>{
                  const response:any=await get(getUserInfoEndPoint,{})
                  const allUser:any=await get(getAllUserListEndPoint,{})
                  const allRoles:any=await get(getUserRolesEndPoint,{})
                  const allCountries:any=await get(getAllCountriesEndPoint,{})
                  setUserContext(response.data)
                  getAllUserList(allUser.results)
                  getAllUserRoles(allRoles.results)
                  getAllCountryList(allCountries.results)
            }
            if(localStorage.getItem("token")){
                  getUserDetails()
            }
       },[])

       const contextValue={
          userContext,
          setUserContext,
          userList,
          getAllUserList,
          setUserList,
          userRoles,
          setUserRoles,
          getAllUserRoles,
          countryList,
          setCountryList,
          getAllCountryList,
       }

       return(
        <UserContext.Provider value={contextValue}>
          {children}
        </UserContext.Provider>
       )
}