import express from "express"
import FeatureRouter from "./user-management/features/index.js"
import PermissionRouter from "./user-management/permissions/index.js"


const AdminRouter = express.Router()

AdminRouter.use("/features",FeatureRouter)
AdminRouter.use("/user-role",PermissionRouter)

export default AdminRouter