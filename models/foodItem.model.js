const { mongoose } = require("mongoose");
const foodItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  decription: {
    type: String,
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
    maxLength: 255,
  },
  resturantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RestaurantModel",
  },
});
const FoodItemModel = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItemModel;
