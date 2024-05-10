class ProductController {
  productServices;
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
  updateProduct() {
    return this.productServices.updateProduct();
  }
  deleteProduct() {
    return this.productServices.deleteProduct();
  }
}

module.exports = ProductController;
