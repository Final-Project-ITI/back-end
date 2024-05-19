class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }
  getCartItems() {
    return this.cartService.getCartItems();
  }
  async deleteItemFromCart(itemId) {
    try {
      const isDeleted = await cartService.deleteItemFromCart(itemId);
      if (isDeleted) {
        return {
          statusCode: 200,
          data: { message: "Item removed from cart successfully" },
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        data: { message: error.message },
      };
    }
  }
}

module.exports = CartController;
