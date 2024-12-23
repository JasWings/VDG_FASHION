import mongoose from "mongoose";
import { Sequence } from "../../helpers/sequence.js";
import { generateUUID } from "../../../utils/helpers.js";


const StatusHistorySchema = new mongoose.Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    id : { type: Number},
    uuid : { type: String },
    is_active :  { type: String, default: true },
    is_delete : { type: Boolean, default: false}
  },{ timestamps: true });

const orderSchema = new mongoose.Schema({
    tracking_number: { type: String, default: null },
    customer_id: 
    { 
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
    id : {
        type: Number,
    },
    uuid : {
        type: String,
    },
    customer_contact: { type: String, required: true },
    amount: { type: Number, required: true },
    sales_tax: { type: Number, required: true , default: 0},
    paid_total: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    cancelled_amount: { type: String, default: "0.00" },
    language: { type: String, default: "en" },
    coupon_id: { type: mongoose.Schema.Types.Mixed, default: null },
    parent_id: { type: mongoose.Schema.Types.Mixed, default: null },
    shop_id: { type: mongoose.Schema.Types.Mixed, default: null },
    discount: { type: Number, default: 0 },
    payment_gateway: { type: String, default: "RAZORPAY"},
    payment_id : { type: String },
    status_history: { type: [StatusHistorySchema], default: [] },
    data : {
    items: [{
            product: { type: mongoose.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            sale_price : { type: Number, required: true }
          }],
        price_details: {
            total_actual_price: { type: Number, required: true, default: 0 },
            total_current_price: { type: Number, required: true, default: 0 },
            total_quantity: { type: Number, required: true, default: 0 },
        },
    },
    shipping_address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    billing_address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    logistics_provider: { type: String, default: null },
    delivery_fee: { type: Number },
    delivery_time: { type: String },
    order_status: { type: String, default: "initiated", enum: [ "initiated","placed","delivered","cancelled"] },
    payment_status: { type: String, default: "initiated", enum : ['initiated',"completed","failed"] },
    created_at: { type: Date, default: Date.now },
    order_date: { type: Date, default: Date.now },
    payment_intent: { type: mongoose.Schema.Types.Mixed, default: null },
    razorpayOrderId: { type: String },
})
orderSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("OrderId", { $inc: { seq: 1 } }, { new: true, upsert: true })
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

const Order = mongoose.model("Order", orderSchema);

export default Order;