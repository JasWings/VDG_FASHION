import express from "express"
import { addToWishlist, getWishlist, removeFromWishlist } from "../../../Controllers/wishlist/index.js";
import {  requireSignIn } from "../../../Middleware/AuthMiddleware.js";



const wishlistrouter = express.Router();

wishlistrouter.get('/', requireSignIn, getWishlist);
wishlistrouter.post('/', requireSignIn,addToWishlist);
wishlistrouter.delete('/remove/:productId', requireSignIn, removeFromWishlist);

export default wishlistrouter;
