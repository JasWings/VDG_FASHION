import mongoose from "mongoose";
import { Sequence } from "../../helpers/sequence.js";
import { generateUUID } from "../../../utils/helpers.js";

const orderSchema = new mongoose.Schema({
    tracking_number: { type: String, required: true },
    customer_id: 
    { 
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },

    customer_contact: { type: String, required: true },
    amount: { type: Number, required: true },
    sales_tax: { type: Number, required: true },
    paid_total: { type: Number, required: true },
    total: { type: Number, required: true },
    cancelled_amount: { type: String, default: "0.00" },
    language: { type: String, default: "en" },
    coupon_id: { type: mongoose.Schema.Types.Mixed, default: null },
    parent_id: { type: mongoose.Schema.Types.Mixed, default: null },
    shop_id: { type: mongoose.Schema.Types.Mixed, default: null },
    discount: { type: Number, default: 0 },
    payment_gateway: { type: String, required: true },
    shipping_address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    billing_address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    logistics_provider: { type: String, default: null },
    delivery_fee: { type: Number, required: true },
    delivery_time: { type: String, required: true },
    order_status: { type: String, default: "order-pending" },
    payment_status: { type: String, default: "payment-pending" },
    created_at: { type: Date, default: Date.now },
    order_date: { type: Date, default: Date.now },
    payment_intent: { type: mongoose.Schema.Types.Mixed, default: null },
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