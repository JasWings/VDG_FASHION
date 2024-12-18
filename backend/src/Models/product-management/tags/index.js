import mongoose from "mongoose";
import {  generateUUID } from "../../../utils/helpers.js"
import { Sequence } from "../../helpers/sequence.js"

const tagSchema = new mongoose.Schema(
  {
    id : {
        type: Number,
        unique: true 
    },
    uuid : {
       type: String,
       unique: true 
    },
    identity: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref : "Group",
      default: null
    },
    icon : {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);


tagSchema.pre('save', async  function (next) {
  if(!this.id){
    try {
    const uuid = await generateUUID()
    const sequence = await Sequence.findByIdAndUpdate("Tags",{ $inc: { seq: 1} },{ new: true, upsert: true })   
    this.uuid = uuid
    this.id = sequence.seq
    next() 
    } catch (error) {
      next(error)  
    }
  }else{
    next()
  }
});


const Tag = mongoose.model('Tag', tagSchema);

export default Tag
