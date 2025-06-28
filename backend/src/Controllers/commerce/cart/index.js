import Cart from "../../../Models/cart-management/index.js";
import Payment from "../../../Models/payment/index.js";
import Order from "../../../Models/product-management/orders/index.js";
import ProductModel from "../../../Models/product-management/product/index.js";
import Address from "../../../Models/user-management/administration/address.js";
import mongoose from "mongoose";
import Settings from "../../../Models/settings/index.js";
import Shipping from "../../../Models/order-management/shpping.js";
// import Offer from "../../../Models/product-management/offers/index.js"
import Offer from "../../../Models/mark-&-promotions/offer.js";

// export const AddItemsToCart = async (req, res) => {
//   try {
//     const user = req.user;
//     const { product, quantity } = req.body;

//     const product_details = await ProductModel.findOne({ uuid: product });
//     if (!product_details) {
//       return res.status(404).json({ status: "failed", message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ user: user?._id, is_active: true });
//     if (!cart) {
//       cart = new Cart({
//         user: user?._id,
//         items: [],
//         payment_method: null,
//         price_details: {
//           total_actual_price: 0,
//           total_current_price: 0,
//           total_quantity: 0,
//         },
//       });
//     }

//     const existingItemIndex = cart.items.findIndex(
//       (item) => item.product.toString() === product_details._id.toString()
//     );

//     if (existingItemIndex >= 0) {
//       cart.items[existingItemIndex].quantity = quantity;
//     } else {
//       cart.items.push({
//         product: product_details._id,
//         quantity,
//         price: product_details.price,
//         sale_price: product_details.sale_price,
//       });
//     }

//     cart.items = cart.items.filter((item) => item.quantity > 0);

//     const totalActualPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const totalCurrentPrice = cart.items.reduce((acc, item) => acc + item.sale_price * item.quantity, 0);
//     const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//     cart.price_details.total_actual_price = totalActualPrice;
//     cart.price_details.total_current_price = totalCurrentPrice;
//     cart.price_details.total_quantity = totalQuantity;

//     if(cart.items.length === 0 && cart.price_details.total_quantity === 0 ){
//       cart.selected_shipping = null;
//       cart.applied_coupon = null;
//     }

//     await cart.save();

//     res.status(200).json({
//       status: "success",
//       message: "Item added to cart successfully",
//       data: cart,
//     });
//   } catch (error) {
//     console.error(error, "error");
//     res.status(500).json({ status: "failed", message: error.message });
//   }
// };

export const AddItemsToCart = async (req, res) => {
  try {
    const user = req.user;
    const { product, quantity, offerId } = req.body;

    const product_details = await ProductModel.findOne({ uuid: product });
    if (!product_details && !offerId) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: user?._id, is_active: true });
    if (!cart) {
      cart = new Cart({
        user: user?._id,
        items: [],
        payment_method: null,
        price_details: {
          total_actual_price: 0,
          total_current_price: 0,
          total_quantity: 0,
        },
      });
    }

    let offer = null;
    if (offerId) {
      offer = await Offer.findOne({ _id: offerId, isActive: true });
      if (!offer) {
        return res.status(400).json({ status: "failed", message: "Invalid or inactive offer" });
      }

      const isWithinDateRange =
        new Date() >= new Date(offer.startDate) && new Date() <= new Date(offer.endDate);
      if (!isWithinDateRange) {
        return res.status(400).json({ status: "failed", message: "Offer is not valid at this time" });
      }

      const isEligible = offer.eligibleProducts.includes(product_details._id);
      if (!isEligible) {
        return res.status(400).json({ status: "failed", message: "Product is not eligible for the offer" });
      }
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product_details._id.toString()
    );

    if (quantity > 0) {
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        cart.items.push({
          product: product_details._id,
          quantity,
          price: product_details.price,
          sale_price: product_details.sale_price,
        });
      }
    } else {
      if (existingItemIndex >= 0) {
        cart.items.splice(existingItemIndex, 1);
      }
    }

    if (offer) {
      const eligibleQuantity = Math.floor(quantity / offer.buyQuantity);
      const freeProducts = offer.freeProducts.map((freeProduct) => ({
        product: freeProduct,
        quantity: eligibleQuantity * offer.getQuantity,
        price: 0,
        sale_price: 0,
      }));

      cart.items = cart.items.filter(
        (item) => !offer.freeProducts.includes(item.product.toString())
      );

      freeProducts.forEach((freeProduct) => {
        if (freeProduct.quantity > 0) {
          const freeProductIndex = cart.items.findIndex(
            (item) => item.product.toString() === freeProduct.product.toString()
          );
          if (freeProductIndex >= 0) {
            cart.items[freeProductIndex].quantity = freeProduct.quantity;
          } else {
            cart.items.push(freeProduct);
          }
        }
      });

      cart.price_details.applied_offer = offer._id;
    } else {
      cart.price_details.applied_offer = null;
      cart.items = cart.items.filter(
        (item) => item.price > 0 || item.sale_price > 0
      );
    }

    cart.items = cart.items.filter((item) => item.quantity > 0);
    const totalActualPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalCurrentPrice = cart.items.reduce((acc, item) => acc + item.sale_price * item.quantity, 0);
    const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    cart.price_details.total_actual_price = totalActualPrice;
    cart.price_details.total_current_price = totalCurrentPrice;
    cart.price_details.total_quantity = totalQuantity;

    if (cart.items.length === 0) {
      cart.selected_shipping = null;
      cart.applied_coupon = null;
      cart.price_details.applied_offer = null;
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
      data: cart,
    });
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
        }).populate('billing_address').populate('shipping_address').populate('applied_coupon').populate({ path: "selected_shipping"})
  
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

