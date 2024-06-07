const OrderModel = require("../models/order.model");
const OrderStatusModel = require("../models/orderStatus.model");
var ObjectId = require("mongoose").Types.ObjectId;

class OrderRepository {
  constructor() { }

  async getAllOrders() {
    return await OrderModel.find().populate("statusId").populate("phoneId").populate("userId");
  }

  async getAllRestaurantOrders(orders) {
    return await OrderModel.find({ _id: { $in: orders } }).populate("statusId").populate("phoneId").populate("userId");
  }

  async getOrdersByIdsAndDateRange(orderIds, startDate, endDate) {
    return await OrderModel.find({
      _id: { $in: orderIds },
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate("statusId").populate("phoneId").populate("userId");
  }

  async getOrderById(orderId) {
    return await OrderModel.findOne({ _id: orderId }).populate("statusId").populate("phoneId").populate("userId");
  }

  async updateOrderStatus(orderId, statusId) {
    return await OrderModel.updateOne({ _id: orderId }, { statusId });
  }

  async getAllUserOrders(userId) {
    return await OrderModel.find({ userId: userId }).populate("statusId").populate("phoneId").populate("userId");
  }

  async getUserOrderById(userId, orderId) {
    return await OrderModel.findOne({ _id: orderId, userId: new ObjectId(userId) }).populate("statusId").populate("phoneId").populate("userId");
  }

  async createNewOrder(orderInfo) {
    return await OrderModel.create(orderInfo);
  }

  async getStatus(statusId) {
    return await OrderStatusModel.findOne({ _id: statusId });
  }

  async getAllStatus() {
    return await OrderStatusModel.find();
  }
}

module.exports = OrderRepository;
