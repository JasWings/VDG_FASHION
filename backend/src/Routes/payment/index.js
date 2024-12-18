import express from 'express';
import { createPaymentOrder, verifyPayment } from '../../Controllers/payment/index.js';

const Paymentrouter = express.Router();

// Route to create a payment order in Razorpay
Paymentrouter.post('/create-order', createPaymentOrder);

// Route to verify and capture payment after Razorpay's response
Paymentrouter.post('/verify-payment', verifyPayment);

export default Paymentrouter;
