import express from "express"
import AdminRouter from "../administration/index.js"
import AuthRouter from "../user-management/authentication/index.js"
import CommerceRouter from "../product-management/index.js"
import SettingsRouter from "../settings/index.js"


const router = express.Router()


router.use("/admin",AdminRouter)
router.use("/auth",AuthRouter)
router.use("/commerce",CommerceRouter)
router.use("/settings",SettingsRouter)

export default router