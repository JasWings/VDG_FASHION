// models/sliderImage.js
import mongoose from 'mongoose';

const sliderImageSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SliderImage = mongoose.model('SliderImage', sliderImageSchema);

export default SliderImage;
