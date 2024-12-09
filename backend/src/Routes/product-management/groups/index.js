import express from "express"
import { CreateGroup, deleteGroup, getAllGroups, getGroupDetailsWithSlug, UpdateGroupDetails } from "../../../Controllers/commerce/groups/index.js"


const GroupRouter = express.Router()

GroupRouter.post("/",CreateGroup)
GroupRouter.get("/",getAllGroups)
GroupRouter.get("/:slug",getGroupDetailsWithSlug)
GroupRouter.put("/:id",UpdateGroupDetails)
GroupRouter.delete("/:id",deleteGroup)

export default GroupRouter