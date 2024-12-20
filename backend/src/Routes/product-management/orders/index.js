
import express from "express";
import { createOrder, getOrderById, getAllOrders, deleteOrder, updateOrder } from '../../../Controllers/commerce/orders/index.js';

const Ordersrouter = express.Router();

Ordersrouter.post('/order', createOrder);
Ordersrouter.get('/:id', getOrderById);
Ordersrouter.get('/', getAllOrders);
Ordersrouter.put('/orders/:id', updateOrder);
Ordersrouter.delete('/orders/:id',deleteOrder);

export default Ordersrouter;
