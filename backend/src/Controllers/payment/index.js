import Razorpay from 'razorpay';
import Payment from '../../Models/payment/index.js'
import Validations from '../../Validations/index.js';
import  crypto from 'crypto';
import { error } from 'console';
import Order from '../../Models/product-management/orders/index.js';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key_id
    key_secret: process.env.RAZORPAY_KEY_SECRET // Your Razorpay key_secret
});


// Helper function to generate Razorpay signature for verification
const generateSignature = (razorpay_order_id, razorpay_payment_id) => {
    
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    return hmac.digest('hex');
};

export const createPaymentOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({ uuid: id });
        if (!order) {
            return res.status(400).json({ message: 'Order not found' });
        }

        const options = {
            amount: order.data.price_details.total_current_price * 100,
            currency: 'INR',
            receipt: `order_rcptid_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.status(200).json({ status: "success", 
            message: 'Order created successfully',
            data : {
                orderId: razorpayOrder.id,
                amount: validatedData.amount,
                currency: 'INR',
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



export const verifyPayment = async (req, res) => {
    try {
        // Log the received payload for debugging
        console.log('Request body:', req.body);

        // Extract values from the request body
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            order_id,
            amount,
            payment_status,
            payment_id
        } = req.body;

        // Validate if all required fields are present
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id || !amount || !payment_status || !payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Generate the signature using Razorpay's algorithm
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        console.log('Generated Signature:', generatedSignature);
        console.log('Received Signature:', razorpay_signature);

        // Check if the generated signature matches the one sent by Razorpay
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed',
            });
        }

        // Save the payment details in the database
        const payment = new Payment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_status: 'completed',
            amount,
            order_id,
            payment_id
        });

        await payment.save();

        // Update the associated order status
        const order = await Order.findById(order_id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        order.status = 'paid';
        await order.save();

        // Respond with success
        res.json({
            success: true,
            message: 'Payment successfully verified and captured.',
            payment,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

