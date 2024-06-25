const mongoose = require("mongoose");
const deliverySchema = mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    deliveryManId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryMan"
    },
    assignedAt: {
        type: Date,
    },
    deliverdAt: {
        type: Date,
    }
});
const DeliveryModel = mongoose.model("Delivery", deliverySchema);
module.exports = DeliveryModel;