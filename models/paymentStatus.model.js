const { mongoose } = require("mongoose");
const paymentStatusSchema = mongoose.Schema({
  status: {
    type: String,
    },
});
const PaymentStatusModel = mongoose.model("PaymentStatus", paymentStatusSchema);
module.exports = PaymentStatusModel;
