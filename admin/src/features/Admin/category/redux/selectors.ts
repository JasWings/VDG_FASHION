import { Rootstate } from "@/store"

export const selectCategories = (state: Rootstate) => state.categories.data
export const selectLoading = (state: Rootstate): boolean => state.categories.loading 
export const selectError = (state: Rootstate) : null => state.categories.error