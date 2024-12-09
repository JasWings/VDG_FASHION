import express from "express"
import TagRouter from "./Tags/index.js"
import AttributeRouter from "./attributes/index.js"
import CategoryRouter from "./categories/index.js"

const CommerceRouter = express.Router()


CommerceRouter.use("/tag",TagRouter)
CommerceRouter.use("/attributes",AttributeRouter)
CommerceRouter.use("/category",CategoryRouter)

export default CommerceRouter