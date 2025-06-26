import express from "express"
import { addAddressToCart, AddItemsToCart, getCartDetails, placeonorder, verifyPayment, UpdatePaymentMethod } from "../../../Controllers/commerce/cart/index.js"
import { VerifyToken } from "../../../services/authService.js"

const CartRouter = express.Router()


CartRouter.patch("/add_product/",VerifyToken,AddItemsToCart)
CartRouter.get("/all",VerifyToken,getCartDetails)
CartRouter.patch("/add_address/",VerifyToken,addAddressToCart)
CartRouter.get("/place_order",VerifyToken,placeonorder)
CartRouter.post("/verify-payment",VerifyToken,verifyPayment)
CartRouter.patch("/update-payment-method",VerifyToken,UpdatePaymentMethod)

export default CartRouter