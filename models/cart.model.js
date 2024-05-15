const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
