const { mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        default: null
    },
    phoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phone",
        required: true
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        default: null
    },
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod",
        default: null
    },
    paymentStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentStatus",
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryManId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryMan",
        default: null
    },
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;