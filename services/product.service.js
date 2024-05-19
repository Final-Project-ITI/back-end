const ApiError = require("../utils/error");
const ProductModel = require("../models/product.model");
var ObjectId = require("mongoose").Types.ObjectId;

class ProductService {
  constructor() {}

  async getAllProducts(restaurantId) {
    try {
      return await ProductModel.find({
        restaurantId: new ObjectId(restaurantId),
      }).populate("restaurantId");
    } catch (error) {
      return error;
    }
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    try {
      return await ProductModel.findOne({
        _id: productId,
        restaurantId: new ObjectId(restaurantId),
      }).populate("restaurantId");
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductsById(productId) {
    try {
      return await ProductModel.findOne({ _id: productId }).populate(
        "restaurantId"
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async createProduct(productInfo, resId) {
    const product = { ...productInfo, restaurantId: resId };

    return await ProductModel.create(product);
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
      );

      if (updatedProduct) {
        return updatedProduct;
      } else {
        throw new ApiError("Product not found or update failed", 400);
      }
    } catch (error) {
      throw new ApiError("Product not found or update failed", 400);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (deletedProduct) {
        return true;
      } else {
        throw new ApiError("Product not found or delete failed", 400);
      }
    } catch (error) {
      throw new ApiError("Product not found or delete failed", 400);
    }
  }
}

module.exports = ProductService;
