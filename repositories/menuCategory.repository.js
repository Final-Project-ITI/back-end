const MenuCategoryModel = require("../models/menuCategory.model");
var ObjectId = require("mongoose").Types.ObjectId;

class CategoryRepository {
    constructor() { }

    async getRestaurantMenuCategories(restaurantId) {
        return await MenuCategoryModel.find({ restaurantId, isDeleted: false });
    }

    async getRestaurantMenuCategoryById(restaurantId, _id) {
        return await MenuCategoryModel.findOne({ _id, restaurantId: new ObjectId(restaurantId), isDeleted: false });
    }

    async updateRestaurantMenuCategoryById(restaurantId, _id, val) {
        return await MenuCategoryModel.updateMany({ _id, restaurantId: new ObjectId(restaurantId) }, val);
    }

    async createRestaurantMenuCategory(categoryInfo) {
        return await MenuCategoryModel.create(categoryInfo);
    }

    async deleteRestaurantMenuCategory(restaurantId, _id) {
        return await MenuCategoryModel.updateOne({ _id, restaurantId: new ObjectId(restaurantId) }, { isDeleted: true });
    }

}

module.exports = CategoryRepository;