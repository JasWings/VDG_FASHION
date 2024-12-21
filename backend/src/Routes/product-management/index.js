import express from "express"
import TagRouter from "./Tags/index.js"
import AttributeRouter from "./attributes/index.js"
import CategoryRouter from "./categories/index.js"
import UploadRouter from "./uploads/index.js"
import GroupRouter from "./groups/index.js"
import ProductRouter from "./products/index.js"
import CartRouter from "../cart-management/cart/index.js"
import AddressRouter from "./address/index.js"


const CommerceRouter = express.Router()


CommerceRouter.use("/group",GroupRouter)
CommerceRouter.use("/tags",TagRouter)
CommerceRouter.use("/attributes",AttributeRouter)
CommerceRouter.use("/category",CategoryRouter)
CommerceRouter.use("/products",ProductRouter)
CommerceRouter.use("/cart",CartRouter)
CommerceRouter.use("/customer-address",AddressRouter)
CommerceRouter.use("/upload-file",UploadRouter)


export default CommerceRouter