import Coupons from '../../../Models/product-management/coupons/index.js';
import multer from 'multer';
import Validations from '../../../Validations/index.js';
import { fileUplaodController } from '../../uploads/index.js';
import Cart from '../../../Models/cart-management/index.js';

export const  createCoupon = async (req, res) => {
    try {
        
        // const { error } = Validations.coupondetails(req.body);

        // if (error) {
        //     return res.status(400).json({ error: error.details[0].message });
        // }

        let fileUploadData = null;
        if (req.file){
            fileUploadData = await fileUplaodController(req,res)
        }
        

        const  value  = Validations.coupondetails(req.body);

        const couponData = {
            ...value,
            active_form : value?.active_from,
            file: fileUploadData ? fileUploadData.data.file : null,
        };

        const newCoupon = new Coupons(couponData);

        const savedCoupon = await newCoupon.save();
        res.status(201).json(savedCoupon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupons.find({ is_active: true });
        res.status(200).json(coupons);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const getCouponByCode = async (req, res) => {
    try {
        const coupon = await Coupons.findOne({ code: req.params.code, is_active: true });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found or is inactive' });
        }
        res.status(200).json(coupon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupons.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        coupon.is_active = req.body.is_active;

        await coupon.save();
        res.status(200).json(coupon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupons.findOneAndDelete({ uuid: req.params.id});
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        // await coupon.remove();
        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



export const ApplyCoupons = async (req, res) => {
  const { cartId, couponCode } = req.body;

  try {
    // Validate input
    if (!cartId || !couponCode) {
      return res.status(400).json({ error: "Cart ID and coupon code are required." });
    }

    // Check if coupon exists and is active
    const coupon = await Coupons.findOne({
      code: couponCode,
      is_active: true,
      active_from: { $lte: new Date() },
      expire_at: { $gte: new Date() },
    });

    if (!coupon) {
      return res.status(404).json({ error: "Invalid or expired coupon code." });
    }

    // Check if cart exists
    const cart = await Cart.findOne({ uuid: cartId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Check if cart meets the minimum amount required for the coupon
    const cartTotal = cart.price_details.total_current_price;
    if (cartTotal < coupon.minimum_cart_amount) {
      return res.status(400).json({
        error: `Cart total must be at least ${coupon.minimum_cart_amount} to apply this coupon.`,
      });
    }

    // Calculate the discount based on coupon type
    const discount =
      coupon.type === "percentage"
        ? (cartTotal * coupon.amount) / 100
        : coupon.amount;

    // Ensure the discount does not exceed the cart total
    const finalDiscount = Math.min(discount, cartTotal);

    // Update cart with discount and coupon
    cart.price_details.discount_amount = finalDiscount;
    cart.applied_coupon = coupon._id;
    cart.price_details.total_current_price = cartTotal - finalDiscount;

    // Save the updated cart
    await cart.save();

    // Respond with updated cart details
    res.status(200).json({
      message: "Coupon applied successfully.",
      cart,
      applied_coupon: coupon.code,
      discount_amount: finalDiscount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

