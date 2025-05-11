import express from "express";
import multer from 'multer';
import { ApplyCoupons, createCoupon, deleteCoupon, getCouponByCode, getCoupons, updateCoupon } from "../../../Controllers/commerce/coupons/index.js";


const couponrouter = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


couponrouter.post('/', upload.single('file'), createCoupon); 
couponrouter.get('/', getCoupons); 
couponrouter.get('/:code', getCouponByCode);
couponrouter.put('/:id', updateCoupon);
couponrouter.delete('/:id', deleteCoupon);
couponrouter.post("/apply-coupon",ApplyCoupons)

export  default couponrouter;