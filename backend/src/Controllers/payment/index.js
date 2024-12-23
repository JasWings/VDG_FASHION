import Razorpay from 'razorpay';
import Payment from '../../Models/payment/index.js'
import Validations from '../../Validations/index.js';
import  crypto from 'crypto';
import { error } from 'console';
import Order from '../../Models/product-management/orders/index.js';
import dotenv from "dotenv"

dotenv.config()

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

 
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
        order.razorpayOrderId = razorpayOrder.id
        await order.save()

        res.status(200).json({ status: "success", 
            message: 'Order created successfully',
            data : {
                orderId: razorpayOrder.id,
                amount: order.amount,
                currency: 'INR',
            } 
        });
    } catch (error) {
        console.error(error,'ERROR');
        res.status(500).json({ status: "failed", message: error?.message });
    }
};



export const verifyPayment = async (req, res) => {
    try {
        const { payment_id } = req.params;
        
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        if (!payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Payment ID is required',
            });
        }
        
        const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

        if (!paymentDetails) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found',
            });
        }
        
        if (paymentDetails.status !== 'captured') {
            return res.status(400).json({
                success: false,
                message: 'Payment not completed or captured',
            });
        }

        const { order_id, amount } = paymentDetails;
        
        const order = await Order.findOne({ razorpayOrderId: order_id })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        order.payment_status = 'completed';
        order.payment_id = razorpay_payment_id
        await order.save();

        const payment = new Payment({
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            payment_status: 'completed',
            amount: amount / 100,
            order_id: order._id,
            payment_id: payment_id,
        });

        await payment.save();

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



export const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEB_HOOK

  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (generatedSignature !== signature) {
    return res.status(400).send("Invalid signature");
  }

  const { event, payload } = req.body;

  if (event === "payment.captured") {
    const razorpayOrderId = payload.payment.entity.order_id;
   console.log(razorpayOrderId,"orderId")
   const order = await Order.updateOne(
      { razorpayOrderId : razorpayOrderId },
      {
        $set: {
          payment_status: "completed",
          order_status: "placed",
        },
        $push: {
          status_history: {
            status: "placed",
            timestamp: new Date(),
            is_active: true,
          },
        },
      }
    );
    
  } else if (event === "payment.failed") {
    const razorpayOrderId = payload.payment.entity.order_id;

    await Order.updateOne(
      { razorpayOrderId },
      {
        $set: {
          payment_status: "failed",
          order_status: "cancelled",
          
        },
        $push: {
          status_history: {
            status: "cancelled",
            timestamp: new Date(),
            is_active: true,
          },
        },
      }
    );
  }

  res.status(200).send("Webhook received");
};


export const checkPaymentStatus = async (req, res) => {
  const { paymentId } = req.body;

  try {
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);

    if (paymentDetails.status === 'captured') {
      
      await Order.updateOne(
        { razorpayOrderId: paymentDetails.order_id },
        {
          $set: {
            payment_status: 'completed',
            order_status: 'placed',
          },
        }
      );

      res.status(200).json({
        status: 'success',
        message: 'Payment captured successfully.',
        data: paymentDetails,
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'Payment not completed.',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching payment status.',
      error: error.message,
    });
  }
};


