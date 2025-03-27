import Order from '../../../Models/product-management/orders/index.js';
import Address from '../../../Models/user-management/administration/address.js';
import { User } from '../../../Models/user-management/administration/index.js';
import Validations from '../../../Validations/index.js';

const createOrder = async (req, res) => {
    try {
        const value = Validations.orderdetails(req.body);
        
        const order = new Order(value);
        await order.save();
        res.status(201).send(order);
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({ uuid: id }).populate('customer_id').populate({ path: "data", populate: { path: "items.product"} })
            .populate('shipping_address')
            .populate('billing_address');

        if (!order) return res.status(404).send({ error: "Order not found" });

        res.status(200).json({ status: "sucess", message: "Order details retrived successfully",data: order})
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 

        const total = await Order.countDocuments();
        const orders = await Order.find()
            .populate({ path: "shipping_address" })
            .populate({ path: "billing_address" })
            .populate({ path: 'data', populate: { path: "items.product" }, strictPopulate: false })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);

        const totalPages = Math.ceil(total / limit);
        const nextPage = page < totalPages ? parseInt(page) + 1 : null;

        res.status(200).json({
            status: "success",
            message: "Orders retrieved successfully",
            data: orders,
            pagination: {
                currentPage: parseInt(page),
                lastPage : totalPages,
                next_page_url: nextPage ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${nextPage}&limit=${limit}` : null,
                total,
                perPage : limit
            },
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getAllCustomerOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 

        const user = req.user

        const total = await Order.countDocuments({ customer_id: user?._id});
        const orders = await Order.find({ customer_id: user?._id})
            .populate({ path: "shipping_address" })
            .populate({ path: "billing_address" })
            .populate({ path: 'data', populate: { path: "items.product" }, strictPopulate: false })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);

        const totalPages = Math.ceil(total / limit);
        const nextPage = page < totalPages ? parseInt(page) + 1 : null;

        res.status(200).json({
            status: "success",
            message: "Orders retrieved successfully",
            data: orders,
            pagination: {
                currentPage: parseInt(page),
                lastPage : totalPages,
                next_page_url: nextPage ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${nextPage}&limit=${limit}` : null,
                total,
                perPage : limit
            },
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


export const updateOrder = async (req, res) => {
    try {
        
        const { error } = Validations.orderdetails(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order updated successfully", order });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

const orderStatus = {
    "order-completed": "delivered",
    "order-cancelled"  : "cancelled",
    "order-processing" : "initiated"
}
export const updateOrderStatus = async (req,res) => {
    try {
    const {  order_status } = req.body 
    const { id } = req.params
    const updated_order = await Order.findOneAndUpdate({ uuid: id},{order_status:orderStatus[order_status]})  
    res.status(200).json({ status: "success", message: "Order status changed successfully",data: updated_order})  
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error?.message })  
    }
}

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export { createOrder, getOrderById, getAllOrders,getAllCustomerOrders};

