import mongoose from "mongoose"
import { Sequence } from "../helpers/sequence.js"
import { generateUUID } from "../../utils/helpers.js"

const sliderSchema = new mongoose.Schema({
    id : { type: Number },
    uuid : { type: String },
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    images: [{ type: String, required: true }], 
    linkType: { type: String, enum: ['product', 'category', 'external'] },
    linkTarget: { type: String },
    priority: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
}, {
    timestamps: true,
});

sliderSchema.pre("save", async function(next){
    try {
        const sequence = await Sequence.findOneAndUpdate({ _id: "SliderIds"},{ $inc: { seq: 1}},{ new: true, upsert: true })  
        const uuid = await generateUUID()
        this.id = sequence.seq
        this.uuid = uuid
        next()  
       } catch (error) {
         next(error)  
       }
})

const Sliders = mongoose.model('Slider', sliderSchema);
export default Sliders
