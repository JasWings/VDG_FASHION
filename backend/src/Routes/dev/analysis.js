import express from "express"

const sendAnalysist = (req,res) => {
    res.status(200).json({
        "totalRevenue": 0,
        "totalRefunds": 0,
        "totalShops": 10,
        "todaysRevenue": 0,
        "totalOrders": 0,
        "newCustomers": 1,
        "totalYearSaleByMonth": [
            {
                "total": 4,
                "month": "January"
            },
            {
                "total": 5,
                "month": "February"
            },
            {
                "total": 7,
                "month": "March"
            },
            {
                "total": 5,
                "month": "April"
            },
            {
                "total": 7,
                "month": "May"
            },
            {
                "total": 9,
                "month": "June"
            },
            {
                "total": 8,
                "month": "July"
            },
            {
                "total": 9,
                "month": "August"
            },
            {
                "total": 0,
                "month": "September"
            },
            {
                "total": 0,
                "month": "October"
            },
            {
                "total": 0,
                "month": "November"
            },
            {
                "total": 0,
                "month": "December"
            }
        ]
    })
}

const AnalysisRouter = express.Router()

AnalysisRouter.get("/",sendAnalysist)

export default AnalysisRouter