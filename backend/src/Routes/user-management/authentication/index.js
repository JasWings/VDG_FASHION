import express from "express"
import { createUser, loginUser } from "../../../Controllers/user-management/Administration/index.js"


const AuthRouter = express.Router()

AuthRouter.post("/register",createUser)
AuthRouter.post("/login",loginUser)

export default AuthRouter