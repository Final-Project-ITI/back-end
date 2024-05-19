const ApiError = require("../utils/error");

const CartModel = require("../models/cart.model");

class CartService {
  constructor() {}

  async getUserCart(userId) {
    try {
      return await CartModel.findOne({ userId }).populate("itemsIds");
    } catch (error) {
      return error;
    }
  }

  async updateUserCart(userId, val) {
    try {
      return await CartModel.updateMany({ userId }, val);
    } catch (error) {
      return error;
    }
  }

  async deleteUserCart(userId) {
    try {
      return await CartModel.deleteOne({ userId });
    } catch (error) {
      return error;
    }
  }

  async createCart(cartInfo) {
    try {
      return await CartModel.create(cartInfo);
    } catch (error) {
      return error;
    }
  }

  async deleteItemFromCart(userId, itemId) {
    try {
      if (!userId) {
        throw new ApiError("User ID is required.", 400);
      }

      if (!req.session.cart) {
        throw new ApiError("Cart not found.", 400);
      }

      const index = req.session.cart.findIndex(
        (item) => item.itemId === itemId
      );
      if (index !== -1) {
        req.session.cart.splice(index, 1);
        return true;
      } else {
        throw new ApiError("Item not found in cart.", 400);
      }
    } catch (error) {
      throw new ApiError("Error removing item from cart: ", 400);
    }
  }
}

module.exports = CartService;
