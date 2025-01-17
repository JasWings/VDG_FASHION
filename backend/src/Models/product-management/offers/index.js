import mongoose from "mongoose";
import { generateUUID } from "../../../utils/helpers.js";
import { Sequence } from "../../helpers/sequence.js";


const offerSchema = new mongoose.Schema(
    {
        offerTitle: {
            type: String,
            required: true
        },
        offerType: {
            type: String,
            enum: ['BUY_X_GET_Y', 'BUY_X_PAY_Z'],
            required: true
        },
        x: {
            type: Number, // Quantity to buy
            required: true
        },
        y: {
            type: Number, // Quantity to get
            required: true
        },
        z: {
            type: Number, // Quantity to pay (for BUY_X_PAY_Z offer type)
            required: false
        },
        validFrom: {
            type: Date,
            required: true
        },
        validTill: {
            type: Date,
            required: true
        },
        productIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref:'products',
            required: true
        }
    },
    {
        timestamps: true
    }
);

offerSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("OfferId", { $inc: { seq: 1 } }, { new: true, upsert: true })
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

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;

