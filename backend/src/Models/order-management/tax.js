import mongoose from 'mongoose';
import { generateUUID } from '../../utils/helpers.js';
import { Sequence } from '../helpers/sequence.js';

const taxSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  country: { type: String, default: null },
  state: { type: String, default: null },
  zip: { type: String, default: null },
  city: { type: String, default: null },
  rate: { type: Number, required: true },
  name: { type: String, required: true }, 
  is_global: { type: Boolean, required: true },
  priority: { type: Number, default: null },
  on_shipping: { type: Boolean, required: true }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  uuid: { type: String, unique: true },
  is_deleted: { type: Boolean, default: false}
});

taxSchema.pre('save', async function(next) {
  if(!this.id){
    const sequence = await Sequence.findOneAndUpdate({ _id: "TaxIds"},{ $inc: { seq: 1} },{ new: true, upsert: true })
    const uuid = await generateUUID()
    this.uuid = uuid
    this.id = sequence.seq
    next()
  }else{
    next()
  }
});

const Tax = mongoose.model('Tax', taxSchema);

export default Tax