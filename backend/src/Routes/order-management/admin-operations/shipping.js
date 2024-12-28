import express from "express"
import { createShipping, deleteShipping, getAllShippings, updateShipping } from "../../../Controllers/order-management/shipping.js"


const ShippingRouter = express.Router()

ShippingRouter.post("/",createShipping)
ShippingRouter.get("/",getAllShippings)
ShippingRouter.put("/:id",updateShipping)
ShippingRouter.delete("/:id",deleteShipping)

export default ShippingRouter