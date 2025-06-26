import express from "express"
import { createShipping, deleteShipping, getAllShippings, updateShipping, getShippingById } from "../../../Controllers/order-management/shipping.js"


const ShippingRouter = express.Router()

ShippingRouter.post("/",createShipping)
ShippingRouter.get("/",getAllShippings)
ShippingRouter.get("/:id",getShippingById)
ShippingRouter.put("/:id",updateShipping)
ShippingRouter.delete("/:id",deleteShipping)

export default ShippingRouter