import client from "@/client"
import { CategoryQueryOptions } from "@/types"



export const getCategoriesList = async (data: any) => {
    try {
      const reponse = await client.categories.all(data)  
      return reponse 
    } catch (error) {
      throw new Error(error)  
    }
}