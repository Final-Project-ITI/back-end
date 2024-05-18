class ProductController {
  restaurantService;
  productServices;
  authService;

  constructor(_productServices, _restaurantService, _authService) {
    this.productServices = _productServices;
    this.restaurantService = _restaurantService;
    this.authService = _authService;
  }

  async getAllProducts(restaurantId) {
    const products = await this.productServices.getAllProducts(restaurantId);

    return {
      statusCode: 200,
      data: products,
    };
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    const product = await this.productServices.getRestaurantsProductsById(restaurantId, productId);

    return {
      statusCode: 200,
      data: product,
    };
  }

  async createProduct(productInfo,user) {
    const product = await this.productServices.createProduct(productInfo,user.restaurantId);
    return { statusCode: 200, data: product };
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const updatedProduct = await this.productServices.updateProduct(
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
      const isDeleted = await this.productServices.deleteProduct(productId);
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
