import Offer from '../../../Models/product-management/offers/index.js';
import Validations from '../../../Validations/index.js';


export const createOffer = async (req, res) => {
    try {
        const offerData = Validations.offerdetails(req.body);

        const newOffer = new Offer(offerData);
        await newOffer.save();

        res.status(201).json({
            message: 'Offer created successfully',
            offer: newOffer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create offer', error: error.message });
    }
};


export const getActiveOffers = async (req, res) => {
    try {
        const today = new Date();

        const activeOffers = await Offer.find({
            validFrom: { $lte: today },
            validTill: { $gte: today }
        }).populate('productIds')

        if (!activeOffers.length) {
            return res.status(404).json({ message: 'No active offers available' });
        }

        res.status(200).json(activeOffers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch offers', error: error.message });
    }
};


export const getOfferById = async (req, res) => {
    try {
        const { offerId } = req.params;

        const offer = await Offer.findById(offerId);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json(offer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch offer', error: error.message });
    }
};


export const updateOffer = async (req, res) => {
    try {
        const { offerId } = req.params;
        const updatedData = req.body;

        const updatedOffer = await Offer.findByIdAndUpdate(offerId, updatedData, { new: true });

        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer updated successfully', offer: updatedOffer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update offer', error: error.message });
    }
};

// Delete an offer
export const deleteOffer = async (req, res) => {
    try {
        const { offerId } = req.params;

        const offer = await Offer.findByIdAndDelete(offerId);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete offer', error: error.message });
    }
};
