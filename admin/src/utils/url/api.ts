import axios ,{ AxiosError,AxiosResponse} from "axios"
import { isWindowAvailable } from "../navigation";

const API_BASE_URL: string = process.env.API_BASE_URL || "";

const axiosInstance=axios.create({
  baseURL:process.env.API_BASE_URL

})


const getToken=async()=>{
      if(isWindowAvailable()&&localStorage!==undefined){
        return await  localStorage.getItem("token")
      }else if(isWindowAvailable()&&localStorage!==undefined){
        return await  localStorage.getItem("token")
      }
}

export const get = async <T>(endpoint: string,query:any): Promise<T> => {
    const token =await getToken()
    try {

      const response: AxiosResponse<T> = await axiosInstance.get(endpoint,{
        headers:{
          Authorization:`Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw (error as AxiosError).response?.data || error;
    }
};

export const getWithQuery = async <T>(endpoint: string,query:any): Promise<T> => {
  const token =await getToken()
  try {

    const response: AxiosResponse<T> = await axiosInstance.get(endpoint+query,{
      headers:{
        Authorization:`Token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data || error;
  }
};

export const post = async <T>(endpoint: string, data: any,header:any): Promise<T> => {
    const token=await getToken()
    try {
      const headers = header
  
      if (token) {
        headers['Authorization'] = `Token ${token}`; // Set the Authorization header with the token
      }
      const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data,{headers:headers});
      return response.data;
    } catch (error) {
      throw (error as AxiosError).response?.data || error;
    }
};

export const Update=async<T>(endpoint,id,data):Promise<T>=>{
       const token =await getToken()
       try {
        const headers={}
        if(token){
          headers["Authorization"] = `Token ${token}`;
        }
        const response:AxiosResponse<T>=await axios.patch(endpoint+id+"/",data,{headers:headers})
        return response.data
       } catch (error) {
         throw (error as AxiosError).response?.data || error;
       }
}

export const UpdateWithId=async<T>(endpoint,data):Promise<T>=>{
  const token =await getToken()
  try {
   const headers={}
   if(token){
     headers["Authorization"] = `Token ${token}`;
   }
   const response:AxiosResponse<T>=await axios.patch(endpoint,data,{headers:headers})
   return response.data
  } catch (error) {
    throw (error as AxiosError).response?.data || error;
  }
}

export const Delete=async <T>(endpoint:string,id:any):Promise<T>=>{
       const token=await getToken()
       try {
        const headers={}
        if (token) {
          headers['Authorization'] = `Token ${token}`; // Set the Authorization header with the token
        }
        const response:AxiosResponse<T>=await axios.delete(endpoint+id,{headers:headers});
        return response.data

       } catch (error) {
         throw (error as AxiosError).response?.data || error
       }
}

export const login = (userData: { username: string; password: string },header) => post('https://api.slrexports.com/api/auth/login/', userData,header);

export const register=(registerData:{first_name: string,last_name: string,email: string,phone_number: string,confirm_password: string,password: string,country:string},header)=>post('https://api.slrexports.com/api/auth/register/',registerData,header)

export const validateOtp=(data:{otp:number},header)=>post('https://api.slrexports.com/api/auth/register/validate-otp/',data,header)


// export const getUserInfo=get("https://api.slrexports.com/api/auth/get-user-info/")

// export const getAllTages=get("https://api.slrexports.com/api/commerce/tag/")

// export const getAllCategories=get("https://api.slrexports.com/api/commerce/category/")

export const AddProducts=(product:any,header)=>post("https://api.slrexports.com/api/commerce/product/",product,header)

export const CreateNewTag=(endpoint:string,data:{identity:string,slug:string},header)=>post(endpoint,data,header)

export const UploadFiles=(endpoint:string,formData,header)=>post(endpoint,formData,header)

export const getImageUrl=(endpoint)=>get(endpoint,{})

export const UpdateProduct=(product:any,id)=>Update(`https://api.slrexports.com/api/commerce/product/`,id,product)


