import express from "express"
import { getProducts, createProduct, getProductWithUUID } from "../../../Controllers/commerce/products/index.js"


const ProductRouter = express.Router()

ProductRouter.get("/",getProducts)
ProductRouter.post("/",createProduct)
ProductRouter.get("/:id",getProductWithUUID)

export default ProductRouter