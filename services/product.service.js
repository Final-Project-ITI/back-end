const ApiError = require("../utils/error");
const ProductModel = require("../models/product.model");
var ObjectId = require('mongoose').Types.ObjectId;

class ProductService {
  constructor() { }

  async getAllProducts(restaurantId) {
    try {
      return await ProductModel.find({ restaurantId: new ObjectId(restaurantId) }).populate('restaurantId');
    } catch (error) {
      return error
    }
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    try {
      return await ProductModel.findOne({ _id: productId, restaurantId: new ObjectId(restaurantId) }).populate('restaurantId');
    } catch (error) {
      console.log(error.message)
    }
  }

  async getProductsById(productId) {
    try {
      return await ProductModel.findOne({ _id: productId }).populate('restaurantId');
    } catch (error) {
      console.log(error.message)
    }
  }

  async createProduct(productInfo,resId) {
    const product={...productInfo,restaurantId:resId}
   
    return await ProductModel.create(product);
  }

  async updateProduct(productId, updatedProductData) {
    const productCount = this.products.length;
    const index = this.products.findIndex(
      (product) => product.id === productId
    );

    if (index !== -1 || productId < productCount) {
      this.products[index] = { ...this.products[index], ...updatedProductData };
      return this.products[index];
    }

    throw new ApiError("Product not found or update failed", 400);
  }

  async deleteProduct(productId) {
    const index = await this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    throw new ApiError("Product not found or deleted failed", 400);
  }
}

module.exports = ProductService;
