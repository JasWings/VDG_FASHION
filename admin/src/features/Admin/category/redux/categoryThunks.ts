import { AppDispatch } from "@/store";
import { getCategoriesList } from "../services";
import { setCategories, setError, setLoading } from "./categorySlice";



export const getAllCategoriesList =  (params:any) => async (dispath: AppDispatch) => {
    try {
    dispath(setLoading(true))
    const response: any = await getCategoriesList(params) 
    dispath(setCategories(response?.data))
    } catch (error) {
      dispath(setError(error?.message))
    }finally{
        dispath(setLoading(false))
    }
}