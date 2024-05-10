class ProductController {
  productServices;
  constructor(_productServices) {
    this.productServices = _productServices;
  }

  getAllProducts(restaurantId) {
    return this.productServices.getAllProducts(restaurantId);
  }
  getProductsById(restaurantId, productId) {
    return this.productServices.getProductsById(restaurantId, productId);
  }
  createProduct() {
    return this.productServices.createProduct();
  }
  updateProduct() {
    return this.productServices.updateProduct();
  }
  deleteProduct() {
    return this.productServices.deleteProduct();
  }
}

module.exports = ProductController;
