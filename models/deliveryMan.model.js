const mongoose = require("mongoose");
const deliveryManSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    currentlyDeliver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
    },
    status: {
        type: String,
        default:"offline"
    }
});
const DeliveryManModel = mongoose.model("DeliveryMan", deliveryManSchema);
module.exports = DeliveryManModel;