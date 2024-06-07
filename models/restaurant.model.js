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
        default: null,
    },
    banner: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        required: true,
        maxLength: 255,
    }
});
const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;