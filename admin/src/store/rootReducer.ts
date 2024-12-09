import { combineReducers } from "@reduxjs/toolkit"
import categoryReducer from "@/features/Admin/category/redux/categorySlice"

const rootReducers = combineReducers({
     categories : categoryReducer
})

export default rootReducers