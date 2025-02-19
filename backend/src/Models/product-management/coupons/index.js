import mongoose from "mongoose";
import { stringify } from "uuid";
import { generateUUID } from "../../../utils/helpers.js";
import { Sequence } from "../../helpers/sequence.js";

const couponSchema = new mongoose.Schema({
    id : { type: Number, unique: true },
    uuid : { type: String, unique: true },
    code:{type:String,required:true,unique:true},
    type: { type: String, enum: ['fixed', 'percentage'], required: true},
    description:{type:String},
    amount:{type:Number,required:true},
    minimum_cart_amount:{type:Number,requird:true},
    image:{type:String,required:true},
    active_from:{type:Date,required:true},
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
