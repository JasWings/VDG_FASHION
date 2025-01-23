import express from "express"
import { addToWishlist, getWishlist, removeFromWishlist } from "../../../Controllers/wishlist/index.js";
import {  requireSignIn } from "../../../Middleware/AuthMiddleware.js";
import { VerifyToken } from "../../../services/authService.js";



const wishlistrouter = express.Router();

wishlistrouter.get('/', VerifyToken, getWishlist);
wishlistrouter.post('/', VerifyToken,addToWishlist);
wishlistrouter.delete('/:productId', VerifyToken, removeFromWishlist);

export default wishlistrouter;
