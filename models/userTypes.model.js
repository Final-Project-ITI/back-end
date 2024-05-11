const { mongoose } = require("mongoose");
const userTypesSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    }
});
const UserTypesModel = mongoose.model("UserTypes", userTypesSchema);
module.exports = UserTypesModel;