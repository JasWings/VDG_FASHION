
import express from "express";
import { createOrder, getOrderById, getAllOrders, deleteOrder, updateOrder } from '../../../Controllers/commerce/orders/index.js';

const Ordersrouter = express.Router();

Ordersrouter.post('/order', createOrder);
Ordersrouter.get('/orders/:id', getOrderById);
Ordersrouter.get('/orders', getAllOrders);
Ordersrouter.put('/orders/:id', updateOrder);
Ordersrouter.delete('/orders/:id',deleteOrder);

export default Ordersrouter;
