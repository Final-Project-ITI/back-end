const DeliveryModel = require("../models/delivery.model");
const DeliveryManModel = require("../models/deliveryMan.model");
class DeliveryManRepository {
  async createDeliveryMan(deliverymanInfo) {
    return await DeliveryManModel.create(deliverymanInfo);
  }
  async getDeliveryMan(val) {
      return await DeliveryManModel.findOne(val).populate("userId");
  }
  async getAllDeliveryMen() {
      return await DeliveryManModel.find().populate("userId");
  }
  async updateDeliveryMan(id,val) {
      return await DeliveryManModel.updateOne(id,val)
  }
  async deleteDeliveryMan(val) {
      return await DeliveryManModel.deleteOne(val);
  }
}

module.exports = DeliveryManRepository;
