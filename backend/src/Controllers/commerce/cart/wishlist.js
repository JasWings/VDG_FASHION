import Wishlist from "../../../Models/cart-management/wishlist.js";
import ProductModel from "../../../Models/product-management/product/index.js";
import Cart from "../../../Models/cart-management/index.js";


export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');
    if (!wishlist) {
      return res.status(404).json({ status: 'failed', message: 'Wishlist not found' });
    }
    res.status(200).json({ status: 'success', data: wishlist });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product } = req.body;

    const productDetails = await ProductModel.findOne({ uuid: product });
    if (!productDetails) {
      return res.status(404).json({ status: 'failed', message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const isProductInWishlist = wishlist.items.some(
      (item) => item.product.toString() === productDetails._id.toString()
    );
    if (isProductInWishlist) {
      return res.status(400).json({ status: 'failed', message: 'Product already in wishlist' });
    }

    wishlist.items.push({ product: productDetails._id });
    await wishlist.save();

    res.status(200).json({ status: 'success', message: 'Product added to wishlist', data: wishlist });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ status: 'failed', message: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== product
    );
    await wishlist.save();

    res.status(200).json({ status: 'success', message: 'Product removed from wishlist', data: wishlist });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};

export const moveToCart = async (req, res) => {
  try {
    const user = req.user;
    const { product, quantity } = req.body;

    const productDetails = await ProductModel.findOne({ uuid: product });
    if (!productDetails) {
      return res.status(404).json({ status: 'failed', message: 'Product not found' });
    }

    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      return res.status(404).json({ status: 'failed', message: 'Wishlist not found' });
    }

    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productDetails._id.toString()
    );
    if (itemIndex === -1) {
      return res.status(404).json({ status: 'failed', message: 'Product not in wishlist' });
    }

    let cart = await Cart.findOne({ user: user._id, is_active: true });
    if (!cart) {
      cart = new Cart({
        user: user._id,
        items: [],
        price_details: {
          total_actual_price: 0,
          total_current_price: 0,
          total_quantity: 0,
        },
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productDetails._id.toString()
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productDetails._id,
        quantity: quantity || 1,
        price: productDetails.price,
        sale_price: productDetails.sale_price,
      });
    }

    cart.items = cart.items.filter((item) => item.quantity > 0);

    cart.price_details.total_actual_price = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    cart.price_details.total_current_price = cart.items.reduce(
      (acc, item) => acc + item.sale_price * item.quantity,
      0
    );
    cart.price_details.total_quantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    await cart.save();

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    res.status(200).json({
      status: 'success',
      message: 'Product moved to cart',
      data: { wishlist, cart },
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};
