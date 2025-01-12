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

