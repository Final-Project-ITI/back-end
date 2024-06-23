const { required } = require("joi");
const { mongoose } = require("mongoose");
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
    maxLength: 255,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  menuCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuCategory",
    required: true
  },
  ingredientsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true
    }
  ]
});
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
