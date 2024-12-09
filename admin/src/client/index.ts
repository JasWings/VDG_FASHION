import { CategoryQueryOptions } from "@/types"
import { API_ENDPOINTS } from "./api_end_points"
import { HttpClient } from "./http_client"



class Client  {
    categories = {
        all : ({params}: CategoryQueryOptions) => HttpClient.get(API_ENDPOINTS.category.index,params)
    }
}

export default new Client()