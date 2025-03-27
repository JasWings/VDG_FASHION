
import express from "express";
import { createOrder, getOrderById, getAllOrders, deleteOrder, updateOrder, updateOrderStatus,getAllCustomerOrders } from '../../../Controllers/commerce/orders/index.js';
import { VerifyToken } from "../../../services/authService.js";

const Ordersrouter = express.Router();

Ordersrouter.get("/users",VerifyToken,getAllCustomerOrders)
Ordersrouter.post('/order', createOrder);
Ordersrouter.get('/:id', getOrderById);
Ordersrouter.get('/', getAllOrders);
Ordersrouter.put('/orders/:id', updateOrder);
Ordersrouter.put("/status/:id",updateOrderStatus)
Ordersrouter.delete('/orders/:id',deleteOrder);

export default Ordersrouter;
