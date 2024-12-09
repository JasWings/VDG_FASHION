import express from "express"
import { createRoleWithPermissions } from "../../../../Controllers/user-management/permission/index.js"


const PermissionRouter  = express.Router()

PermissionRouter.post("/",createRoleWithPermissions)

export default PermissionRouter