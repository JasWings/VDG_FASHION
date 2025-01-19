import express from "express";
import Order from "../../Models/product-management/orders/index.js";
import Payment from "../../Models/payment/index.js";
import { User } from "../../Models/user-management/administration/index.js";

const sendAnalysist = async (req, res) => {
    try {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);
        
        const totalRevenue = await Payment.aggregate([
            { $match: { payment_status: "completed" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).then(res => res[0]?.total || 0);

        const totalRefunds = await Order.aggregate([
            { $match: { order_status: "cancelled" } },
            { $group: { _id: null, total: { $sum: "$cancelled_amount" } } }
        ]).then(res => res[0]?.total || 0);

        const totalOrders = await Order.countDocuments();
        
        const newCustomers = await User.countDocuments({
            createdAt: { $gte: startOfYear, $lt: endOfYear }
        });

        const todaysRevenue = await Payment.aggregate([
            {
                $match: {
                    payment_status: "completed",
                    created_at: {
                        $gte: new Date().setHours(0, 0, 0, 0),
                        $lt: new Date().setHours(23, 59, 59, 999)
                    }
                }
            },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).then(res => res[0]?.total || 0);

        const totalYearSaleByMonth = await Order.aggregate([
            {
                $match: {
                    order_date: { $gte: startOfYear, $lt: endOfYear }
                }
            },
            {
                $group: {
                    _id: { $month: "$order_date" },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]).then(monthData => {
            const months = Array.from({ length: 12 }, (_, i) => ({
                month: new Date(0, i).toLocaleString("en", { month: "long" }),
                total: 0
            }));
            monthData.forEach(({ _id, total }) => {
                months[_id - 1].total = total;
            });
            return months;
        });

        res.status(200).json({
            totalRevenue,
            totalRefunds,
            totalShops: 10, 
            todaysRevenue,
            totalOrders,
            newCustomers,
            totalYearSaleByMonth
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const AnalysisRouter = express.Router();
AnalysisRouter.get("/", sendAnalysist);
export default AnalysisRouter;
