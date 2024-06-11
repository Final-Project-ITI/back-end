const MenuCategoryModel = require("../models/menuCategory.model");
var ObjectId = require("mongoose").Types.ObjectId;

class CategoryRepository {
    constructor() { }

    async getRestaurantMenuCategories(restaurantId) {
        return await MenuCategoryModel.find({ restaurantId }).populate('restaurantId');
    }

    async getRestaurantMenuCategoryById(restaurantId, _id) {
        return await MenuCategoryModel.findOne({ _id, restaurantId: new ObjectId(restaurantId) }).populate('restaurantId');
    }

    async updateRestaurantMenuCategoryById(restaurantId, _id, val) {
        return await MenuCategoryModel.updateMany({ _id, restaurantId: new ObjectId(restaurantId) }, val);
    }

    async createRestaurantMenuCategory(categoryInfo) {
        return await MenuCategoryModel.create(categoryInfo);
    }

    async deleteRestaurantMenuCategory(restaurantId, _id) {
        return await MenuCategoryModel.deleteOne({ _id, restaurantId: new ObjectId(restaurantId) });
    }

}

module.exports = CategoryRepository;