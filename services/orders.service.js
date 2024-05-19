const ApiError = require("../utils/error");

class OrderService {
  constructor() {}

  getAllOrders() {
    return "All Orders For The Website Owner";
  }

  getAllRestaurantOrders() {
    return "All Orders For The Restaurant Admin";
  }

  async getRestaurantOrderById(orderId) {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (error) {
      throw new ApiError("Error retrieving order", 400);
    }
  }

  getAllUserOrders() {
    return "All Orders For The User";
  }

  getUserOrderById() {
    return "Order For The User";
  }

  createNewOrder() {}

  async updateOrderStatus(orderId, status) {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw new ApiError("Error updating order status", 400);
    }
  }
}

module.exports = OrderService;
