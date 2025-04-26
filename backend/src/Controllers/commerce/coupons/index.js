import Coupons from '../../../Models/product-management/coupons/index.js';
import multer from 'multer';
import Validations from '../../../Validations/index.js';
import { fileUplaodController } from '../../uploads/index.js';


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