import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../../Controllers/commerce/category/index.js"


const CategoryRouter = express.Router()


CategoryRouter.get("/",getAllCategories)
CategoryRouter.post("/",createCategory)
CategoryRouter.get("/:id",getCategoryById)
CategoryRouter.put("/:id",updateCategory)
CategoryRouter.put("/:id",deleteCategory)

export default CategoryRouter