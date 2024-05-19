class OrderController {
  orderServices;
  cartService;
  itemService;
  phoneService;
  authService;
  restaurantService;
  constructor(
    _orderServices,
    _cartService,
    _itemService,
    _phoneService,
    _authService,
    _restaurantService
  ) {
    this.orderServices = _orderServices;
    this.cartService = _cartService;
    this.itemService = _itemService;
    this.phoneService = _phoneService;
    this.authService = _authService;
    this.restaurantService = _restaurantService;
  }

  getAllOrders() {
    return this.orderServices.getAllOrders();
  }

  getAllRestaurantOrders() {
    return this.orderServices.getAllRestaurantOrders();
  }

  async getRestaurantOrderById(orderId) {
    try {
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        return { statusCode: 404, data: { message: "Order not found" } };
      }
      return { statusCode: 200, data: order };
    } catch (error) {
      return {
        statusCode: 400,
        data: { message: error.message },
      };
    }
  }

  getAllUserOrders() {
    return this.orderServices.getAllUserOrders();
  }

  getUserOrderById() {
    return this.orderServices.getUserOrderById();
  }

  createNewOrder() {
    return this.orderServices.createNewOrder();
  }

  async updateOrderStatus(orderId, status) {
    try {
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        status
      );
      return { statusCode: 200, data: updatedOrder };
    } catch (error) {
      return {
        statusCode: 400,
        data: { message: error.message },
      };
    }
  }
}

module.exports = OrderController;
