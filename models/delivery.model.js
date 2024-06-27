const mongoose = require("mongoose");
const deliverySchema = mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    deliveryManId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryMan",
        default: null
    },
    assignedAt: {
        type: Date,
        default: null
    },
    deliverdAt: {
        type: Date,
        default: null
    }
});
const DeliveryModel = mongoose.model("Delivery", deliverySchema);
module.exports = DeliveryModel;