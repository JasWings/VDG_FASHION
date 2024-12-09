import express from "express"
import TagRouter from "./Tags/index.js"
import AttributeRouter from "./attributes/index.js"
import CategoryRouter from "./categories/index.js"
import UploadRouter from "./uploads/index.js"
import GroupRouter from "./groups/index.js"

const CommerceRouter = express.Router()


CommerceRouter.use("/group",GroupRouter)
CommerceRouter.use("/tag",TagRouter)
CommerceRouter.use("/attributes",AttributeRouter)
CommerceRouter.use("/category",CategoryRouter)
CommerceRouter.use("/upload-file",UploadRouter)

export default CommerceRouter