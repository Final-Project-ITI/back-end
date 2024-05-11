class ProductController {
  productServices;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(_productServices) {
    this.productServices = _productServices;
  }

  getAllProducts() {
    return this.productServices.getAllProducts();
  }
  getUserProductsById() {
    return this.productServices.getUserProductsById();
  }
  createProduct() {
    return this.productServices.createProduct();
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
