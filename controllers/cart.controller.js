class CartController {
  cartService;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(cartService) {
    this.cartService = cartService;
  }
  async getUserCart(req, res) {
    try {
      const userId = req.user.id;
      const cartItems = await this.cartService.getUserCart(userId);

      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "Cart items not found" });
      }

      return res.status(200).json({ cart_items: cartItems });
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CartController;
