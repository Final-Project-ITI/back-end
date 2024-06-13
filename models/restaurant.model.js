const { required } = require("joi");
const { mongoose } = require("mongoose");
const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    icon: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    phone: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 11,
    }
});
const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;