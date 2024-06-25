const Errors = require("../error/error");

class CartController {
  cartRepository;
  itemRepository;
  productRepository;
  authRepository;

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

  async getUserCart(userId) {
    const cart = await this.cartRepository.getUserCart(userId);
    

    return cart;
  }

  async addItemToCart(itemInfo, userId) {
    /* Checks if the product exists */

    const { productId, quantity } = itemInfo;
    const product = await this.productRepository.getProductsById(productId);

    if (!product) {
      throw new Errors.NotFoundError("product not found");
    }

    /* Checks if there is a cart */

    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      /* Create new cart */

      const item = await this.itemRepository.createItem(itemInfo);
      await this.createCart(item, userId);

      return await this.cartRepository.getUserCart(userId);
    }
    else if(!cart.itemsIds.length){
      const item = await this.itemRepository.createItem(itemInfo);
      cart.itemsIds.push(item);
      await this.cartRepository.updateUserCart(userId, cart);
      return await this.cartRepository.getUserCart(userId);

    }
     else {
     
      /* Add new item to the existed cart */
      const firstProduct = await this.productRepository.getProductsById(cart.itemsIds[0].productId);

      if (firstProduct.restaurantId._id.toString() !== product.restaurantId._id.toString()) {
        throw new Errors.ApiError("can not include multiple restaurants in the cart", 400);
      }

      const item = cart.itemsIds.find((item) => {
        return item.productId._id == productId;
      });

      if (item) {
        /* Increment the quantity if the product already in the cart */

        await this.itemRepository.updateUserItemById(
          { _id: item._id },
          { quantity: quantity ? quantity + item.quantity : ++item.quantity }
        );
      } else {
        /* Create new item if the product is not in the cart */
        const item = await this.itemRepository.createItem(itemInfo);
        cart.itemsIds.push(item);
        await this.cartRepository.updateUserCart(userId, cart);
      }

      return await this.cartRepository.getUserCart(userId);
    }
  }

  async updateItem(itemInfo, itemId, userId) {
    const { quantity } = itemInfo;
    const cart = await this.cartRepository.getUserItems(userId);
    const isItemInCart = cart.itemsIds.filter((item) => item.toString() === itemId);

    if (!isItemInCart.length) {
      throw new Errors.UnAuthError();
    }

    /* Update the quantity */

    return await this.itemRepository.updateUserItemById({ _id: itemId }, { quantity });
  }

  async clearUserCart(userId) {
    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      throw new Errors.ApiError("there is no cart to clear", 400);
    }

    cart.itemsIds.forEach((item) => {
      this.itemRepository.deleteUserItemById(item);
    });

    const deletedCart = await this.cartRepository.deleteUserCart(userId);

    return deletedCart;
  }

  async deleteItemFromCart(itemId, userId) {
    
    const cart = await this.cartRepository.getUserItems(userId);

    const isItemInCart = cart.itemsIds.filter((item) => item.toString() === itemId);

    if (!isItemInCart.length) {
      throw new Errors.UnAuthError();
    }

    /* Delete Item */
    this.cartRepository.deleteItem(userId,itemId)
    return await this.itemRepository.deleteUserItemById({ _id: itemId });
  }

  async createCart(itemId, userId) {
    await this.cartRepository.createCart({
      itemsIds: [itemId],
      userId: userId,
    });
  }
}

module.exports = CartController;
