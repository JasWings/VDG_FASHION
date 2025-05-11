import Sliders from '../../Models/mark-&-promotions/sliders.js';

export const createSliders = async (req, res) => {
    try {
        const { name, description, images, linkType, linkTarget, priority, isActive, startDate, endDate } = req.body;

        
        let imagePaths = [];
        if (Array.isArray(images) && images.every(image => typeof image === 'object' && image.file)) {
            
            imagePaths = images.map(image => image.file);
        }

        
        if (Array.isArray(imagePaths) && imagePaths.every(image => typeof image === 'string')) {
            const newSlider = new Sliders({
                name,
                description,
                images: imagePaths,
                linkType,
                linkTarget,
                priority,
                isActive,
                startDate,
                endDate,
            });

            const savedSlider = await newSlider.save();
            res.status(201).json({ message: 'Slider created successfully.', slider: savedSlider });
        } else {
            res.status(400).json({ error: 'Invalid images format. Images should be an array of strings.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create slider.', details: error.message });
    }
};

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
        const sliders = await Sliders.find();
        res.status(200).json({ status: "success", message: "Sliders retrieved successfully", data: sliders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sliders.', details: error.message });
    }
};

export const getSliderById = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Sliders.findById(id);
        if (!slider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({ status: "success", message: "Slider retrieved successfully", data: slider });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch slider.', details: error.message });
    }
};

export const updateSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Optional: Validate images if present
        if (updatedData.images && !Array.isArray(updatedData.images)) {
            return res.status(400).json({ error: 'Invalid images format. Images should be an array of strings.' });
        }

        const updatedSlider = await Sliders.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSlider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({ message: 'Slider updated successfully.', slider: updatedSlider });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update slider.', details: error.message });
    }
};

export const deleteSlider = async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedSlider = await Sliders.findOneAndDelete({ uuid: _id});
        if (!deletedSlider) return res.status(404).json({ error: 'Slider not found.' });
        res.status(200).json({ message: 'Slider deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete slider.', details: error.message });
    }
};

export const createMultipleSliders = async (req, res) => {
    try {
        const sliders = req.body.sliders; // Expect an array of slider objects in req.body

        // Validate that sliders is an array
        if (!Array.isArray(sliders) || sliders.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of sliders.' });
        }

        // Validate the images field in each slider object
        for (let slider of sliders) {
            if (slider.images && !Array.isArray(slider.images)) {
                return res.status(400).json({ error: 'Invalid images format in one or more sliders. Images should be an array of strings.' });
            }
        }

        const newSliders = await Sliders.insertMany(sliders);
        res.status(201).json({ message: 'Sliders created successfully.', sliders: newSliders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create sliders.', details: error.message });
    }
};
