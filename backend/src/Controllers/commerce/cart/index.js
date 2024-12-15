import Cart from "../../../Models/cart-management/index.js";
import ProductModel from "../../../Models/product-management/product/index.js";

export const AddItemsToCart = async (req, res) => {
    try {
      const user = req.user;
      const { product, quantity } = req.body;
  
      const product_details = await ProductModel.findOne({ uuid: product });
  
      if (!product_details) {
        return res.status(404).json({ status: "failed", message: "Product not found" });
      }
  
      let cart = await Cart.findOne({ user: user?._id, is_active: true });
  
      if (!cart) {
        cart = new Cart({
          user: user?._id,
          items: [],
          price_details: {
            total_actual_price: 0,
            total_current_price: 0,
            total_quantity: 0,
          },
        });
      }
  
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product_details?._id.toString()
      );
  
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        cart.items.push({
          product: product_details?._id,
          quantity,
          price: product_details?.price,
          sale_price: product_details?.sale_price,
        });
      }
  
      
      cart.items = cart.items.filter((item) => item.quantity > 0);
  
      const totalActualPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalCurrentPrice = cart.items.reduce((acc, item) => acc + item.sale_price * item.quantity, 0);
      const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  
      cart.price_details.total_actual_price = totalActualPrice;
      cart.price_details.total_current_price = totalCurrentPrice;
      cart.price_details.total_quantity = totalQuantity;
  
      await cart.save();
  
      res.status(200).json({ status: "success", message: "Item add to cart successfully", data : cart });
    } catch (error) {
      console.error(error, "error");
      res.status(500).json({ status: "failed", message: error.message });
    }
  };
  


export const getCartDetails = async (req, res) => {
    try {
      const user = req.user;
  
      const cart_details = await Cart.findOne({ user: user?._id })
        .populate({
          path: "items",
          populate: {
            path: "product",
            model: "products",
          },
        });
  
      if (!cart_details) {
        return res.status(404).json({ status: "failed", message: "Cart not found." });
      }
  
      res.status(200).json({ status: "success", message: "Cart items retrived successfully", data : cart_details });
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message });
    }
  };
  