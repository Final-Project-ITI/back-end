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

    return {
      statusCode: 200,
      data: products,
    };
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    const product = await this.productRepository.getRestaurantsProductsById(restaurantId, productId);

    return {
      statusCode: 200,
      data: product,
    };
  }

  async createProduct(productInfo, user) {
    const product = await this.productRepository.createProduct(productInfo, user.restaurantId);
    return { statusCode: 200, data: product };
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
        productId,
        updatedProductData
      );
      return {
        statusCode: 200,
        data: { message: "Successfully Updated the product" },
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: { message: error.message },
      };
    }
  }

  async deleteProduct(productId) {
    try {
      const isDeleted = await this.productRepository.deleteProduct(productId);
      if (isDeleted) {
        return {
          statusCode: 200,
          data: { message: "Successfully Updated the product" },
        };
      }
      return {
        statusCode: 200,
        data: { message: "Successfully deleted the product" },
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: { message: error.message },
      };
    }
  }
}

module.exports = ProductController;
