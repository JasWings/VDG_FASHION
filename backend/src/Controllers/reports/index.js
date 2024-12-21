import Payment from '../../Models/payment/index.js'
import Order from '../../Models/product-management/orders/index.js';
import ProductModel from '../../Models/product-management/product/index.js';
import Report from '../../Models/reports/index.js';
import { User } from '../../Models/user-management/administration/index.js';
import Validations from '../../Validations/index.js';



const generateReportData = async (reportType, filters) => {
    switch (reportType) {
        case 'sales': {
            const startDate = filters.startDate || moment().startOf('day').toDate();
            const endDate = filters.endDate || moment().endOf('day').toDate();
            const salesData = await Order.aggregate([
                { $match: { createdAt: { $gte: startDate, $lte: endDate }, orderStatus: 'completed' } },
                { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }
            ]);
            return salesData;
        }

        case 'orders': {
            const ordersData = await Order.aggregate([
                { $match: { orderStatus: filters.status || { $in: ['pending', 'completed', 'canceled'] } } },
                { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
            ]);
            return ordersData;
        }

        case 'inventory': {
            const inventoryData = await ProductModel.aggregate([
                { $match: { stock: { $lt: 10 } } },
                { $project: { name: 1, stock: 1, category: 1 } }
            ]);
            return inventoryData;
        }

        case 'users': {
            const usersData = await User.aggregate([
                { $match: { createdAt: { $gte: filters.startDate || moment().startOf('year').toDate() } } },
                { $group: { _id: null, totalUsers: { $sum: 1 } } }
            ]);
            return usersData;
        }

        default:
            throw new Error('Invalid report type');
    }
};

export const getReports = async (req, res) => {
    try {
        const { reportType, startDate, endDate } = req.query;

        
        let query = {};
        if (reportType) query.reportType = reportType;
        if (startDate || endDate) {
            query.generatedAt = {};
            if (startDate) query.generatedAt.$gte = new Date(startDate);
            if (endDate) query.generatedAt.$lte = new Date(endDate);
        }

        
        const reports = await Report.find(query).sort({ generatedAt: -1 });

        return res.status(200).json({
            success: true,
            reports,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const generateReport = async (req, res) => {
    try {
        const { reportType, filters } = req.body;
        const data = await generateReportData(reportType, filters);

        // Save the report in the DB (optional)
        const newReport = new Report({
            reportType,
            data,
        });

        await newReport.save();
        return res.status(200).json({
            success: true,
            report: newReport,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};