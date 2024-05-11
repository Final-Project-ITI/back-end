class CartController {
    constructor(cartService) {
        this.cartService = cartService

    }
    getCartItems() {
        return this.cartService.getCartItems()
    }
}

module.exports = CartController