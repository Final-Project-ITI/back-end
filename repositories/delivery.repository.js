const DeliveryModel = require("../models/delivery.model");
const DeliveryManModel = require("../models/deliveryMan.model");
const ItemModel = require("../models/item.model");

class DeliveryRepository {
  async createDelivery(deliveryInfo) {
    return await DeliveryModel.create(deliveryInfo);
  }
  async getDelivery(val) {
    return await DeliveryModel.findOne(val).populate("orderId");
  }
  async getDeliveries(val) {
    const deliveries = await DeliveryModel.find(val).populate({
      path: 'orderId',
      populate: [{
        path: 'userId',
        model: 'User'
      }, {
        path: 'phoneId',
        model: 'Phone'
      }, {
        path: 'addressId',
        model: 'Address'
      }, {
        path: 'statusId',
        model: 'OrderStatus'
      }, {
        path: 'paymentStatusId',
        model: 'PaymentStatus'
      }]
    })
    return deliveries
  }
  async getAllDeliveries() {
    return await DeliveryModel.find().populate("orderId");
  }
  async updateDelivery(id, val) {
    return await DeliveryModel.updateOne(id, val);
  }
}

module.exports = DeliveryRepository;
