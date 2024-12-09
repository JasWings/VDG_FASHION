import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer : rootReducers
})

export  type AppDispatch = typeof store.dispatch
export type Rootstate = ReturnType<typeof store.getState>

// export const useAppDispatch : () => AppDispatch = useDispatch