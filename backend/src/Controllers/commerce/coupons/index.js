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
            active_from : value?.active_from,
            is_active: true,
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

    // Update only fields that are allowed to be modified
    const allowedFields = [
      'code',
      'type',
      'description',
      'amount',
      'minimum_cart_amount',
      'image',
      'active_from',
      'expire_at',
      'is_active',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        coupon[field] = req.body[field];
      }
    });

    await coupon.save();

    res.status(200).json(coupon);
  } catch (err) {
    console.error('Coupon update error:', err);
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

  if (!cartId || !couponCode) {
    return res.status(400).json({ error: "Cart ID and coupon code are required." });
  }

  try {
    const now = new Date();

    const coupon = await Coupons.findOne({
      code: couponCode,
      is_active: true,
      active_from: { $lte: now },
      expire_at: { $gte: now },
    });

    if (!coupon) {
      return res.status(404).json({ error: "Invalid or expired coupon code." });
    }

    const cart = await Cart.findOne({ uuid: cartId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const cartTotal = cart.price_details.total_current_price;

    if (cartTotal < coupon.minimum_cart_amount) {
      return res.status(400).json({
        error: `Cart total must be at least ${coupon.minimum_cart_amount} to apply this coupon.`,
      });
    }

    let discount = 0;

    if (coupon.type === "percentage") {
      discount = (cartTotal * coupon.amount) / 100;
    } else if (coupon.type === "fixed") {
      discount = coupon.amount;
    }

    const discountedTotal = cartTotal - discount;

    cart.price_details.total_current_price = discountedTotal;
    cart.price_details.discount_amount = discount;
    cart.applied_coupon = coupon._id;

    await cart.save();

    return res.status(200).json({
      message: "Coupon applied successfully.",
      cart,
      applied_coupon_code: coupon.code,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const roundToTwoDecimals = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};


export const RevokeCoupon = async (req, res) => {
  const { cartId } = req.body;

  try {
    if (!cartId) {
      return res.status(400).json({ error: "Cart ID is required." });
    }

    const cart = await Cart.findOne({ uuid: cartId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    if (!cart.applied_coupon) {
      return res.status(400).json({ error: "No coupon applied to revoke." });
    }

    const coupon = await Coupons.findOne({ _id: cart.applied_coupon });
    console.log(coupon, cart.applied_coupon, "applied");
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }

    const { type, amount } = coupon;

    let { total_actual_price, total_current_price, discount_amount } = cart.price_details;
    total_actual_price = total_actual_price ?? 0;
    total_current_price = total_current_price ?? 0;
    discount_amount = discount_amount ?? 0;

    if (typeof total_actual_price !== "number" || typeof total_current_price !== "number") {
      throw new Error("Invalid price details in cart.");
    }

    if (type === "fixed") {
      total_current_price += amount;
    } else if (type === "percentage") {
      const discount = (total_actual_price * amount) / 100;
      if (isNaN(discount) || discount < 0) {
        throw new Error("Invalid discount calculation.");
      }

      total_current_price += cart.price_details.discount_amount;
    }

    // Round values to two decimal places
    cart.price_details.total_current_price = roundToTwoDecimals(total_current_price);
    cart.price_details.discount_amount = 0;

    // Remove applied coupon
    cart.applied_coupon = null;

    console.log(cart, "cart");
    await cart.save();

    return res.status(200).json({
      message: "Coupon revoked successfully.",
      cart,
    });
  } catch (error) {
    console.error("Error during coupon revocation:", error);
    return res.status(500).json({ error: error.message });
  }
};









