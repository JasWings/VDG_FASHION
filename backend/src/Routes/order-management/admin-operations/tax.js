import express from "express"
import { createTax, deleteTax, getAllTaxes, getTaxById, updateTax } from "../../../Controllers/order-management/tax.js"


const TaxRouter = express.Router()

TaxRouter.get("/",getAllTaxes)
TaxRouter.post("/",createTax)
TaxRouter.get("/:id",getTaxById)
TaxRouter.put("/:id",updateTax)
TaxRouter.delete("/:id",deleteTax)

export default TaxRouter