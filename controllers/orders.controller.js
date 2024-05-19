class OrderController {
  orderServices;

  constructor(_orderServices) {
    this.orderServices = _orderServices;
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
