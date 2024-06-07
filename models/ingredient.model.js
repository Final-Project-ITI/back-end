const { mongoose } = require("mongoose");
const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
});
const IngredientsModel = mongoose.model("Ingredient", ingredientSchema);
module.exports = IngredientsModel;