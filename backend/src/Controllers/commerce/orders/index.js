import Order from '../../../Models/product-management/orders/index.js';
import { User } from '../../../Models/user-management/administration/index.js';
import Validations from '../../../Validations/index.js';

const createOrder = async (req, res) => {
    try {
        const value = Validations.orderdetails(req.body);
        console.log(value)
            // const user_details = await User.findOne({ identity: "customer_id"})
        
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
        const order = await Order.findById(req.params.id).populate('customer_id')
            .populate('shipping_address')
            .populate('billing_address');

        if (!order) return res.status(404).send({ error: "Order not found" });

        res.send(order);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        // Validate request body
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


    export { createOrder, getOrderById, getAllOrders};
