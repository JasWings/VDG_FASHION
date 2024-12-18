// import React, { useState ,useEffect} from "react";
// import client from "@/framework/client";
// import { useUser } from "@/framework/user";
// import { authorizationAtom } from "../authorization-atom";
// import { useAtom } from "jotai";

// export const CountryContext=React.createContext(undefined)
// CountryContext.displayName="CountryContext";

// export const useCountry=()=>{
//        const context=React.useContext(CountryContext)
//        if(context===undefined){
//         throw  Error(`useCart must be used within a CartProvider`);
//        }
//     return React.useMemo(()=>context,[context])
// }

// export const CountryProvider=(props:any)=>{
//       //  const [CountryList,setCountryList]=useState([])
//       //  const [selectedCountry,setSelectedCountry]=useState(null)
//        const {me}=useUser()
//        const [isAuthorize]=useAtom(authorizationAtom)
//       //  const getCountryList=async()=>{
//       //        const list:any=await client.products.getCountry()
//       //        setCountryList(list)
//       //  }

//        useEffect(()=>{
//         if(CountryList.length==0){
//            getCountryList()
//         }
//         if(selectedCountry===null&&CountryList.length!==0){
//            const getIndex=(id)=>{
//                  let countryIndex;
//                  CountryList?.map((i:any,index)=>{
//                    if(i.id===id){
//                      countryIndex=index
//                    }
//                  })
//             return countryIndex
//            }
//            setSelectedCountry(CountryList[isAuthorize?getIndex(me?.country?.id):3])
//         }
//        },[CountryList,selectedCountry])

//        const updateCountry=(option:any)=>{
//              setSelectedCountry(option)
//        }
//        const value=React.useMemo(()=>
//        ({
//         CountryList,
//         setCountryList,
//         selectedCountry,
//         setSelectedCountry,
//         updateCountry
//     }),[CountryList,setCountryList,updateCountry])
//        return <CountryContext.Provider value={value} {...props} />
// }