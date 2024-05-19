const OrderModel = require("../models/order.model");
const OrderStatusModel = require("../models/orderStatus.model");
class OrderService {
  constructor() {}

  async getAllUserOrders(userId) {
    try {
      const userOrders = await OrderModel.find({ userId: userId });
      return userOrders;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }
  async getUserOrderById(userId, orderId) {
    try {
      const order = await OrderModel.findOne({ _id: orderId, userId: userId });
      return order;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  }

  async createNewOrder(orderInfo) {
    try {
      return await OrderModel.create(orderInfo);
    } catch (error) {
      return error;
    }
  }

  updateOrderStatus() {}
}

module.exports = OrderService;
