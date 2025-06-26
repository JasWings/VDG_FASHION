 
import ProductModel from '../../Models/product-management/product/index.js';
import { User } from '../../Models/user-management/administration/index.js';
import Wishlist from '../../Models/wishlist/index.js';

// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id; 
    try {
        // Validate user
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate product
        const productExists = await ProductModel.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if product is already in the wishlist
        const existingItem = await Wishlist.findOne({ user: userId, productId });
        if (existingItem) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        // Add to wishlist
        const wishlistItem = new Wishlist({ user: userId, productId });
        await wishlistItem.save();
        res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all wishlist items for a user
export const getWishlist = async (req, res) => {
    const userId = req.user._id; // Assuming `req.user` contains the authenticated user's data

    try {
        const wishlist = await Wishlist.find({ user: userId }).populate('productId').populate('user');
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id; // Assuming `req.user` contains the authenticated user's data

    try {
        const wishlistItem = await Wishlist.findOneAndDelete({ user: userId, productId });
        if (!wishlistItem) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
