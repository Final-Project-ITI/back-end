const CartModel = require("../models/cart.model");

class CartRepository {
  constructor() { }

  async getUserCart(userId) {
    return await CartModel.findOne({ userId }).populate({ 
      path: 'itemsIds',
      populate: {
        path: 'productId',
        model: 'Product'
      } 
   })

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
  async deleteItem(userId,itemId) {
    return await CartModel.updateOne({ userId },{ $pull: { 'itemsIds': itemId } });
  }

}

module.exports = CartRepository;
