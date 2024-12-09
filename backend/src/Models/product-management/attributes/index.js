import mongoose from 'mongoose';
import { generateUUID } from '../../../utils/helpers.js';
import { Sequence } from '../../helpers/sequence.js';

const attributeSchema = new mongoose.Schema(
  {
    id : {
        type: Number,
        unique : true
    },
    uuid : {
        type: String,
        unique : true 
    },
    identity: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      trim: true,
      maxlength: 255,
      default: '', 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const Attribute = mongoose.model('Attribute', attributeSchema);

Attribute.schema.pre("save", async function(next){
    if(!this.id){
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("Attributes",{ $inc: { seq: 1 }},{ new: true, upsert: true })
            this.id = sequence.seq
            this.uuid = uuid 
            next()   
        } catch (error) {
           next(error) 
        }
    }else{
        next()
    }
})

export default Attribute;
