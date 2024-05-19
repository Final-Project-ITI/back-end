class OrderController {
  orderServices;
  cartService;
  itemService;
  phoneService;
  authService;

  constructor(
    _orderServices,
    _cartService,
    _itemService,
    _phoneService,
    _authService
  ) {
    this.orderServices = _orderServices;
    this.cartService = _cartService;
    this.itemService = _itemService;
    this.phoneService = _phoneService;
    this.authService = _authService;
  }

  async getAllUserOrders(userId) {
    try {
      const userOrders = await this.orderServices.getAllUserOrders(userId);
      if (!userOrders || userOrders.length === 0) {
        return { statusCode: 404, data: { message: "user Orders not found" } };
      }
      return { statusCode: 200, data: userOrders };
    } catch (error) {
      console.error("Error fetching Orders:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }
  async getUserOrderById(userId, orderId) {
    try {
      const order = await this.orderServices.getUserOrderById(userId, orderId);
      if (!order) {
        return { statusCode: 404, data: { message: "Order not found" } };
      }
      return { statusCode: 200, data: order };
    } catch (error) {
      console.error("Error fetching user Order:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }

  updateOrderStatus() {
    return this.orderServices.updateOrderStatus();
  }
  getRestaurantOrderById() {
    return this.orderServices.getRestaurantOrderById();
  }

  async createNewOrder({ phoneId }, userId, restaurantId) {
    const phone = await this.phoneService.getUserPhoneNumberById(phoneId);

    if (!phone) {
      return {
        statusCode: 404,
        data: { message: "can't find phone number" },
      };
    }

    const orderInfo = {
      phoneId,
      statusId: "6646747dd96fa5f4ee9cacd8",
    };

    const cart = await this.cartService.getUserCart(userId);

    if (!cart) {
      return {
        statusCode: 404,
        data: { message: "cart is empty" },
      };
    }

    const order = await this.orderServices.createNewOrder(orderInfo);

    cart.itemsIds.forEach(async (item) => {
      await this.itemService.updateUserItemById(
        { _id: item._id },
        { orderId: order._id }
      );
    });

    await this.cartService.deleteUserCart(userId);

    return {
      statusCode: 201,
      data: { message: "order placed successfuly" },
    };
  }

  updateOrderStatus() {
    return this.orderServices.updateOrderStatus();
  }
}

module.exports = OrderController;
