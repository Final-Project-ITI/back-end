class CartController {
  cartService;
  itemService;
  authService;
  productService;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(_cartService, _itemService, _productService, _authService) {
    this.cartService = _cartService;
    this.itemService = _itemService;
    this.productService = _productService;
    this.authService = _authService;
  }
  async getUserCart(userId) {
    try {
      const cartItems = await this.cartService.getUserCart(userId);
      if (!cartItems || cartItems.length === 0) {
        return { statusCode: 404, data: { message: "Cart items not found" } };
      }
      return { statusCode: 200, data: cartItems };
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }
  getUserItems() {
    try {
      const items = [];

      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "Cart items not found" });
      }

      return res.status(200).json({ cart_items: cartItems });
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addItemToCart(itemInfo, userId) {
    const { productId, quantity } = itemInfo;

    /* Checks if the product exists */

    const product = await this.productService.getProductsById(productId);

    if (!product) {
      return {
        statusCode: 400,
        data: { message: "product not found" },
      };
    }

    /* Checks if the number of quantities exceeded the food item limit & Creating the item*/

    // if (quantity && quantity > product.limit) {
    //     return {
    //         statusCode: 400,
    //         data: { message: 'quantity exceeded the product limit' }
    //     }
    // }

    /* Checks if there is a cart */

    const cart = await this.cartService.getUserCart(userId);

    if (!cart) {
      const item = await this.itemService.createItem(itemInfo);

      await this.createCart(item, userId);

      return {
        statusCode: 200,
        data: "Cart Created",
      };
    } else {
      const item = cart.itemsIds.find((item) => {
        return item.productId == productId;
      });

      if (item) {
        await this.itemService.updateUserItemById(
          { _id: item._id },
          { quantity: ++item.quantity }
        );
      } else {
        const item = await this.itemService.createItem(itemInfo);

        cart.itemsIds.push(item);

        await this.cartService.updateUserCart(userId, cart);
      }

      return {
        statusCode: 200,
        data: cart,
      };
    }
  }

  async updateItem(itemInfo, userId) {
    const { productId, quantity } = itemInfo;

    /* Checks if the product exists */

    const product = await this.productService.getProductsById(productId);

    if (!product) {
      return {
        statusCode: 400,
        data: { message: "product not found" },
      };
    }
  }

  removeItemFromCart() {}

  async createItem(itemInfo) {}

  async createCart(itemId, userId) {
    await this.cartService.createCart({
      itemsIds: [itemId],
      userId: userId,
    });
    /* Checks if there is a cart */

    const cart = await this.cartService.getUserCart(userId);

    if (!cart) {
      return {
        statusCode: 400,
        data: { message: "item not found" },
      };
    } else {
      const item = cart.itemsIds.find((item) => {
        return item.productId == productId;
      });

      /* Checks if the number of quantities exceeded the food item limit & Creating the item*/

      if (item.quantity + quantity > product.limit) {
        return {
          statusCode: 400,
          data: { message: "quantity exceeded the product limit" },
        };
      }

      if (item) {
        await this.itemService.updateUserItemById(
          { _id: item._id },
          { quantity: item.quantity + quantity }
        );
      } else {
        return {
          statusCode: 400,
          data: { message: "item not found" },
        };
      }

      return {
        statusCode: 200,
        data: cart,
      };
    }
  }

  async createItem(itemInfo) {}

  async clearUserCart(userId) {
    const cart = await this.cartService.getUserCart(userId);

    if (!cart) {
      return {
        statusCode: 404,
        data: { message: "there is no cart to clear" },
      };
    }

    cart.itemsIds.forEach((item) => {
      this.itemService.deleteUserItemById(item);
    });

    this.cartService.deleteUserCart(userId);

    return {
      statusCode: 200,
      data: { message: "cart has been cleared" },
    };
  }

  updateItem() {}

  getUserCart(cartId) {
    return this.cartService.getUserCart(cartId);
  }

  async createItem(itemInfo) {}

  async createCart(itemId, userId) {
    await this.cartService.createCart({
      itemsIds: [itemId],
      userId: userId,
    });
  }
}

module.exports = CartController;
