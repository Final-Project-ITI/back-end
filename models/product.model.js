const { mongoose } = require("mongoose");
const productSchema = mongoose.Schema({
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
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;