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
}

module.exports = CartService;
