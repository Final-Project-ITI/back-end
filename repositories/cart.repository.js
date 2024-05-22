const CartModel = require("../models/cart.model");

class CartService {
  constructor() { }

  async getUserCart(userId) {
    return await CartModel.findOne({ userId }).populate("itemsIds");
  }

  async getUserItems(userId) {
    return await CartModel.findOne({ userId });
  }

  async updateUserCart(userId, val) {
    return await CartModel.updateMany({ userId }, val);
  }

  async deleteUserCart(userId) {
    return await CartModel.deleteOne({ userId });
  }

  async createCart(cartInfo) {
    return await CartModel.create(cartInfo);
  }
}

module.exports = CartService;
