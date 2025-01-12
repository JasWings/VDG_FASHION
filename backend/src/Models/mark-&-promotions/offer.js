import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    offerType: { type: String, enum: ['BOGO', 'DISCOUNT'], required: true }, 
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    freeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    minimumPurchaseAmount: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer
