import express from 'express';
import { createPaymentOrder, verifyPayment } from '../../Controllers/payment/index.js';

const Paymentrouter = express.Router();

Paymentrouter.post('/:id/make-payment/', createPaymentOrder);

Paymentrouter.post('/verify-payment', verifyPayment);

export default Paymentrouter;
