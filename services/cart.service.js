const ApiError = require("../utils/error");

class CartService {
  getCartItems() {
    return "get all carts";
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
