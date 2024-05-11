class ProductController {
  restaurantService;
  productServices;
  response = {
    statusCode: 0,
    data: {},
  };

  constructor(_productServices, _restaurantService) {
    this.productServices = _productServices;
    this.restaurantService = _restaurantService;
  }

  getAllProducts(restaurantId) {
    return this.productServices.getAllProducts(restaurantId);
  }
  getProductsById(restaurantId, productId) {
    return this.productServices.getProductsById(restaurantId, productId);
  }
  async createProduct(productInfo) {
    const product = this.productServices.createProduct(productInfo);
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