export const placeonorder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = req.user;

    const cart = await Cart.findOne({ user: user?._id }).session(session);
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const newOrder = {
      tracking_number: null,
      customer_id: user?._id,
      customer_contact: user?.phone_number,
      amount: cart?.price_details?.total_current_price,
      sales_tax: 0,
      paid_total: 0,
      total: cart?.price_details?.total_current_price,
      shipping_address: cart?.shipping_address,
      billing_address: cart?.billing_address,
      payment_gateway : "payment_gateway",
      order_status: "initiated", 
      payment_status: "initiated", 
      data: {
        items: cart.items,
        price_details: cart.price_details,
      },
      status_history: [
        {
          status: "initiated",
          timestamp: new Date(),
          is_active: true,
        },
      ],
    };

    const placedOrder = await Order.create([newOrder], { session });

    await Cart.updateOne(
      { user: user?._id },
      { $set: { items: [], price_details: {}, billing_address: null, shipping_address: null, applied_coupon:null,selected_shipping:null,payment_method: null } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: "success",
      message: "Order placed successfully",
      data: placedOrder[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ status: "failed", message: error?.message });
  }
};



export const verifyPayment = async (req, res) => {
    try {
        
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


export const UpdatePaymentMethod = async (req, res) => {
  try {
    const user = req.user;
    const { payment_method } = req.body;

    const Methods = {
      "cod":"COD",
      "online":"Online"
    }

    if (!["online", "cod"].includes(payment_method)) {
      return res.status(400).json({ status: "failed", message: "Invalid payment method" });
    }

    const cart = await Cart.findOne({ user: user?._id, is_active: true });
    if (!cart) {
      return res.status(404).json({ status: "failed", message: "Cart not found" });
    }

    const settings = await Settings.findOne();
    if (!settings || !settings.shippingClass) {
      return res.status(500).json({ status: "failed", message: "Shipping settings not configured" });
    }

    const globalShipping = await Shipping.findById(settings.shippingClass._id);
    if (!globalShipping || globalShipping.is_deleted) {
      return res.status(404).json({ status: "failed", message: "Shipping class not found or deleted" });
    }

    const previousShippingCost = cart.selected_shipping?.cost || 0;

    // Remove old shipping cost from total_current_price
    cart.price_details.total_current_price -= previousShippingCost;

    let newShippingCost = 0;
    if (payment_method === "cod") {
      if (globalShipping.type === "fixed") {
        newShippingCost = globalShipping.amount || 0;
      } else if (globalShipping.type === "percentage") {
        // Calculate based on price before shipping cost
        const basePrice = cart.price_details.total_current_price;
        newShippingCost = (basePrice * globalShipping.amount) / 100;
      }
      // If free, cost remains 0
    }

    // Add new shipping cost to total_current_price
    cart.price_details.total_current_price += newShippingCost;

    // Update shipping info or clear it
    cart.selected_shipping = payment_method === "cod"
      ? {
          id: globalShipping._id,
          name: globalShipping.name,
          cost: newShippingCost,
        }
      : null;

    // Update payment method
    cart.payment_method = Methods[payment_method];

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Payment method and shipping updated successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};
