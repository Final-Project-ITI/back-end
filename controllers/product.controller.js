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

  async getAllProducts(restaurantId) {
    try {
      const products = await this.productServices.getAllProducts(restaurantId);
      if (!products || products.length === 0) {
        return { statusCode: 404, data: { message: "Products not found" } };
      }
      return { statusCode: 200, data: products };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }

  async getProductsById(restaurantId, productId) {
    try {
      const product = await this.productServices.getProductsById(
        restaurantId,
        productId
      );
      if (!product) {
        return { statusCode: 404, data: { message: "Product not found" } };
      }
      return { statusCode: 200, data: product };
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
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
