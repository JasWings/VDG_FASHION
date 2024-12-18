import express from "express"
import { AddItemsToCart, getCartDetails } from "../../../Controllers/commerce/cart/index.js"
import { VerifyToken } from "../../../services/authService.js"

const CartRouter = express.Router()


CartRouter.patch("/add_product/",VerifyToken,AddItemsToCart)
CartRouter.get("/all",VerifyToken,getCartDetails)

export default CartRouter