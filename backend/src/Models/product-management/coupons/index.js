import mongoose from "mongoose";
import { stringify } from "uuid";
import { generateUUID } from "../../../utils/helpers.js";
import { Sequence } from "../../helpers/sequence.js";

const couponSchema = new mongoose.Schema({
    code:{type:String,required:true,unique:true},
    type: { type: String, enum: ['fixed', 'percentage'], required: true},
    description:{type:String,required:true},
    amount:{type:Number,required:true},
    minimum_cart_amount:{type:Number,requird:true},
    image:{type:String,default:null},
    active_form:{type:Date,required:true},
    expire_at: { type: Date, required: true }, 
    is_active: { type: Boolean, default: true }
})

couponSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("CouponId", { $inc: { seq: 1 } }, { new: true, upsert: true })
            this.uuid = uuid
            this.id = sequence.seq
            next()
        } catch (error) {
            next(error)
        }
    } else {
        next()
    }
})

const Coupons = mongoose.model('Coupons',couponSchema)

export default Coupons;
