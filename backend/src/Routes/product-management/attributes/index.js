import express from "express"
import { createAttribute, deleteAttribute, getAllAttributes, getAttributeById, updateAttribute } from "../../../Controllers/commerce/attributes/index.js"


const AttributeRouter  = express.Router()

AttributeRouter.post("/",createAttribute)
AttributeRouter.get("/all",getAllAttributes)
AttributeRouter.get("/:id",getAttributeById)
AttributeRouter.put("/:id",updateAttribute)
AttributeRouter.delete("/:id",deleteAttribute)

export default AttributeRouter