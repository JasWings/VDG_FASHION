import express from "express"
import AdminRouter from "../administration/index.js"
import AuthRouter from "../user-management/authentication/index.js"
import CommerceRouter from "../product-management/index.js"
import SettingsRouter from "../settings/index.js"
import UploadRouter from "../upload/index.js"
import TokenRouter from "../dev/index.js"
import AnalysisRouter from "../dev/analysis.js"
import MeRouter from "../dev/me.js"
import OrdersRouter from "../dev/order.js"
import Paymentrouter from "../payment/index.js"
import Ordersrouter from "../product-management/orders/index.js"


const router = express.Router()


router.use("/admin",AdminRouter)
router.use("/auth",AuthRouter)
router.use("/commerce",CommerceRouter)
router.use("/settings",SettingsRouter)
router.use("/upload",UploadRouter)
router.use("/token",TokenRouter)
router.use("/analytics",AnalysisRouter)
router.use("/me",MeRouter)
router.use("/orders",OrdersRouter)
router.use("/payment", Paymentrouter)
router.use('/order', Ordersrouter)

export default router