import Cart from "../../../Models/cart-management/index.js";
import Payment from "../../../Models/payment/index.js";
import Order from "../../../Models/product-management/orders/index.js";
import ProductModel from "../../../Models/product-management/product/index.js";
import Address from "../../../Models/user-management/administration/address.js";


export const AddItemsToCart = async (req, res) => {
    try {
      const user = req.user;
      const { product, quantity } = req.body;
  
      const product_details = await ProductModel.findOne({ uuid: product });
  
      if (!product_details) {
        return res.status(404).json({ status: "failed", message: "Product not found" });
      }
  
      let cart = await Cart.findOne({ user: user?._id, is_active: true });
  
      if (!cart) {
        cart = new Cart({
          user: user?._id,
          items: [],
          price_details: {
            total_actual_price: 0,
            total_current_price: 0,
            total_quantity: 0,
          },
        });
      }
  
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product_details?._id.toString()
      );
  
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        cart.items.push({
          product: product_details?._id,
          quantity,
          price: product_details?.price,
          sale_price: product_details?.sale_price,
        });
      }
  
      
      cart.items = cart.items.filter((item) => item.quantity > 0);
  
      const totalActualPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalCurrentPrice = cart.items.reduce((acc, item) => acc + item.sale_price * item.quantity, 0);
      const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  
      cart.price_details.total_actual_price = totalActualPrice;
      cart.price_details.total_current_price = totalCurrentPrice;
      cart.price_details.total_quantity = totalQuantity;
  
      await cart.save();
  
      res.status(200).json({ status: "success", message: "Item add to cart successfully", data : cart });
    } catch (error) {
      console.error(error, "error");
      res.status(500).json({ status: "failed", message: error.message });
    }
  };
  


export const getCartDetails = async (req, res) => {
    try {
      const user = req.user;
  
      const cart_details = await Cart.findOne({ user: user?._id })
        .populate({
          path: "items",
          populate: {
            path: "product",
            model: "products",
          },
        }).populate('billing_address').populate('shipping_address')
  
      if (!cart_details) {
        return res.status(404).json({ status: "failed", message: "Cart not found." });
      }
  
      res.status(200).json({ status: "success", message: "Cart items retrived successfully", data : cart_details });
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message });
    }
  };


  const Address_types = {
    "billing": "billing_address",
    "shipping" : "shipping_address"
}

export const addAddressToCart = async (req,res) => {
    try {
     const user = req.user 
     const { address_uuid , type } = req.body 
     const find_address = await Address.findOne({ uuid: address_uuid })
     let updated_order ;
     if(type === "billing"){
        updated_order = await Cart.findOneAndUpdate({ user: user?._id},{ billing_address: find_address?._id },{ new: true })
     }else if( type === "shipping"){
       updated_order = await Cart.findOneAndUpdate({ user: user?._id},{ shipping_address: find_address?._id},{ new: true })
     }else{
       throw new Error("Address type is not valid")
     }
      res.status(200).json({ status: 'sucess', message: "Aaddress updated successfully",data: updated_order})
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error?.message })  
    }
}

export const placeonorder = async (req,res) =>{

try {
    const user = req.user 

    const cart = await Cart.findOne({ user: user?._id })


    const new_order = {
      tracking_number : null,
      customer_id : user?._id,
      customer_contact : user?.phone_number,
      amount : cart?.price_details?.total_current_price,
      sales_tax : 0,
      paid_total : 0,
      total : cart?.price_details?.total_current_price,
      shipping_address : cart.shipping_address,
      billing_address : cart?.billing_address,
      order_status : "placed",
      data : {
        items : cart.items,
        price_details : cart.price_details
      },
    }

    const place_new_order = await Order.create(new_order)
    res.status(200).json({ status: 'success',message:"Order Created Successfully" ,data: place_new_order})
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: error?.message });
    }
};



export const verifyPayment = async (req, res) => {
    try {
        
        console.log('Request body:', req.body);

        
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