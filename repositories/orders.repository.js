const OrderModel = require("../models/order.model");
const OrderStatusModel = require("../models/orderStatus.model");
var ObjectId = require("mongoose").Types.ObjectId;

class OrderRepository {
  constructor() { }

  async getAllOrders() {
    return await OrderModel.find({ isDeleted: false }).populate("statusId").populate("phoneId").populate("userId").sort({ createdAt: -1 });
  }

  async getAllRestaurantOrders(orders) {
    return await OrderModel.find({ _id: { $in: orders }, isDeleted: false }).populate("statusId").populate("phoneId").populate("userId").sort({ createdAt: -1 });
  }

  async getOrdersByIdsAndDateRange(orderIds, startDate, endDate) {
    return await OrderModel.find({
      _id: { $in: orderIds },
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      isDeleted: false
    }).populate("statusId").populate("phoneId").populate("userId").sort({ createdAt: -1 });
  }

  async getOrderById(orderId) {
    return await OrderModel.findOne({ _id: orderId, isDeleted: false }).populate("statusId").populate("phoneId").populate("userId");
  }

  async updateOrderStatus(orderId, statusId) {
    return await OrderModel.updateOne({ _id: orderId }, { statusId });
  }

  async getAllUserOrders(userId) {
    return await OrderModel.find({ userId: userId, isDeleted: false }).populate("statusId").populate("phoneId").populate("userId").sort({ createdAt: -1 });
  }

  async getUserOrderById(userId, orderId) {
    return await OrderModel.findOne({ _id: orderId, userId: new ObjectId(userId), isDeleted: false }).populate("statusId").populate("phoneId").populate("userId");
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
