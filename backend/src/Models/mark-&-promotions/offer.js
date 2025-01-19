import mongoose from "mongoose";
import { Sequence } from "../helpers/sequence.js";
import { generateUUID } from "../../utils/helpers.js";

const offerSchema = new mongoose.Schema({
    id: { type: Number },
    uuid: { type: String },
    offerTitle: { type: String, required: true },
    discountType: { type: String, enum: ['Buy X Get Y', 'Buy X Get X'], required: true },
    buyQuantity: { type: Number, required: true },
    getQuantity: { type: Number, required: true },
    eligibleProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }], // Products needed to activate the offer
    freeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }], // New field for free products
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    applyConditions: { type: Array, default: [] },
    minimumPurchaseAmount: { type: Number, default: 0 },
    usageRestrictions: {
        perUser: { type: Number, default: null },
        globalLimit: { type: Number, default: null }
    },
    isActive: { type: Boolean, default: true },
});

// Sequence and UUID generation logic
offerSchema.pre("save", async function (next) {
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { _id: "OfferIds" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const uuid = await generateUUID();
        this.id = sequence.seq;
        this.uuid = uuid;
        next();
    } catch (error) {
        next(error);
    }
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
