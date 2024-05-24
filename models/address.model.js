const { mongoose } = require("mongoose");
const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    streetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Street",
        default: null
    },
    details: {
        type: String,
        required: true
    }
});
const AddressModel = mongoose.model("Address", addressSchema);
module.exports = AddressModel;