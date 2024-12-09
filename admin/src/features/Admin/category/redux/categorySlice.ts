import { Category } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface CategoryState {
    data : Category[],
    loading : false,
    error: null
}

const initialState : CategoryState = {
    data : [],
    loading : false,
    error : null
}

const categorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        setCategories (state,action: PayloadAction<Category[]>){
            state.data = action.payload
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setError(state,action){
            state.error = action.payload
        }
    }
})

export const { setCategories, setLoading, setError } = categorySlice.actions
export default categorySlice.reducer