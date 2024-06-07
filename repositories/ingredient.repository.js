const IngredientModel = require("../models/ingredient.model");
var ObjectId = require("mongoose").Types.ObjectId;

class IngredientRepository {
    constructor() { }

    async getRestaurantIngredients(restaurantId) {
        return await IngredientModel.find({ restaurantId }).populate('restaurantId');
    }

    async getRestaurantIngredientById(restaurantId, _id) {
        return await IngredientModel.findOne({ _id, restaurantId: new ObjectId(restaurantId) }).populate('restaurantId');
    }

    async updateRestaurantIngredientById(restaurantId, _id, val) {
        return await IngredientModel.updateMany({ _id, restaurantId: new ObjectId(restaurantId) }, val);
    }

    async createRestaurantIngredient(ingredientInfo) {
        return await IngredientModel.create(ingredientInfo);
    }

    async deleteRestaurantIngredient(restaurantId, _id) {
        return await IngredientModel.deleteOne({ _id, restaurantId: new ObjectId(restaurantId) });
    }

}


module.exports = IngredientRepository;