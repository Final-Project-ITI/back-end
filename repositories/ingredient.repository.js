const IngredientModel = require("../models/ingredient.model");
var ObjectId = require("mongoose").Types.ObjectId;

class IngredientRepository {
    constructor() { }

    async getRestaurantIngredients(restaurantId) {
        return await IngredientModel.find({ restaurantId, isDeleted: false });
    }

    async getRestaurantIngredientsByIds(ids) {
        return await IngredientModel.find({
            '_id': {
                $in: ids
            }, isDeleted: false
        });
    }

    async getRestaurantIngredientById(restaurantId, _id) {
        return await IngredientModel.findOne({ _id, restaurantId: new ObjectId(restaurantId), isDeleted: false });
    }

    async updateRestaurantIngredientById(restaurantId, _id, val) {
        return await IngredientModel.updateMany({ _id, restaurantId: new ObjectId(restaurantId) }, val);
    }

    async createRestaurantIngredient(ingredientInfo) {
        return await IngredientModel.create(ingredientInfo);
    }

    async deleteRestaurantIngredient(restaurantId, _id) {
        return await IngredientModel.updateOne({ _id, restaurantId: new ObjectId(restaurantId) }, { isDeleted: true });
    }

}


module.exports = IngredientRepository;