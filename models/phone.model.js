const { mongoose } = require("mongoose");
const phoneSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});
const PhoneModel = mongoose.model("Phone", phoneSchema);
module.exports = PhoneModel;