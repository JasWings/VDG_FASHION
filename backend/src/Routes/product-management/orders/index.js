
import express from "express";
import { createOrder, getOrderById, getAllOrders, deleteOrder, updateOrder, updateOrderStatus } from '../../../Controllers/commerce/orders/index.js';

const Ordersrouter = express.Router();

Ordersrouter.post('/order', createOrder);
Ordersrouter.get('/:id', getOrderById);
Ordersrouter.get('/', getAllOrders);
Ordersrouter.put('/orders/:id', updateOrder);
Ordersrouter.put("/status/:id",updateOrderStatus)
Ordersrouter.delete('/orders/:id',deleteOrder);

export default Ordersrouter;
