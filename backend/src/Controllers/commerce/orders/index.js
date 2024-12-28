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
        const orders = await Order.find().populate({ path: "shipping_address"}).populate({  path: "billing_address" }).populate({ path: 'data', populate: { path: "items.product" }, strictPopulate : false })
        res.status(200).json({ status: "success", message: "All order retrived successfully",data: orders})
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

