const { ref } = require("joi");
const { mongoose } = require("mongoose");
const itemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    sizeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        default: null
    },
    additionsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addition",
        default: null
    }],
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null
    }
});
const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;