const Errors = require("../error/error");
class ProductController {
  restaurantRepository;
  productRepository;
  authRepository;

  constructor(_productRepository, _restaurantRepository, _authRepository) {
    this.productRepository = _productRepository;
    this.restaurantRepository = _restaurantRepository;
    this.authRepository = _authRepository;
  }

  async getAllProducts(restaurantId) {
    const products = await this.productRepository.getAllProducts(restaurantId);

    if (!products.length) {
      throw new Errors.NotFoundError("restaurant not found");
    }

    return products;
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    const product = await this.productRepository.getRestaurantsProductsById(restaurantId, productId);

    if (!product) {
      throw new Errors.NotFoundError("product not found");
    }

    return product;
  }

  async createProduct(productInfo, user) {
    const product = await this.productRepository.createProduct(productInfo, user.restaurantId);


    return product;
  }

  async updateProduct(updatedProductData, productId, user) {
    const updatedProduct = await this.productRepository.updateProduct(
      updatedProductData,
      productId,
      user.restaurantId
    );

    if (!updatedProduct.modifiedCount) {
      throw new Errors.ApiError("faild to update", 400);
    }

    return updatedProduct;
  }

  async deleteProduct(productId, user) {
    const isDeleted = await this.productRepository.deleteProduct(productId, user.restaurantId);

    if (!isDeleted.deletedCount) {
      throw new Errors.ApiError("faild to delete", 400);
    }

    return isDeleted;
  }
}

module.exports = ProductController;
