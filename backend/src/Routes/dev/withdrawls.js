import express from "express"


const Withdrawls = (req,res) => {
    res.send({
        "data": [],
        "total": 0,
        "current_page": 0,
        "count": 0,
        "last_page": 0,
        "firstItem": -10,
        "lastItem": -1011,
        "per_page": "10",
        "first_page_url": "http://localhost:5000/api/withdraws?limit=10&page=1",
        "last_page_url": "http://localhost:5000/api/withdraws?limit=10&page=0",
        "next_page_url": null,
        "prev_page_url": null
    })
}

const WithdrawalsRouter = express.Router()

WithdrawalsRouter.get("/",Withdrawls)

export default WithdrawalsRouter