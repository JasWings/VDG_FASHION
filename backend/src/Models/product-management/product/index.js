import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id : {
        type: String,
        unique : true
    },
    uuid : {
        type: String,
        unique : true
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    slug : {
      type: String,
    },
    saleprice:{
        type:Number,
        required:true,
    },
    sku : {
        type: String
    },
    gender:{
        type:String,
    },
    group : {
      type: String,
      required : true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true,
    },
    has_variants : {
       type: Boolean,
       default : false
    },
    variants : [
        {
          attributes : { type: Map, of: String },
          price : { type: String },
          sale_price : { type: Number },
          sku : { type: Number },
          stock : { type: Number },
          image : { type: String }
        }, 
    ],
    quantity:{
        type:Number,
        required:true,
    },
    image:{
        type:String
    },
    shipping:{
        type:Boolean,
    },
    is_active:{
        type:Boolean,
        default:true,
    },
    is_delete : {
        type : Boolean,
        default : false
    }
},
    {
        timestamps:true,
})

const ProductModel = mongoose.model("products",productSchema)

export default ProductModel