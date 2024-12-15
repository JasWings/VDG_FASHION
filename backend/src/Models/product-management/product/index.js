import mongoose from "mongoose";
import { generateUUID} from "../../../utils/helpers.js"
import { Sequence } from "../../../Models/helpers/sequence.js"

const gallerySchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    file: { type: String, required: true },
    id: { type: Number },
    _id: false // Prevents automatic generation of a subdocument `_id`
});

const variationOptionSchema = new mongoose.Schema({
    title: { type: String },
    is_digital: { type: Boolean, default: false },
    sku: { type: String },
    quantity: { type: Number },
    sale_price: { type: Number },
    price: { type: Number },
    is_disable: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    image: {
        uuid: { type: String, required: true },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false },
        file: { type: String, required: true },
        id: { type: Number },
    },
    options: [{ name : { type: String }, value: { type: String } }]
});

const variantSchema = new mongoose.Schema({
    id : { type: Number },
    uuid : { type: String, },
    value : { type: String, required: true  },
    slug : { type: String, required: true },
    meta : { type: String },
    attributes : { type: mongoose.Types.ObjectId , ref: "Attribute"}
},{ timestamps: true });

const productSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true },
        uuid: { type: String, unique: true },
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number , default: null},
        sale_price: { type: Number, default: null },
        status : { type: String, enum: ['publish',"draft"],required: true, default: "publish"},
        sku: { type: String },
        slug: { type: String, required: true  },
        gender: { type: String },
        group: { type: mongoose.Types.ObjectId, ref: "Group" },
        tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
        categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
        product_type: { type: String, enum: ["simple", "variable"], default: "simple" },
        has_variants: { type: Boolean, default: false },
        variants: [variantSchema],
        variation_options: [variationOptionSchema],
        quantity: { type: Number, required: true },
        min_price: { type: Number },
        max_price: { type: Number },
        width: { type: String },
        height: { type: String },
        length: { type: String },
        image: {
            uuid: { type: String, required: true },
            is_active: { type: Boolean, default: true },
            is_deleted: { type: Boolean, default: false },
            file: { type: String, required: true },
            id: { type: Number },
            _id: false 
        },
        gallery: [gallerySchema],
        is_active: { type: Boolean, default: true },
        is_delete: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

productSchema.pre("save",async function(next){
    try {
    if(!this.id){
       const uuid = await generateUUID()
       const sequence = await Sequence.findByIdAndUpdate({ _id : "ProductsId"},{ $inc: { seq: 1}},{ new: true, upsert: true })
       this.id = sequence.seq
       this.uuid = uuid
       next()
    }else{
        next()
    } 
    } catch (error) {
       next(error) 
    }
})

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
