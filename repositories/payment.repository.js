const CartModel = require("../models/cart.model");

class PaymentRepository {
  async payWithStripe(userId) {
    try {
      const cart = await CartModel.findOne({ userId }).populate({
        path: "itemsIds",
        populate: {
          path: "productId",
          model: "Product", // Assuming Product model name
        },
      });

      if (!cart) {
        throw new Error("Cart not found for user");
      }

      return cart; // Return the populated cart
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
}

module.exports = PaymentRepository;
