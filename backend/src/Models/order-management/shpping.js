import mongoose from "mongoose";
import { Sequence } from "../helpers/sequence.js";
import { generateUUID } from "../../utils/helpers.js";

const shippingSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  is_global: { type: Boolean },
  type: { type: String, enum: ['fixed', 'percentage',"free"], required: true },
  uuid: { type: String, unique: true },
  is_deleted: { type: Boolean, default: false}
},{ timestamps: true });


shippingSchema.pre('save',async function(next) {
   if(!this.id){
      try {
        const sequence = await Sequence.findOneAndUpdate({ _id: "ShippingIds"},{ $inc: { seq: 1}},{ new: true, upsert: true })
        const uuid = await generateUUID()
        this.id = sequence.seq
        this.uuid = uuid
        next()
      } catch (error) {
        next(error)
      }
   }else{
    next()
   }
});

const Shipping = mongoose.model('Shipping', shippingSchema);

export default Shipping