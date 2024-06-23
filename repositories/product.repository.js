const ApiError = require("../error/error");
const ProductModel = require("../models/product.model");
var ObjectId = require("mongoose").Types.ObjectId;

class ProductRepository {
  constructor() { }

  async getAllProducts(restaurantId) {
    return await ProductModel.find({
      restaurantId: new ObjectId(restaurantId),
      isDeleted: false
    }).populate("ingredientsIds").populate("menuCategoryId");
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    return await ProductModel.findOne({
      _id: productId,
      restaurantId: new ObjectId(restaurantId),
      isDeleted: false
    }).populate("restaurantId");
  }

  async getProductsById(productId) {
    return await ProductModel.findOne({
      _id: productId,
      isDeleted: false
    }).populate("restaurantId");
  }

  async createProduct(productInfo, resId) {
    const product = { ...productInfo, restaurantId: resId };

    return await ProductModel.create(product);
  }

  async updateProduct(updatedProductData, productId, restaurantId) {
    const updatedProduct = await ProductModel.updateOne(
      { _id: productId, restaurantId: new ObjectId(restaurantId), },
      updatedProductData,
    );

    return updatedProduct;
  }

  async deleteProduct(productId, restaurantId) {
    return await ProductModel.updateOne({ _id: productId, restaurantId: new ObjectId(restaurantId) }, { isDeleted: true });
  }
}

module.exports = ProductRepository;
