const { mongoose } = require("mongoose");
const paymentMethodSchema = mongoose.Schema({
    method: {
        type: String,       
    }
});
const PaymentMethodModel = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethodModel;