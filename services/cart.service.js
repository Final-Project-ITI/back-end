const CartModel = require("../models/cart.model");

class CartService {
    constructor() { }

    async getUserCart(userId) {
        try {
            return await CartModel.findOne({ userId }).populate('itemsIds');
            // const cart = await CartModel.findOne({ userId });
            console.log(cart)
            return cart;
        } catch (error) {
            console.log(error.message)
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

    async deleteUserCart(id) {
        try {
            return await CartModel.deleteOne(id);
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