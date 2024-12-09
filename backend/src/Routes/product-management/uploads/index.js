import express from "express"
import multer from "multer"
import { CommercefileUplaodController } from "../../../Controllers/commerce/uploads/index.js"

const UploadRouter = express.Router()

const Upload = multer()

UploadRouter.post("/",Upload.single("file"),CommercefileUplaodController)

export default UploadRouter