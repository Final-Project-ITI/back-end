const OrderStatusModel = require("../models/orderStatus.model");
var ObjectId = require("mongoose").Types.ObjectId;

class OrderStatusRepository {
    constructor() { }

    async getAllOrderStatuses() {
        return await OrderStatusModel.find();
    }
}


module.exports = OrderStatusRepository;