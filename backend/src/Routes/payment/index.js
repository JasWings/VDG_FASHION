import express from 'express';
import { createPaymentOrder, verifyPayment } from '../../Controllers/payment/index.js';

const Paymentrouter = express.Router();

Paymentrouter.get('/:id/make_payment/', createPaymentOrder);

Paymentrouter.post('/:payment_id/refresh_order_payments', verifyPayment);

export default Paymentrouter;
