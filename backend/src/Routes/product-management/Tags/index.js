import express from "express"
import { createTag, deleteTag, getTagByUuid, updateTag } from "../../../Controllers/commerce/tag/index.js"

const TagRouter = express.Router()


TagRouter.post("/",createTag)
TagRouter.get("/:uuid",getTagByUuid)
TagRouter.put("/:uuid",updateTag)
TagRouter.delete("/:uuid",deleteTag)

export default TagRouter