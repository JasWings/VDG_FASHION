import express from "express"

const sendMeDetails = (req,res) => {
    res.status(200).json({
        "is_active": 0,
        "id": 3,
        "name": "Customer",
        "email": "customer@demo.com",
        "email_verified_at": null,
        "created_at": "2021-08-18T10:30:29.000Z",
        "updated_at": "2022-01-22T03:01:51.000Z",
        "shop_id": null,
        "profile": {
            "id": 2,
            "avatar": null,
            "bio": "",
            "socials": null,
            "contact": "19365141641631",
            "customer_id": 2,
            "created_at": "2021-08-18T13:17:53.000000Z",
            "updated_at": "2021-08-18T13:17:53.000000Z"
        },
        "address": [
            {
                "id": 1,
                "title": "Billing",
                "type": "billing",
                "default": 0,
                "address": {
                    "zip": "99614",
                    "city": "Kipnuk",
                    "state": "AK",
                    "country": "United States",
                    "street_address": "2231 Kidd Avenue"
                },
                "customer_id": 2,
                "created_at": "2021-08-18T13:18:03.000000Z",
                "updated_at": "2021-08-18T13:18:03.000000Z"
            },
            {
                "id": 2,
                "title": "Shipping",
                "type": "shipping",
                "default": 0,
                "address": {
                    "zip": "40391",
                    "city": "Winchester",
                    "state": "KY",
                    "country": "United States",
                    "street_address": "2148  Straford Park"
                },
                "customer_id": 2,
                "created_at": "2021-08-18T13:18:12.000000Z",
                "updated_at": "2021-08-18T13:18:12.000000Z"
            }
        ],
        "permissions": [
            {
                "id": 1,
                "name": "super_admin",
                "guard_name": "api",
                "created_at": "2021-06-27T04:13:00.000000Z",
                "updated_at": "2021-06-27T04:13:00.000000Z",
                "pivot": {
                    "model_id": 2,
                    "permission_id": 1,
                    "model_type": "Marvel\\Database\\Models\\User"
                }
            },
            {
                "id": 2,
                "name": "customer",
                "guard_name": "api",
                "created_at": "2021-06-27T04:13:00.000000Z",
                "updated_at": "2021-06-27T04:13:00.000000Z",
                "pivot": {
                    "model_id": 2,
                    "permission_id": 2,
                    "model_type": "Marvel\\Database\\Models\\User"
                }
            }
        ]
    })
}

const MeRouter = express.Router()


MeRouter.get("/",sendMeDetails)

export default MeRouter
