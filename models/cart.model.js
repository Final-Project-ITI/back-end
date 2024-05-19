const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
    itemsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});
const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel;