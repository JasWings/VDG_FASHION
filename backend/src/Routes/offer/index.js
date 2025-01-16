import express from 'express';
import { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer } from '../../Controllers/offer/index.js';

const offerRouter = express.Router();

offerRouter.post('/', createOffer);

offerRouter.get('/', getAllOffers);

offerRouter.get('/:id', getOfferById);

offerRouter.put('/:id', updateOffer);

offerRouter.delete('/:id', deleteOffer);

export default offerRouter;
