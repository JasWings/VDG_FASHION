import express from "express"
import { ChangePassword, createUser, getUserInfo, loginUser, verifyOtp } from "../../../Controllers/user-management/Administration/index.js"
import { VerifyToken } from "../../../services/authService.js"


const AuthRouter = express.Router()

AuthRouter.post("/register",createUser)
AuthRouter.post("/validate-otp",verifyOtp)
AuthRouter.get("/get-user-info",VerifyToken,getUserInfo)
AuthRouter.post("/updated-password/",VerifyToken,ChangePassword)
AuthRouter.post("/login",loginUser)

export default AuthRouter