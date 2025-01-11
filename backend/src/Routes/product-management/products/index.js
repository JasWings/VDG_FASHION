import express from "express"
import { getProducts, createProduct, getProductWithUUID, updateProductById, deleteProductwithId } from "../../../Controllers/commerce/products/index.js"


const ProductRouter = express.Router()

ProductRouter.get("/",getProducts)
ProductRouter.post("/",createProduct)
ProductRouter.get("/:id",getProductWithUUID)
ProductRouter.put("/:_id",updateProductById)
ProductRouter.delete("/:id",deleteProductwithId)

export default ProductRouter