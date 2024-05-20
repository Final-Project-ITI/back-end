class CartController {
  cartRepository;
  itemRepository;
  authRepository;
  productRepository;

  constructor(
    _cartRepository,
    _itemRepository,
    _productRepository,
    _authRepository
  ) {
    this.cartRepository = _cartRepository;
    this.itemRepository = _itemRepository;
    this.productRepository = _productRepository;
    this.authRepository = _authRepository;
  }
  getCartItems() {
    return this.cartRepository.getCartItems();
  }
  async deleteItemFromCart(itemId) {
    try {
      const isDeleted = await cartRepository.deleteItemFromCart(itemId);
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

  async getUserCart(userId) {
    try {
      const cartItems = await this.cartRepository.getUserCart(userId);
      if (!cartItems || cartItems.length === 0) {
        return { statusCode: 404, data: { message: "Cart items not found" } };
      }
      return { statusCode: 200, data: cartItems };
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }

  async addItemToCart(itemInfo, userId) {
    const { productId, quantity } = itemInfo;

    /* Checks if the product exists */

    const product = await this.productRepository.getProductsById(productId);

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

    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      const item = await this.itemRepository.createItem(itemInfo);

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
        await this.itemRepository.updateUserItemById(
          { _id: item._id },
          { quantity: ++item.quantity }
        );
      } else {
        const item = await this.itemRepository.createItem(itemInfo);

        cart.itemsIds.push(item);

        await this.cartRepository.updateUserCart(userId, cart);
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

    const product = await this.productRepository.getProductsById(productId);

    if (!product) {
      return {
        statusCode: 400,
        data: { message: "product not found" },
      };
    }
  }

  async createCart(itemId, userId) {
    await this.cartRepository.createCart({
      itemsIds: [itemId],
      userId: userId,
    });
    /* Checks if there is a cart */

    const cart = await this.cartRepository.getUserCart(userId);

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
        await this.itemRepository.updateUserItemById(
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

  async clearUserCart(userId) {
    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      return {
        statusCode: 404,
        data: { message: "there is no cart to clear" },
      };
    }

    cart.itemsIds.forEach((item) => {
      this.itemRepository.deleteUserItemById(item);
    });

    this.cartRepository.deleteUserCart(userId);

    return {
      statusCode: 200,
      data: { message: "cart has been cleared" },
    };
  }

  async createCart(itemId, userId) {
    await this.cartRepository.createCart({
      itemsIds: [itemId],
      userId: userId,
    });
  }
}

module.exports = CartController;
