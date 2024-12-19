import mongoose from 'mongoose';
import { generateUUID } from '../../utils/helpers.js';
import { Sequence } from '../helpers/sequence.js';

const paymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_id: { type: String, required: true },
    payment_status: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_gateway: { type: String, default: "razorpay" },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});
paymentSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("CheckoutId", { $inc: { seq: 1 } }, { new: true, upsert: true })
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

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
