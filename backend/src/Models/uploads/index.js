import mongoose from "mongoose";
import { Sequence } from "../helpers/sequence.js"

const UploadSchema = new mongoose.Schema({
    id: Number,
    uuid: String,
    created: Date,
    modified: Date,
    is_active: {type: Boolean , default: true},
    is_deleted: {type: Boolean , default: false},
    file: String,
    created_by: mongoose.Types.ObjectId 
});

UploadSchema.pre("save",async function(next){
    if(!this.id){
    try {
      const sequence = await Sequence.findOneAndUpdate({_id:"UploadId"},{$inc:{seq:1}},{new:true,upsert:true}) 
      this.id = sequence.seq
      next() 
    } catch (error) {
       next(error)  
    }
   }else{
    next()
   }
})

const Upload = mongoose.model('upload',UploadSchema);

export default Upload
