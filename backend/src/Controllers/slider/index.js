import Sliders from '../../Models/mark-&-promotions/sliders.js';

export const createSliders = async (req, res) => {
    try {
        const { title, description, images, linkType, linkTarget, priority, isActive, startDate, endDate } = req.body;

        const newSlider = new Sliders({
            title,
            description,
            images, // Accept array of image URLs
            linkType,
            linkTarget,
            priority,
            isActive,
            startDate,
            endDate,
        });

        const savedSlider = await newSlider.save();
        res.status(201).json({ message: 'Sliders created successfully.', slider: savedSlider });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create slider.', details: error.message });
    }
}


export const getActiveSliders = async (req, res) => {
    try {
        const currentDate = new Date();

        const activeSliders = await Sliders.find({
            isActive: true,
            $or: [
                { startDate: { $exists: false }, endDate: { $exists: false } },
                { startDate: { $lte: currentDate }, endDate: { $gte: currentDate } },
            ],
        }).sort({ priority: -1 });

        res.status(200).json(activeSliders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch active sliders.', details: error.message });
    }
}



export const getAllSliders = async (req, res) => {
    try {
        const sliders = await Sliders.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", message: "Sliders retrive successfully" ,data:sliders});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sliders.', details: error.message });
    }
};


export const getSliderById = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Sliders.findById(id);
        if (!slider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({status: "success", message: "Slider retrive successfully",data: slider});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch slider.', details: error.message });
    }
};


export const updateSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedSlider = await Sliders.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSlider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({ message: 'Slider updated successfully.', slider: updatedSlider });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update slider.', details: error.message });
    }
};


export const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSlider = await Sliders.findByIdAndDelete(id);
        if (!deletedSlider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({ message: 'Slider deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete slider.', details: error.message });
    }
};
