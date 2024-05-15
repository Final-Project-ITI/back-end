const CartModel = require("../models/cart.model");

class CartService {
  async getUserCart(userId) {
    try {
      const cartItems = await CartModel.find({ userID: userId });
      return cartItems;
    } catch (error) {
      console.error("Error fetching user cart:", error);
      throw error;
    }
  }
}
module.exports = CartService;
