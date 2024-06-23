const DeliveryModel = require("../models/delivery.model");
const DeliveryManModel = require("../models/deliveryMan.model");
class DeliveryRepository {
  async createDelivery(deliveryInfo) {
    return await DeliveryModel.create(deliveryInfo);
  }
  async getDelivery(val) {
    return await DeliveryModel.findOne(val).populate("orderId");
  }
  async getDeliveries(val){
    return await DeliveryModel.find(val).populate("orderId");
  }
  async getAllDeliveries() {
    return await DeliveryModel.find().populate("orderId");
  }
  async updateDelivery(id, val) {
    return await DeliveryModel.updateOne(id, val);
  }
}

module.exports = DeliveryRepository;
