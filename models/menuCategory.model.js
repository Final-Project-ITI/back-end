const { required } = require("joi");
const { mongoose } = require("mongoose");
const menuCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
});

const MenuCategoriesModel = mongoose.model("MenuCategory", menuCategorySchema);
module.exports = MenuCategoriesModel;