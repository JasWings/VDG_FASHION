import Offer from '../../Models/mark-&-promotions/offer.js';

export const createOffer = async (req, res) => {
    try {
        const {
            offerTitle,
            discountType,
            buyQuantity,
            getQuantity,
            eligibleProducts,
            freeProducts,
            startDate,
            endDate,
            applyConditions,
            minimumPurchaseAmount,
            usageRestrictions,
            isActive
        } = req.body;

        const offer = new Offer({
            offerTitle,
            discountType,
            buyQuantity,
            getQuantity,
            eligibleProducts,
            freeProducts,
            startDate,
            endDate,
            applyConditions,
            minimumPurchaseAmount,
            usageRestrictions,
            isActive
        });

        await offer.save();
        res.status(201).json({ message: 'Offer created successfully', data: offer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
            .populate('eligibleProducts freeProducts');

        res.status(200).json({
            status: "success",
            message: "Offers retrieved successfully",
            data: offers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findById(id)
            .populate('eligibleProducts freeProducts');

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({
            status: "success",
            message: "Offer retrieved successfully",
            data: offer
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            offerTitle,
            discountType,
            buyQuantity,
            getQuantity,
            eligibleProducts,
            freeProducts,
            startDate,
            endDate,
            applyConditions,
            minimumPurchaseAmount,
            usageRestrictions,
            isActive
        } = req.body;

        const updatedOffer = await Offer.findByIdAndUpdate(
            id,
            {
                offerTitle,
                discountType,
                buyQuantity,
                getQuantity,
                eligibleProducts,
                freeProducts,
                startDate,
                endDate,
                applyConditions,
                minimumPurchaseAmount,
                usageRestrictions,
                isActive
            },
            { new: true }
        ).populate('eligibleProducts freeProducts');

        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({
            message: 'Offer updated successfully',
            data: updatedOffer
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
