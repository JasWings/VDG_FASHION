import express from "express"
import { createAddress, getAddresses } from "../../../Controllers/address/index.js"
import { VerifyToken } from "../../../services/authService.js"


const AddressRouter = express.Router()

AddressRouter.post("/",VerifyToken,createAddress)
AddressRouter.get("/",VerifyToken,getAddresses)

export default AddressRouter