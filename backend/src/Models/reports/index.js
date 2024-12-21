import mongoose from "mongoose";
import { Sequence } from "../helpers/sequence.js";
import { generateUUID } from "../../utils/helpers.js";

const reportSchema = new mongoose.Schema({
    reportType: { type: String, required: true },
    data: { type: Object, required: true },
    generatedAt: { type: Date, default: Date.now },
});


reportSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("ReportId", { $inc: { seq: 1 } }, { new: true, upsert: true })
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

const Report = mongoose.model('Report',reportSchema)

export default Report;

