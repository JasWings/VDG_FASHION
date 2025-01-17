import express from 'express'
import { createOffer, deleteOffer, getActiveOffers, getOfferById, updateOffer } from '../../../Controllers/commerce/offers/index.js';



const offerrouter = express.Router();

// Create a new offer (Admin only)
offerrouter.post('/create', createOffer);


offerrouter.get('/active', getActiveOffers);


offerrouter.get('/:offerId', getOfferById);


offerrouter.put('/:offerId', updateOffer);


offerrouter.delete('/:offerId', deleteOffer);

export default  offerrouter;
