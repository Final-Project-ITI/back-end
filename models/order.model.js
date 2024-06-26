const { mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    default: null,
  },
  phoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phone",
    required: true,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus",
    default: null,
  },
  paymentMethodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
    default: "667ae90f24daa8cfea1cb7f9",
  },
  paymentStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentStatus",
    default: "667ae9b624daa8cfea1cb7fd",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
