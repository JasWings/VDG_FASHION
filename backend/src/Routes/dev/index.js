import express from "express"



const tokenController = (req,res) => {
    res.status(200).json({"token":"jwt token","permissions":["super_admin","customer"]})
}

const TokenRouter = express.Router()

TokenRouter.post("/",tokenController)

export default TokenRouter