import mongoose from 'mongoose'
import { generateUUID } from '../../utils/helpers.js';
import { Sequence } from '../helpers/sequence.js';


const faqSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

faqSchema.pre("save", async function (next) {
    if (!this.id) {
        try {
            const uuid = await generateUUID()
            const sequence = await Sequence.findByIdAndUpdate("FaqId", { $inc: { seq: 1 } }, { new: true, upsert: true })
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

const Faq = mongoose.model('Faq',faqSchema)

export default Faq;
