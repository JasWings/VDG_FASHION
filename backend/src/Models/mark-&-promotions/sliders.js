import mongoose from "mongoose"

const sliderSchema = new mongoose.Schema({
    title: { type: String, trim: true },
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

const Sliders = mongoose.model('Slider', sliderSchema);
export default Sliders
