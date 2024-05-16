const { mongoose } = require("mongoose");
const orderStatusSchema = mongoose.Schema({
    status: {
        type: String,
        required: true,
    }
});
const OrderStatusModel = mongoose.model("OrderStatus", orderStatusSchema);
module.exports = OrderStatusModel;