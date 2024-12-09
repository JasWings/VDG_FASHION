import express from "express"
import multer from "multer"
import { fileUplaodController } from "../../Controllers/uploads/index.js"


const UploadRouter = express.Router()
const Upload = multer()


UploadRouter.post("/",Upload.single("file"),fileUplaodController)

export default UploadRouter