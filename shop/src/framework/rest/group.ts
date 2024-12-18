import { useInfiniteQuery } from "react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import client from "./client";



export function useGroups (){
    const { data, isLoading, error } = useInfiniteQuery<any>([API_ENDPOINTS.GROUPS],() => client.groups.all())
   console.log(data,"data")
    return {
        groups : data?.pages?.[0].data,
        isLoading,
        error
    }
}