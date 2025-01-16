import Offer from '../../Models/mark-&-promotions/offer.js';

export const createOffer = async (req, res) => {
    try {
        const offer = new Offer(req.body);
        await offer.save();
        res.status(201).json({ message: 'Offer created successfully', offer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().populate('applicableProducts freeProducts');
        res.status(200).json({ status: "success", message: "Offers retrived successfully", data : offers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findById(id).populate('applicableProducts freeProducts');
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json({ status: "success", message: "offer retrived successfully" ,data:  offer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, { new: true }).populate('applicableProducts freeProducts');
        if (!updatedOffer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json({ message: 'Offer updated successfully', updatedOffer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOffer = await Offer.findByIdAndDelete(id);
        if (!deletedOffer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
