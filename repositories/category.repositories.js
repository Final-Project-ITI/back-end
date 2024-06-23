const CategoryModel = require("../models/category.model");
var ObjectId = require("mongoose").Types.ObjectId;

class CategoryRepository {
  constructor() {}

  async getCategories() {
    return await CategoryModel.find();
  }

  async getCategoryById(_id) {
    return await CategoryModel.findOne({ _id: new ObjectId(_id) });
  }

  async updateCategoryById(_id, val) {
    return await CategoryModel.updateOne({ _id: new ObjectId(_id) }, val);
  }

  async createCategory(categoryInfo) {
    return await CategoryModel.create(categoryInfo);
  }

  async deleteCategory(_id) {
    return await CategoryModel.deleteOne({ _id: new ObjectId(_id) });
  }
}

module.exports = CategoryRepository;
